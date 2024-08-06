import React from 'react'
import Header from './Components/Header'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Rutas from './Rutas'


const Layout = () => {
  return (
    <>
      <Header />
      <Rutas />
      <Footer />
    </>
  )
}

export default Layout