import '../styles/globals.css'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { MenuContext } from '../common/menuContext'
import { UserContext } from '../common/userContext'
import { useUserData } from '../common/hooks';
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [menuValue, setMenuValue] = useState("home")

  const userData = useUserData();

  if(pageProps.protected && !userData.user) {
    return <Layout>
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    </Layout>
  }

  return (
    <UserContext.Provider value={{userData}}>
      <MenuContext.Provider value={{menuValue, setMenuValue}}>
        <Nav/>
        <Layout> 
          <Component {...pageProps} />
        </Layout>
        <Footer/>
      </MenuContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp
