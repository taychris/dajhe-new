const Layout = ({children}) => {
  return (
    <main className="flex flex-col items-center overflow-y-hidden bg-gradient-to-bl from-[#241127] via-[#4e0759] to-[#241127] text-white">
        <div className="w-[80%]">
            {children}
        </div>
    </main>
  )
}

export default Layout