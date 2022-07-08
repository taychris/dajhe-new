import Link from "next/link"
// import { useContext } from "react"
// import { MenuContext } from "../common/menuContext"

const Footer = () => {
  // const {menuValue, setMenuValue} = useContext(MenuContext)

  return (
    <footer className="bg-[#111118] text-white flex flex-col justify-center items-center py-10 md:flex-row md:items-start">
        <div className="flex flex-col gap-2 border-l-0 w-56 mb-10 md:mb-0">
            <h2 className="text-xl text-[#AFFC41]">dajhe.</h2>
            <a className="font-extralight" href="">dajheproduction@gmail.com</a>
            <a className="font-extralight" href="">+421911997766</a>
            <a className="font-extralight" href="">Bratislava, Slovakia</a>
        </div>
        <div className="flex flex-col gap-2 border-l-0 w-56 md:border-l-2 md:pl-8">
            <h2 className="text-xl text-[#AFFC41]">navigate.</h2>
            <Link href={"/#home"}>
              <p className="font-extralight cursor-pointer hover:text-[#AFFC41] duration-500">home</p>
            </Link>
            <Link href={"/#about"}>
              <p className="font-extralight cursor-pointer hover:text-[#AFFC41] duration-500">about</p>
            </Link>
            <Link href={"/#portfolio"}>
              <p className="font-extralight cursor-pointer hover:text-[#AFFC41] duration-500">portfolio</p>
            </Link>
            <Link href={"/#contact"}>
              <p className="font-extralight cursor-pointer hover:text-[#AFFC41] duration-500">contact</p>
            </Link>
        </div>
    </footer>
  )
}

export default Footer