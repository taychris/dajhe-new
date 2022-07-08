import { useState } from "react";
import QuillEditor from "../../../components/admin/QuillEditor";
import { firestore, serverTimestamp } from '../../../common/firebase';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { CheckIcon } from '@heroicons/react/outline'

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [info, setInfo] = useState();

  const handleTitle = event => {
    setTitle(event.target.value)
  } 
  
  const handleThumbnail = event => {
    setThumbnail(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const post = {
      title,
      thumbnail,
      info,
      createdAt: serverTimestamp()
    }

    await firestore.collection('posts').add(post).then((docRef) => {
      toast.success('All good.')
      router.push('/dashboard')
    }).
    catch((error) => {
      console.log(error)
      toast.error('Not good.')
    })
  }

  return (
    <>
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-start mt-16">
        <h1 className="text-[#AFFC41] text-5xl font-bold mb-10 mt-14 md:text-6xl ">Nový projekt.</h1>
        <form className="flex flex-col max-w-3xl w-full mb-10">
            <label htmlFor="title" className="font-extralight mb-1">Názov</label>
            <input name="title" type="text" className="mb-4 rounded-lg text-gray-800 px-2" required onChange={handleTitle}/>

            <label htmlFor="thumbnail" className="font-extralight mb-1">Thumbnail URL</label>
            <input name="thumbnail" type="text" className="rounded-lg text-gray-800 px-2" required onChange={handleThumbnail}/>
        </form>
        <div className="max-w-3xl w-full mb-8">
            <p className="font-extralight mb-1">Popis</p>
            <QuillEditor info={info} setInfo={setInfo}/>
        </div>
        <button onClick={handleSubmit} disabled={!title || !thumbnail || !info} className="group rounded-full bg-[#a0e939] p-3 mb-10">
          <CheckIcon className="w-7 h-7 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
        </button>
        {/* <button onClick={handleSubmit} disabled={!title || !thumbnail || !info} className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] mb-10 px-8 py-2 font-thin md:text-xl hover:opacity-80 duration-500">Uložiť</button> */}
      </div>
      <Toaster/>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default CreatePost