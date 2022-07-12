import { useEffect, useState } from "react";
import QuillEditor from "../../../components/admin/QuillEditor";
import { firestore, storage, serverTimestamp, STATE_CHANGED } from '../../../common/firebase';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { CheckIcon, CloudUploadIcon } from '@heroicons/react/outline'
import Image from "next/image";
import Head from "next/head";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [info, setInfo] = useState();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  useEffect(() => {
    if(downloadURL) {
      const post = {
        title,
        downloadURL,
        info,
        createdAt: serverTimestamp()
      }
      createFirestoreDocument(post)
    }
  }, [downloadURL])
  

  const handleTitle = event => {
    setTitle(event.target.value)
  } 

  const handleThumbnail = event => {
    setThumbnail(event.target.files[0])
  }

  const createFirestoreDocument = post => {
    firestore.collection('posts').add(post).then((docRef) => {
      toast.success('All good.')
      router.push('/dashboard')
    }).
    catch((error) => {
      console.log(error)
      toast.error('Database error.')
    })
  }

  // Creates a Firebase Upload Task
  const uploadFile = async () => {
    // Get the file
    const file = thumbnail;
    const fileName = file.name.split('.')[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(`uploads/${fileName}_${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task.then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
    });
  };

  return (
    <>
      <Head>
        <title>Dajhe - Pridať projekt</title>
        <meta name="robots" content="noindex"/>
      </Head>
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-start mt-16">
        <h1 className="text-[#AFFC41] text-5xl font-bold mb-10 mt-14 md:text-6xl ">Nový projekt.</h1>
        <div className="flex flex-col max-w-3xl w-full mb-10">
            <label htmlFor="title" className="font-extralight mb-1">Názov</label>
            <input name="title" type="text" className="rounded-lg text-gray-800 px-2" required onChange={handleTitle}/>
            {/* <input name="thumbnail" type="text" className="rounded-lg text-gray-800 px-2" required onChange={handleThumbnail}/> */}
        </div>
        <div className="max-w-3xl w-full mb-8">
            <p className="font-extralight mb-1">Popis</p>
            <QuillEditor info={info} setInfo={setInfo}/>
        </div>

        <div className="max-w-3xl w-full mb-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center items-center h-24">
            <label htmlFor="thumbnail" className="font-extralight mb-1 flex flex-col items-center group cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                  <CloudUploadIcon className="group-hover:stroke-[#a0e939] group-hover:scale-110 duration-500"/>
                </div>
                Nahrat fotku.
            </label>
            <input name="thumbnail" id="thumbnail" type="file" className="hidden" required onChange={handleThumbnail}/>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-24">
            {uploading && <h1 className="text-[#AFFC41] text-xl font-bold">Nahrávam.</h1>}
            {thumbnail && <p className="font-extralight w-3/4 text-center">{thumbnail.name}</p>}
            {progress !== 0 && <h2>{progress}%</h2>}
          </div>
        </div>

        <button onClick={uploadFile} disabled={!title || !thumbnail || !info} className="group rounded-full bg-[#a0e939] p-3 mb-10">
          <CheckIcon className="w-7 h-7 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
        </button>
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