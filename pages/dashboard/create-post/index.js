import { useState } from "react";
import QuillEditor from "../../../components/admin/QuillEditor";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [info, setInfo] = useState();

  function handleTitle(data) {
    setTitle(data.target.value)
  } 
  
  function handleThumbnail(data) {
    setThumbnail(data.target.value)
  }

  function handleSubmit() {
    const post = [
      title,
      thumbnail,
      info
    ]

    console.log(post)
  }

  return (
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        <form className="flex flex-col max-w-3xl w-full mb-10">
            <label htmlFor="title" className="font-extralight mb-1">Názov:</label>
            <input name="title" type="text" className="mb-4 rounded-lg text-gray-800 px-2" required onChange={handleTitle}/>

            <label htmlFor="thumbnail" className="font-extralight mb-1">Thumbnail URL:</label>
            <input name="thumbnail" type="text" className="rounded-lg text-gray-800 px-2" required onChange={handleThumbnail}/>
        </form>
        <div className="max-w-3xl w-full mb-8">
            <p className="font-extralight mb-1">Popis:</p>
            <QuillEditor info={info} setInfo={setInfo}/>
        </div>
        <button onClick={handleSubmit} disabled={!title || !thumbnail || !info} className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 font-thin md:text-xl hover:opacity-80 duration-500">Save</button>
      </div>
  )
}

export default CreatePost