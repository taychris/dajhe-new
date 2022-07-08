import Link from "next/link"
import { useState, useEffect } from "react"
// import { MenuContext } from "../common/menuContext"
import {Squash as Hamburger} from 'hamburger-react'
import { useRouter } from "next/router"
import { auth } from "../common/firebase"
import { useUserData } from '../common/hooks';
import toast, { Toaster } from "react-hot-toast";

const Nav = ({navigateEvent}) => {
  const router = useRouter()
  const [location, setLocation] = useState()
  const [isOpen, setIsOpen] = useState(false)
  // const {menuValue, setMenuValue} = useContext(MenuContext)
  const userData = useUserData();

  // const handleClick = () => {
  //   setIsOpen(!isOpen)
  // }

  useEffect(() => {
    //on route change, set the location
    setLocation(router.pathname)
    setIsOpen(false)
  }, [router.asPath])

  return (
    <>
      
        <nav className={`fixed z-10 flex flex-col w-screen ${isOpen ? "h-screen backdrop-blur-md" : "h-14"} justify-center items-center px-10 text-white bg-[#2411276c] backdrop-blur-sm duration-500 md:flex-row md:justify-between md:!h-14`}>
          <div className="w-full h-[10%] flex justify-between items-center md:h-auto md:w-auto">
            <Link href={"/#home"}>
              <h1 className="font-bold text-2xl cursor-pointer"><span className="text-[#AFFC41]">dajhe</span>.</h1>
            </Link>
            <div className="md:hidden">
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
          </div>
          {location && location.includes("/dashboard") ?  
            <ul className={`${isOpen ? "h-[90%]" : "h-0"} flex flex-col items-center justify-center gap-8 duration-500 overflow-hidden md:h-auto md:flex-row`}>
                <Link href={'/#home'}>
                  <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Home</li>
                </Link>
                <Link href={'/dashboard'}>
                  <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Dashboard</li>
                </Link>
                <Link href={'/dashboard/create-post'}>
                  <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Create post</li>
                </Link>
                <li onClick={() => {
                                    setIsOpen(!isOpen)}} className="text-xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]"><SignOutButton router={router}/></li>
            </ul>
            : 
            <ul className={`${isOpen ? "h-[90%]" : "h-0"} flex flex-col items-center justify-center gap-8 duration-500 overflow-hidden md:h-auto md:flex-row`}>
                    <Link href={"/#home"}>
                      <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Home</li>
                    </Link>
                    <Link href={"/#about"}>
                      <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">About</li>
                    </Link>
                    <Link href={"/#portfolio"}>
                      <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Portfolio</li>
                    </Link>
                    <Link href={"/#contact"}>
                      <li className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Contact</li>
                    </Link>
                    {userData.user && <Link href={'/dashboard'}>
                      <li  className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 font-thin md:text-sm hover:opacity-80 duration-500 cursor-pointer">Dashboard</li>
                    </Link>}
                </ul>

            }
        </nav>
    </>
  )
}

const SignOutButton = props => {
  const signOut = async () => {
      await auth.signOut().then(() => {
          props.router.push('/enter')
          toast.success('Signed out.')
      })
      .catch((e) => {
          console.log(e)
          toast.error(e.message)
      })
  };

  return (
    <>
      <Toaster/>
      <button onClick={signOut} className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 font-thin md:text-sm hover:opacity-80 duration-500">Sign out</button>
    </>
  )
}

export default Nav