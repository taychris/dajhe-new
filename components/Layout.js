const Layout = ({children}) => {
  return (
    <main className="flex flex-col items-center overflow-y-hidden bg-[#241127] text-white">
        <div className="w-[80%]">
            {children}
        </div>
    </main>
  )
}

export default Layout