import { useCallback, useEffect, useState } from 'react';
import { firestore } from '../../common/firebase';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import AOS from "aos";
import "aos/dist/aos.css";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Portfolio = () => {
  const router = useRouter()
  const { id } = router.query
  const [posts, setPosts] = useState([])
  const [isZoomed, setIsZoomed] = useState(false)

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  
  useEffect(() => {
    AOS.init({
        duration: 1000
    })
    firestore.collection('posts').doc(id).get().then((doc) => {
        if(doc.data()) {
          const tempDoc = {id: doc.id, ...doc.data()}
          setPosts(tempDoc)
        }
      })
      .catch((e) => {
        toast.error(e.message)
        console.log(e)
      })
  }, [])
  return (
    <section id="portfolio" className="flex full-screen flex-col items-center justify-center pt-16 bg-[#241127] md:flex-row md:items-start">
        <div className="w-full order-2 h-full md:w-1/2 md:order-1">
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} overlayBgColorEnd={'rgba(36, 17, 39, 0.7)'}>
                <img className={`h-full ${isZoomed === true && '!object-contain'} object-cover`} src={posts.downloadURL}/>
            </ControlledZoom>
        </div>
        <div className="w-[90%] order-1 info-content my-10 md:w-1/2 md:order-2 md:my-0 md:px-10 md:h-min">
            {parse(`${posts.info}`)}
        </div>
    </section>
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
        layout: false,
      },
    }
}

export default Portfolio