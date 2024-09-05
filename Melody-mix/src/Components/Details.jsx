import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reservas from "./Reservas.jsx";
import { useUserContext } from "../Context/Context.jsx";

const Details = () => {
  const { id } = useParams();

  const { state } = useUserContext()

  const instrumentoActual = state.products[id - 1]

  return (
      <section className="main-detail">
        {instrumentoActual ?  (
          <div>
            <h2>{instrumentoActual.nombre}</h2>
            <div className="detail">
              <img src={instrumentoActual.imagenUrl} />
              <h4>{"$"+instrumentoActual.precio}</h4>
              <p>{instrumentoActual.descripcion}</p>

              <div className="section-caract-reserva">
                <div>
                  <h3>Caracteristicas del instrumento</h3>
                  <ul style={{ paddingLeft: "20px" }}>
                    {instrumentoActual.caracteristicasList.map((i) => {
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
        ) : <h3>Cargando...</h3>}
      </section>
    )
};

export default Details;
