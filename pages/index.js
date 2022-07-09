// import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
// import { MenuContext } from '../common/menuContext';
import ContactForm from '../components/home/ContactForm';
import RecentProjects from '../components/home/RecentProjects';
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home() {
  // const menuContext = useContext(MenuContext)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  // useEffect(() => {
  //   const section = document.getElementById(menuContext.menuValue)
  //   section.scrollIntoView( { behavior: 'smooth', block: 'start' } )
  // }, [menuContext])

  return (
    <>
    {/* hero section */}
    <section id="home" className="mb-20 flex min-h-screen flex-col justify-center md:mb-0 md:flex-row">
      <div data-aos={"fade-right"} data-aos-once={"false"} className="mb-16 flex w-full max-w-xl flex-col justify-center md:mb-0 md:w-1/2">
        <h1 className="mb-8 text-5xl font-bold md:mb-10 md:text-7xl">
          {/* Growing your <br /> */}

          <span className="text-[#AFFC41]">Growing</span> your <br/>
          {/* <span className="text-[#AFFC41]">business.</span> */}
          business.
        </h1>
        <p className="mb-8 text-xl font-thin md:mb-10 md:text-3xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam consectetur atque est nemo ab facere.</p>
        <Link href={'#contact'}>
          <button className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 font-thin md:text-xl hover:opacity-80 duration-500">consult now.</button>
        </Link>
      </div>
      <div data-aos={"fade-left"} className="flex w-full items-center px-5 md:w-1/2">
        <img className="max-h-96 w-full object-contain" src="https://github.com/taychris/lots-of-images/blob/main/hero-img.png?raw=true" alt="" />
      </div>
    </section>

    {/* about section */}
    <section id="about" className="mb-20 flex min-h-screen flex-col items-center justify-center scroll-m-24 md:scroll-m-0 md:mb-0 md:flex-row md:justify-between">
      <div data-aos={"fade-left"} className="relative order-first mb-10 w-full md:order-last md:w-[45%]">
        <h1 className="mb-8 text-5xl font-bold md:mb-10 md:text-7xl">
          What do we <br />
          <span className="text-[#AFFC41]">offer?</span>
        </h1>
        <p className="mb-8 text-xl font-thin md:mb-20 md:text-3xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam consectetur atque est nemo ab facere.</p>
        <img className="absolute right-0 top-44 w-48 md:relative md:right-auto md:top-auto md:m-auto md:w-2/3" src="https://github.com/taychris/lots-of-images/blob/main/dots.png?raw=true" alt="" />
      </div>

      <div className="order-last md:order-first w-full md:w-[45%]">
        <div data-aos={"fade-right"}  className="mb-10 flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#1</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Web Development</h1>
            <button className="text-xl text-[#AFFC41] group hover:opacity-80 duration-500">Explore <span className="group-hover:ml-2 duration-500">&rarr;</span></button>
          </div>
        </div>

        <div data-aos={"fade-right"}  className="mb-10 flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#2</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Graphic Design</h1>
            <button className="text-xl text-[#AFFC41] group hover:opacity-80 duration-500">Explore <span className="group-hover:ml-2 duration-500">&rarr;</span></button>
          </div>
        </div>

        <div data-aos={"fade-right"}  className="flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#3</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Video Editing</h1>
            <button className="text-xl text-[#AFFC41] group hover:opacity-80 duration-500">Explore <span className="group-hover:ml-2 duration-500">&rarr;</span></button>
          </div>
        </div>
      </div>
    </section>

    {/* portfolio section */}
    <section id="portfolio" className="mb-20 flex min-h-screen flex-col items-center justify-center scroll-m-24 md:scroll-m-0  md:mb-0">
      <h1 data-aos={"fade-down"}  className="mb-16 text-center text-5xl font-bold md:text-7xl">
        Our latest<br />
        <span className="text-[#AFFC41]">projects.</span>
      </h1>
      <div className="mb-10 flex flex-col gap-10 md:flex-row">
        <RecentProjects/>
      </div>
      <Link href={'/portfolio'}>
        <button data-aos={"fade-up"} className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 font-thin md:text-xl hover:opacity-80 duration-500">portfolio.</button>
      </Link>
    </section>

    {/* contact section */}
    <section id="contact" className="flex flex-col justify-center items-center min-h-screen">
      <h1 data-aos={"fade-down"}  className="mb-16 text-center text-5xl font-bold md:text-7xl">
        We can <br />
        <span className="text-[#AFFC41]">talk.</span>
      </h1>
      <div data-aos={"fade-up"} className="w-full flex justify-center">
        <ContactForm/>
      </div>
    </section>
  </>
  )
}
