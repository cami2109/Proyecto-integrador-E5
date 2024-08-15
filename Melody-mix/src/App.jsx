import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Details from "./Components/Details"
import Perfil from "./Pages/Perfil";


function App() {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element= {<Details/>}/>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/editar" element={<h3>Editar perfil</h3>} />
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
