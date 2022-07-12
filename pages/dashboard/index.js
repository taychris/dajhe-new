import { useEffect, useState } from 'react'
import { firestore } from '../../common/firebase'
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline'
import Projects from '../../components/home/Projects';
import Head from 'next/head';

const Dashboard = () => {
  const [posts, setPosts] = useState(null)

    useEffect(() => {
        firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot((query) => {
            const tempDoc = query.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            setPosts(tempDoc)
        })
    }, [])

  return (
    <>
      <Head>
        <title>Dajhe - Admin</title>
        <meta name="robots" content="noindex"/>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-start mt-24">
          <div className="w-full mb-14">
              <h1 className="text-[#AFFC41] text-5xl font-bold md:text-7xl">Dashboard.</h1>
          </div>
          <div className="w-full mb-6">
              <Link href={'/dashboard/create-post'}>
                  <button className="group rounded-full bg-[#a0e939] p-2">
                      <PlusIcon className="w-5 h-5 group-hover:stroke-[#241127] stroke-slate-100 group-hover:scale-110 duration-500"/>
                  </button>
              </Link>
          </div>
          {posts ? 
          <Projects posts={posts}/>
          : <p>Žiadne projekty.</p>}
      </div>
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

export default Dashboard