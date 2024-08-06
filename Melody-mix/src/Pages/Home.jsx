import React from "react";
import "../App.css";
import Search from "../Components/Search";
import Instrumentos from "../Components/Instrumentos";
import Recomendaciones from "../Components/Recomendaciones";

const Home = () => {
  return (
    <main className="main-content">
      {/* <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra el instrumento que deseas</h2>
        </div>
        <div className="section-top-right">
          <input type="text" />
          <button>Buscar</button>
        </div>
      </section> */}
      <Search/>

      {/* <section className="section">
        <h2>Instrumentos por tipo</h2>
        <div className="section-mid">
          <div key={1} className="card">
            <h3>Card {1}</h3>
            <p> card {1}</p>
          </div>
          <div key={2} className="card">
            <h3>Card {2}</h3>
            <p> card {2}</p>
          </div>
          <div key={3} className="card">
            <h3>Card {3}</h3>
            <p> card {3}</p>
          </div>
          <div key={4} className="card">
            <h3>Card {4}</h3>
            <p> card {4}</p>
          </div>
        </div>
      </section> */}
      <Instrumentos/>

      {/* <section className="section">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="section-bottom">
          <div key={1} className="card">
            <h3>Card {1}</h3>
            <p> card {1}</p>
          </div>
          <div key={2} className="card">
            <h3>Card {2}</h3>
            <p> card {2}</p>
          </div>
          <div key={3} className="card">
            <h3>Card {3}</h3>
            <p> card {3}</p>
          </div>
          <div key={4} className="card">
            <h3>Card {4}</h3>
            <p> card {4}</p>
          </div>
          <div key={5} className="card">
            <h3>Card {5}</h3>
            <p> card {5}</p>
          </div>
          <div key={6} className="card">
            <h3>Card {6}</h3>
            <p> card {6}</p>
          </div>
          <div key={7} className="card">
            <h3>Card {7}</h3>
            <p> card {7}</p>
          </div>
          <div key={8} className="card">
            <h3>Card {8}</h3>
            <p> card {8}</p>
          </div>
        </div>
      </section> */}
      <Recomendaciones/>
    </main>
  );
};

export default Home;
