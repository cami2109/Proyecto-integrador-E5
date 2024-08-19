import React from "react";
import { useParams } from "react-router-dom";
import { instrumentos } from "../Utils/listaInstrumentos.js";

const Details = () => {
  const { id } = useParams();
  console.log(id);

  const instrumentoActual = instrumentos[id -1];
  console.log(instrumentos);

  return (
    <section className="main-content">
      <div>
        <h2>{instrumentoActual.nombre}</h2>
        <div className="detail">
          <img src={instrumentoActual.imagen} width={400} />
          <h4>{instrumentoActual.precio}</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            numquam ducimus, incidunt rem vitae tempore nisi error mollitia
            doloribus accusamus, eaque reprehenderit id quia qui sunt voluptas
            excepturi explicabo blanditiis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Details;
