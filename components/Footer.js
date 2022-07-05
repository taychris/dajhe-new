const Footer = () => {
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
            <a className="font-extralight" href="">home</a>
            <a className="font-extralight" href="">about</a>
            <a className="font-extralight" href="">portfolio</a>
            <a className="font-extralight" href="">contact</a>
        </div>
    </footer>
  )
}

export default Footer