import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { firestore } from '../../common/firebase';

const Portfolio = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    AOS.init({
        duration: 1000
    })
    firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot((query) => {
        const tempDoc = query.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        })
        setPosts(tempDoc)
    })
  }, [])

  return (
    <section id="portfolio" className="flex min-h-screen flex-col items-center justify-center mt-24">
      <h1 data-aos={"fade-down"}  className="mb-16 text-center text-5xl font-bold md:text-7xl">
        Our <span className="text-[#AFFC41]">projects.</span>
      </h1>
      <div className="mb-16 flex flex-col flex-wrap justify-evenly gap-8 md:flex-row">
        {posts && posts.map((post) => (
            <Link key={post.id} href={`/portfolio/${post.id}`}>
                <div data-aos={"fade-in"} className="w-full max-w-xs rounded-md bg-white shadow-md shadow-slate-600 group overflow-hidden cursor-pointer">
                    <h1 className="px-5 py-4 text-2xl font-medium text-[#241127] h-16">{post.title}</h1>
                    <div className='overflow-hidden'>
                        <img className="group-hover:scale-110 duration-500" src={post.downloadURL} alt={post.title} />
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </section>
  )
}

export default Portfolio