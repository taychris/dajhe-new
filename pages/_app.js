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

  //this is used, because the page doesnt
  //need the wrapper on the project page
  const getContent = () => {
    if(pageProps.layout === false) {
      return <Component {...pageProps}/>
    } else {
      // console.log(userData.user.email)
      return ( 
        <Layout> 
          <Component {...pageProps} />
        </Layout>
      )
    }

  }

  //routing guard
  if(pageProps.protected && !userData.user) {
    return <Layout>
      <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    </Layout>
  }

  if(userData.user && pageProps.protected && userData.user.email !== 'christopher.szab@gmail.com') {
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
        {getContent()}
        <Footer/>
      </MenuContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp
