import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reservas from "./Reservas.jsx";
import "../App.css";
import { useUserContext } from "../Context/Context.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const {state} = useUserContext()

  const instrumentoActual = state.products[id - 1];
  const titulo = "Selecciona las fechas para reservar"; //titulo a usar en <Reservas/>

  const showLoginAlert = () => {
    Swal.fire({
      title: 'No estás logueado',
      text: 'Debes iniciar sesión para ver los detalles del producto.',
      icon: 'warning',
      allowOutsideClick: false,  // Desactiva el clic fuera del modal
      allowEscapeKey: false,     // Desactiva el cierre con la tecla "Esc"
      confirmButtonText: 'Ir a login'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login"); // Redirige a /login si el usuario confirma
      }
    });
  };
  
  if (Object.keys((state.user)).length === 0) {
    // Si no hay usuario logueado, muestra el modal de alerta
    showLoginAlert();
    return null; // Evita renderizar el detalle mientras el modal está visible
  }
  

  return (
    <section className="main-detail">
      {instrumentoActual ? 
      <div>
        <h2>{instrumentoActual.nombre}</h2>
        <div className="detail">
          <img
            src={instrumentoActual.imagenUrl}
            alt={instrumentoActual.nombre}
            style={{ width: "40vw", height: "400px" }}
          />
          <h4>{"$" + instrumentoActual.precio}</h4>
          <p>{instrumentoActual.descripcion}</p>

          <div className="section-caract-reserva">
            <div>
              <h3>Caracteristicas del instrumento</h3>
              <ul style={{ paddingLeft: "20px", fontSize:"18px" }}>
                {instrumentoActual.caracteristicasList.map((i) => {
                  return <li style={{padding:"4px"}}>{i}</li>;
                })}
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
