import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from "react-router-dom";
import Detalle from './Components/Detalle';


const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detalle/:id" element={<Detalle />}/>
        <Route path="*" element={<h1>Página no encontrada.</h1>} />
      </Routes>
      {/* no se porque no funciona el pull */}
    </>
  )
}

export default Rutas