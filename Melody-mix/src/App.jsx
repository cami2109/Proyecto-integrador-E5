import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Details from "./Components/Details"
import Perfil from "./Pages/Perfil";
import CrearCuenta from "./Pages/CrearCuenta";
import LogIn from "./Components/LogIn";
import InstrumentoPorCategoria from "./Pages/InstrumentoPorCategoria"
import AgregarYModificarProductos from "./Pages/AgregarYModificarProductos"
import Buscar from "./Pages/Buscar";




function App() {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element= {<Details/>}/>
          <Route path="/instrumentos/:instrumento" element={<InstrumentoPorCategoria />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crearcuenta" element={<CrearCuenta/>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/perfil/editar" element={<h3 style={{margin:"auto"}}>Editar perfil</h3>} />
          <Route path="/productos" element={<AgregarYModificarProductos />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/*" element={<h2 style={{margin:"auto"}}>Page not found</h2>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
