import React from "react";
import "../App.css";
import Search from "../Components/Search";
import Instrumentos from "../Components/Instrumentos";
import Recomendaciones from "../Components/Recomendaciones";

const Home = () => {
  return (
    <main className="main-content">  
      <Instrumentos/>     
      <Search/>           
      <Recomendaciones/>
    </main>
  );
};

export default Home;
