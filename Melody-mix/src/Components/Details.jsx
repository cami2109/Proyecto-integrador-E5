import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reservas from "./Reservas.jsx";
import "../App.css";
import { useUserContext } from "../Context/Context.jsx";


const Details = () => {
  const { id } = useParams();

  const {state} = useUserContext()

  const instrumentoActual = () => {
    return state.products.find(i => Number(id) === Number(i.id));
  };
  
  const titulo = "Selecciona las fechas para reservar"; //titulo a usar en <Reservas/>
  instrumentoActual()
  console.log(instrumentoActual().caracteristicasList);
  
  return (
    <section className="main-detail">
      {instrumentoActual() ? 
      <div>
        <h2>{instrumentoActual().nombre}</h2>
        <div className="detail">
          <img
            src={instrumentoActual().imagenUrl}
            alt={instrumentoActual().nombre}
            style={{ width: "40vw", height: "400px" }}
          />
          <h4>{"$" + instrumentoActual().precio}</h4>
          <p>{instrumentoActual().descripcion}</p>

          <div className="section-caract-reserva">
            <div>
              <h3>Caracteristicas del instrumento</h3>
              <ul style={{ paddingLeft: "20px", fontSize:"18px" }}>
                {instrumentoActual().caracteristicasList.length > 0 ? instrumentoActual().caracteristicasList.map((i) => {
                  return <li style={{padding:"4px"}}>{i}</li>;
                }): <li style={{padding:"4px"}}>No hay Caracteristicas</li>}
              </ul>
            </div>
            <div>
              <Reservas id={id} titulo={titulo} />
            </div>
          </div>
        </div>
      </div>
      : <h3>Cargando...</h3>
      }
    </section>
  )
}

export default Details;
