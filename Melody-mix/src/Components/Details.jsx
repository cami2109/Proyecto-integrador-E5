import React from "react";
import { useParams } from "react-router-dom";
import { instrumentos } from "../Utils/listaInstrumentos.js";
import Reservas from "./Reservas.jsx";

const Details = () => {
  const { id } = useParams();

  const instrumentoActual = instrumentos[id - 1];

  return (
    <section className="main-detail">
      <div>
        <h2>{instrumentoActual.nombre}</h2>
        <div className="detail">
          <img src={instrumentoActual.imagenDetalle} />
          <h4>{instrumentoActual.precio}</h4>
          <p>{instrumentoActual.descripcion}</p>

          <div className="section-caract-reserva">
            <div>
              <h3>Caracteristicas del instrumento</h3>
              <ul style={{ paddingLeft: "20px" }}>
                {instrumentoActual.caracteristicas.map((i) => {
                  return <li>{i}</li>;
                })}
              </ul>
            </div>
            <div>
              {/* <Reservas/> */}
              <Reservas id={id} />
            </div>
          </div>
                
        </div>
      </div>
    </section>
  );
};

export default Details;
