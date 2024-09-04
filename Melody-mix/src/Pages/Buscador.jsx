import React from "react";
import { useUserContext } from "../Context/Context";
import "../App.css";
import Calendar from "react-calendar";

const Buscador = () => {
  const { state } = useUserContext();
  const { instrumentos } = state.products;

  return (
    <>
      <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra el instrumento que deseas</h2>
        </div>
        <div className="section-top-right">
          <input type="text" />
          <button>Buscar</button>
        </div>
      </section>
      <div >
        {instrumentos.map((instrumento) => {
          console.log(instrumento);
          return (
            <div className="section-caract-reserva">
            <div key={instrumento.id} className="card">
              <h2>{instrumento.nombre}</h2>
              <img
                src={instrumento.imagenDetalle}
                alt="LOGO"
                style={{ width: "60%" }}
              />
             
            </div >
            <Calendar />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Buscador;
