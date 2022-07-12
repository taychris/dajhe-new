import { useEffect, useState } from "react";
import QuillEditor from "../../../components/admin/QuillEditor";
import { firestore, storage, STATE_CHANGED } from '../../../common/firebase';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router'
import { CheckIcon, CloudUploadIcon } from '@heroicons/react/outline'
import Head from "next/head";

const EditPost = () => {
  const router = useRouter()
  const { id } = router.query

  const [title, setTitle] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [info, setInfo] = useState();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [initialDownloadURL, setInitialDownloadURL] = useState();


  useEffect(() => {
    firestore.collection('posts').doc(id).onSnapshot((doc) => {
      if(doc.data()) {
        setInfo(doc.data().info)
        setTitle(doc.data().title)
        setInitialDownloadURL(doc.data().downloadURL)
      }
    })
  }, [id])

  useEffect(() => {
    if(downloadURL && downloadURL !== initialDownloadURL) {
      const post = {
        title,
        downloadURL,
        info,
      }
      deleteOldImage(initialDownloadURL).then(() => {
        updateFirestoreDocument(post)
      })
    }
  }, [downloadURL])

  const handleTitle = event => {
    setTitle(event.target.value)
  } 
  
  const handleThumbnail = event => {
    setThumbnail(event.target.files[0])
  }

  const handleSubmit = () => {
    const post = {
      title,
      info
    }

    updateFirestoreDocument(post)
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
      task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
    });
  };

  const updateFirestoreDocument = async (post) => {
    await firestore.collection('posts').doc(id).update(post).then(() => {
      toast.success('All good.')
    }).
    catch((error) => {
      console.log(error)
      toast.error('Database error.')
    })
  }

  const deleteOldImage = async (downloadURL) => {
    await storage.refFromURL(downloadURL).delete()
    .catch((e) => {
      console.log(e)
      toast.error('Error deleting the old image.')
    })
  }

  return (
    <>
      <Head>
        <title>Dajhe - Zmeniť projekt</title>
        <meta name="robots" content="noindex"/>
      </Head>
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-[#AFFC41] text-4xl font-bold mb-10 mt-14 md:text-6xl ">Zmeniť projekt.</h1>
        <form className="flex flex-col max-w-3xl w-full mb-10">
            <label htmlFor="title" className="font-extralight mb-1">Názov</label>
            <input name="title" type="text" className="rounded-lg text-gray-800 px-2" value={title || ""} required onChange={handleTitle}/>
        </form>
        <div className="max-w-3xl w-full mb-10">
            <p className="font-extralight mb-1">Popis</p>
            {info && <QuillEditor info={info} setInfo={setInfo} edit={true}/>}
        </div>

        <div className="max-w-3xl w-full mb-10 flex flex-col md:flex-row">
          <div className="w-full mb-10 md:mb-0 md:w-1/2 flex justify-center items-center relative rounded-xl overflow-hidden">
            <img src={initialDownloadURL}/>
            <label htmlFor="thumbnail" className="w-min group rounded-full cursor-pointer bg-[#a0e939] p-3 absolute bottom-3 left-0 right-0 m-auto">
                <div className="w-4 h-4 overflow-hidden">
                  <CloudUploadIcon className="group-hover:stroke-[#241127] group-hover:scale-110 duration-500"/>
                </div>
            </label>
            <input name="thumbnail" id="thumbnail" type="file" className="hidden" required onChange={handleThumbnail}/>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            {uploading && <h1 className="text-[#AFFC41] text-xl font-bold">Nahrávam.</h1>}
            {thumbnail && <p className="font-extralight w-3/4 text-center">{thumbnail.name}</p>}
            {progress !== 0 && <h2>{progress}%</h2>}
          </div>
        </div>

        {thumbnail ?
          <button onClick={uploadFile} disabled={!title || !info} className="group rounded-full bg-[#a0e939] p-3 mb-10">
            <CheckIcon className="w-7 h-7 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
          </button>
        :
          <button onClick={handleSubmit} disabled={!title || !info} className="group rounded-full bg-[#a0e939] p-3 mb-10">
            <CheckIcon className="w-7 h-7 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
          </button>
        }
      </div>
      <Toaster/>
    </>
  )
}

export async function getStaticPaths() {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default EditPost