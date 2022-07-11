import { TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import toast, { Toaster } from 'react-hot-toast'
import { firestore, storage } from '../../common/firebase'

const Projects = ({posts}) => {
  const [deleteId, setDeleteId] = useState(null)
  const [downloadURL, setDownloadURL] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if(confirmed && deleteId && downloadURL) {
        handleDelete()
    }
  }, [confirmed])

  const handleDelete = () => {
    deleteImg(downloadURL).then(() => {
        deleteDoc()
    })
    .catch((e) => {
        console.log(e)
        toast.error('Storage error.')
    })
  }

  const deleteDoc = async () => {
    await firestore.doc(`posts/${deleteId}`).delete().then(() => {
        toast.success('Deleted post.')
        setConfirmed(false)
    })
    .catch((e) => {
        console.log(e)
        toast.error(e.message)
    })
  }

  const deleteImg = async () => {
    await storage.refFromURL(downloadURL).delete()
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
    <div className="mb-10 flex flex-col gap-9 md:justify-start md:flex-row w-full flex-wrap">
            {posts.map(post => {
                return (
                    <div key={post.id} className="flex flex-col w-full md:max-w-[30%] items-center overflow-hidden relative">
                        <Link href={`dashboard/edit-post/${post.id}`}>
                            <div className="rounded-md bg-white shadow-md shadow-slate-600 group cursor-pointer h-60 flex flex-col">
                                <h1 className="px-5 py-4 text-2xl font-medium text-[#241127] z-0 h-16">{post.title}</h1>
                                <div className="overflow-hidden h-full w-full">
                                    <img className="-z-[1] group-hover:scale-110 duration-500 h-full w-full object-cover" src={`${post.downloadURL}`} alt="" />
                                </div>
                            </div>
                        </Link>
                        <button className="absolute w-10 h-10 bottom-0 right-0 group duration-500 p-2 bg-[#AFFC41] rounded-tl-2xl rounded-br-lg" onClick={() => {
                            setDeleteId(post.id);
                            setDownloadURL(post.downloadURL);
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

export default Projects