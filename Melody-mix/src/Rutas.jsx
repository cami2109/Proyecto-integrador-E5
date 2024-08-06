import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from "react-router-dom";

const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="" element={}/> */}
        <Route path="*" element={<h1>Página no encontrada.</h1>} />

      </Routes>
    </>
  )
}

export default Rutas