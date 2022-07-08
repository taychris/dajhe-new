import { useEffect, useState } from 'react'
import { firestore } from '../../common/firebase'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/outline'

const Dashboard = () => {
  const [posts, setPosts] = useState(null)

    useEffect(() => {
        firestore.collection('posts').get().then((items) => {
            const tempDoc = items.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            setPosts(tempDoc)
        })
    }, [])

  return (
    <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full mb-6">
            <Link href={'/dashboard/create-post'}>
                <button className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-1 font-thin md:text-sm hover:opacity-80 duration-500">Create post</button>
            </Link>
        </div>
        {posts ? 
        <Results posts={posts}/>
        : <div>No posts availalbe.</div>}
    </div>
  )
}

const Results = (posts) => {
    const handleDelete = id => {
        firestore.doc(`posts/${id}`).delete().then(() => {
            toast.success('Deleted post.')
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
                <div className='bg-[#241127] rounded-xl p-6 text-white'>
                    <h1 className='text-[#AFFC41] font-bold text-2xl'>Are you sure?</h1>
                    <p className='font-extralight text-lg mb-4'>Do you want to delete this post?</p>
                    <button
                        className='bg-[#AFFC41] rounded-full px-6 py-1 font-extralight text-[#241127] mr-4'
                        onClick={() => {
                        handleDelete();
                        onClose();
                        }}
                    >
                        Yes
                    </button>
                    <button onClick={onClose} className='bg-[#AFFC41] rounded-full px-6 py-1 font-extralight text-[#241127]'>No</button>
                </div>
            );
            }
        });
    }

    return (
        <div className="mb-10 flex flex-col gap-10 md:flex-row w-full">
            {posts.posts.map(post => {
                return (
                    <div key={post.id} className="flex flex-col w-full md:max-w-[30%] items-center relative">
                        <Link href={`dashboard/edit-post/${post.id}`}>
                            <div className="rounded-md bg-white shadow-md shadow-slate-600 group overflow-hidden cursor-pointer">
                                <h1 className="px-5 py-4 text-2xl font-medium text-[#241127] z-0 h-16">{post.title}</h1>
                                <img className="-z-[1] group-hover:scale-110 duration-500" src="https://cdn.dribbble.com/userupload/3014621/file/original-9c015016ad22fb915381c31322875fa8.png?compress=1&resize=1024x768" alt="" />
                            </div>
                        </Link>
                        <button className="absolute w-10 h-10 bottom-0 right-0 hover:scale-110 duration-500 p-2" onClick={deleteItem}>
                            <TrashIcon/>
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