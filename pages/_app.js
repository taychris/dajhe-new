import '../styles/globals.css'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { useState } from 'react'
import { MenuContext } from '../common/menuContext'

function MyApp({ Component, pageProps }) {
  const [menuValue, setMenuValue] = useState("home")

  return (
    <MenuContext.Provider value={{menuValue, setMenuValue}}>
      <Nav/>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
      <Footer/>
    </MenuContext.Provider>
  )
}

export default MyApp
