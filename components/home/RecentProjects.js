import Link from "next/link"
import { useEffect, useState } from "react"
import { firestore } from "../../common/firebase"

const RecentProjects = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    firestore.collection('posts').orderBy('createdAt', 'desc').limit(3).onSnapshot((query) => {
        const tempDoc = query.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        })
        setPosts(tempDoc)
    })
  }, [])

  return (
    <>
        {posts && posts.map((post) => (
            <Link key={post.id} href={`/portfolio/${post.id}`}>
                <div data-aos={"fade-in"} className="w-full rounded-md bg-white shadow-md shadow-slate-600 group overflow-hidden cursor-pointer">
                    <h1 className="px-5 py-4 text-2xl font-medium text-[#241127] h-16">{post.title}</h1>
                    <div className="overflow-hidden">
                      <img className="group-hover:scale-110 duration-500" src={post.thumbnail} alt={post.title} />
                    </div>
                </div>
            </Link>
        ))}
    </>
  )
}

export default RecentProjects