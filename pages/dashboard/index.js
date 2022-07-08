import { useEffect, useState } from 'react'
import { firestore } from '../../common/firebase'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link';
import { TrashIcon, PlusIcon } from '@heroicons/react/outline'

const Dashboard = () => {
  const [posts, setPosts] = useState(null)
//   const [posts, loading, error] = useCollection(
//     firestore.collection
//   )

    useEffect(() => {
        firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot((query) => {
            const tempDoc = query.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            setPosts(tempDoc)
        })
    }, [posts])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-24">
        <div className="w-full mb-14">
            <h1 className="text-[#AFFC41] text-5xl font-bold md:text-6xl">Dashboard.</h1>
        </div>
        <div className="w-full mb-6">
            <Link href={'/dashboard/create-post'}>
                <button className="group rounded-full bg-[#a0e939] p-2">
                    <PlusIcon className="w-5 h-5 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
                </button>
            </Link>
        </div>
        {posts ? 
        <Results posts={posts} firestore={firestore}/>
        : <p>Žiadne projekty.</p>}
    </div>
  )
}

const Results = props => {
    const [deleteId, setDeleteId] = useState(null)
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        if(confirmed && deleteId) {
            handleDelete(deleteId)
        }
    }, [confirmed])
    
    const handleDelete = id => {
        props.firestore.doc(`posts/${id}`).delete().then(() => {
            toast.success('Deleted post.')
            setConfirmed(false)
        })
        .catch((e) => {
            console.log(e)
            toast.error(e.message)
        })
    }

    const deleteItem = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
            return (
                <div className='bg-[#241127] rounded-xl px-10 py-6 text-white'>
                    <h1 className='text-[#AFFC41] font-bold text-3xl'>Potvrdenie.</h1>
                    <p className='font-extralight text-base mb-4'>Naozaj chceš vymazať tento projekt?</p>
                    <button
                        className='bg-[#AFFC41] rounded-full px-6 py-1 font-extralight text-[#241127] mr-4'
                        onClick={() => {
                        setConfirmed(true);
                        onClose();
                        }}
                    >
                        áno
                    </button>
                    <button onClick={onClose} className='bg-[#AFFC41] rounded-full px-6 py-1 font-extralight text-[#241127]'>nie</button>
                </div>
            );
            }
        });
    }

    return (
        <div className="mb-10 flex flex-col gap-8 md:flex-row w-full flex-wrap">
            {props.posts.map(post => {
                return (
                    <div key={post.id} className="flex flex-col w-full md:max-w-[30%] items-center overflow-hidden relative">
                        <Link href={`dashboard/edit-post/${post.id}`}>
                            <div className="rounded-md bg-white shadow-md shadow-slate-600 group overflow-hidden cursor-pointer">
                                <h1 className="px-5 py-4 text-2xl font-medium text-[#241127] z-0 h-16">{post.title}</h1>
                                <img className="-z-[1] group-hover:scale-110 duration-500" src={`${post.thumbnail}`} alt="" />
                            </div>
                        </Link>
                        <button className="absolute w-10 h-10 bottom-0 right-0 group duration-500 p-2 bg-[#AFFC41] rounded-tl-2xl rounded-br-lg" onClick={() => {
                            setDeleteId(post.id);
                            deleteItem();
                            }}>
                            <TrashIcon className="group-hover:stroke-[#241127] group-hover:scale-110 duration-500"/>
                        </button>
                    </div>
                )
            })}
        <Toaster/>
        </div>
    )
}

export async function getStaticProps(context) {
    return {
      props: {
        protected: true,
      },
    }
}

export default Dashboard