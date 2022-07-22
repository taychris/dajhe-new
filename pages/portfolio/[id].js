import { useCallback, useEffect, useState } from 'react';
import { firestore } from '../../common/firebase';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import AOS from "aos";
import "aos/dist/aos.css";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Head from 'next/head';

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
        console.log(e)
      })
  }, [])
  return (
    <>
      <Head>
        <title>Dajhe - Portfolio</title>
        <meta name="description" content="Ponúkame všetko, čo potrebujete pre identitu vašej značky. Tvorba webu, grafický dizajn a fotografia."/>
        <meta property="og:title" content="Dajhe - Portfolio"/>
        <meta property="og:url" content="https://dajhe-new.vercel.app/"/>
        <meta property="og:description" content="Ponúkame všetko, čo potrebujete pre identitu vašej značky. Tvorba webu, grafický dizajn a fotografia."/>
        <meta property="og:image" content="https://github.com/taychris/lots-of-images/blob/main/dajhe_thumbnail.jpg?raw=true"/>
        <meta name="robots" content="noindex"/>
      </Head>
      <section id="portfolio" className="flex full-screen flex-col items-center justify-center pt-14 bg-gradient-to-bl from-[#241127] via-[#4e0759] to-[#241127] md:flex-row md:items-start">
          <div className="w-full order-2 h-full md:w-1/2 md:order-1">
              <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} overlayBgColorEnd={'rgba(36, 17, 39, 0.7)'}>
                  <img className={`h-full ${isZoomed === true && '!object-contain'} object-cover`} src={posts.downloadURL}/>
              </ControlledZoom>
          </div>
          <div className="w-[90%] h-full order-1 py-10 md:w-1/2 md:order-2 md:px-10 md:h-min">
              <span className="overflow-auto info-content text-xl">
                  {parse(`${posts.info}`)}
              </span>
          </div>
      </section>
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
        layout: false,
      },
    }
}

export default Portfolio