import Link from "next/link"
import { useState, useContext } from "react"
import { MenuContext } from "../common/menuContext"

const Nav = ({navigateEvent}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {menuValue, setMenuValue} = useContext(MenuContext)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`fixed z-10 flex flex-col w-screen ${isOpen ? "h-screen backdrop-blur-md" : "h-14"} justify-center items-center px-10 text-white bg-[#2411276c] backdrop-blur-sm duration-500 md:flex-row md:justify-between md:!h-14`}>
        <div className="w-full h-[10%] flex justify-between items-center md:h-auto md:w-auto">
            <h1 className="font-bold text-2xl"><span className="text-[#AFFC41]">dajhe</span>.</h1>
            <button onClick={handleClick} className="text-xl md:hidden">x</button>
        </div>
        <ul className={`${isOpen ? "h-[90%]" : "h-0"} flex flex-col items-center justify-center gap-8 duration-500 overflow-hidden md:h-auto md:flex-row`}>
            <li onClick={() => {setMenuValue("home")
                                setIsOpen(!isOpen)}} className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Home</li>
            <li onClick={() => {setMenuValue("about")
                                setIsOpen(!isOpen)}} className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">About</li>
            <li onClick={() => {setMenuValue("portfolio")
                                setIsOpen(!isOpen)}} className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Portfolio</li>
            <li onClick={() => {setMenuValue("contact")
                                setIsOpen(!isOpen)}} className="text-3xl font-extralight cursor-pointer duration-500 md:text-lg hover:text-[#AFFC41]">Contact</li>
        </ul>
        {/* <ul className="h-[90%] flex flex-col items-center justify-center gap-8 md:h-auto md:flex-row">
            <li className="text-3xl font-extralight md:text-lg">Home</li>
            <li className="text-3xl font-extralight md:text-lg">About</li>
            <li className="text-3xl font-extralight md:text-lg">Portfolio</li>
            <li className="text-3xl font-extralight md:text-lg">Contact</li>
        </ul> */}
    </nav>
  )
}

export default Nav