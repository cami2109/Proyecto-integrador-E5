import React from "react";
import { useParams } from "react-router-dom";
import { instrumentos } from "../Utils/listaInstrumentos.js";

const Details = () => {
  const { id } = useParams();

  const instrumentoActual = instrumentos[id -1];

  return (
    <section className="main-content">
      <div>
        <h2>{instrumentoActual.nombre}</h2>
        <div className="detail">
          <img src={instrumentoActual.imagen} width={400} />
          <h4>{instrumentoActual.precio}</h4>
          <p>{instrumentoActual.descripcion}</p>
        </div>
      </div>
    </section>
  );
};

export default Details;
