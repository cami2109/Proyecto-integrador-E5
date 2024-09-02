import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";

const Formu = () => {

  const {dispatch} = useUserContext()

  const [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: ""
  });
  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState(false);

  const [erroresEspecificos, setErroresEspecificos] = useState([])

  const navigate = useNavigate()

  const configs = {
    method: "POST",
    body: JSON.stringify(info),
    headers: {
        'Content-Type': 'application/json'
    }
  }

    const handleSubmit = (e) => {
      e.preventDefault();

      const validarNombre = (nombre) => {
        const nombreRegex = /^[a-zA-Z]{4,}$/
        
        return nombreRegex.test(nombre)
      }

      const validarApellido = (apellido) => {
        const apellidoRegex = /^[a-zA-Z]{6,}$/

        return apellidoRegex.test(apellido)
      }

      const validarEmail = (emailTest) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(emailTest);
      };

      const validarContraseña = (contraseña) => {
        const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/

        return contraseñaRegex.test(contraseña)
      }

      const validarUsuario = () => {

        if(validarNombre(info.nombre) && validarApellido(info.apellido) && validarEmail(info.email) && validarContraseña(info.contrasena)){
          return true
        }

        return false
      }



    if (validarUsuario()){
      
      setShowCard(true);
      setError(false);
      fetch("http://localhost:8080/usuario/registro", configs)
      .then(res => res.json())
      .then(data => dispatch({type: "LOG_IN", payload: data}),  
        setTimeout(() => {
          navigate("/")
        }, 3000))
      .catch(error => {
        setError(true);
        setErroresEspecificos(["Error : " + error])

      })
    } else {
      setError(true);
      setShowCard(false);
      const erroresNuevos = []
      if(!validarNombre(info.nombre.trim())) erroresNuevos.push("El nombre debe tener minimo 3 caracteres que sean letras")
      if(!validarApellido(info.apellido.trim())) erroresNuevos.push("El apellido debe tener minimo 6 caracteres que sean letras")
      if(!validarEmail(info.email.trim())) erroresNuevos.push("El email es incorrecto, debe tener @ y .com")
      if(!validarContraseña(info.contrasena.trim())) erroresNuevos.push("La contraseña debe tener minimo 6 caracteres una mayuscula y un número")
      setErroresEspecificos(erroresNuevos)
    }
  };

    return (
      <>
        <form>
          <h3 style={{textAlign:"center"}}>Crear Cuenta</h3>
          <hr />
          <br /><br />
          <div className="form-group">
            <label htmlFor="Nombre"></label>
            <input
              type="text"
              placeholder="Nombre"
              value={info.nombre}
              onChange={(e) => setInfo({ ...info, nombre: e.target.value })}
              onFocus={() => (setShowCard(false), setError(false))}
            />
            <span className="icon">👤</span>
          </div>
          <div className="form-group">
            <label htmlFor="Apellido"></label>
            <input
              type="text"
              placeholder="Apellido"
              value={info.apellido}
              onChange={(e) => setInfo({ ...info, apellido: e.target.value })}
              onFocus={() => (setShowCard(false), setError(false))}
            />
            <span className="icon">👤</span>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              onFocus={() => (setShowCard(false), setError(false))}
            />
            <span className="icon">📧</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="contraseña"
              value={info.contrasena}
              onChange={(e) => setInfo({ ...info, contrasena: e.target.value })}
              onFocus={() => (setShowCard(false), setError(false))}
            />
            <span className="icon">🔒</span>
          </div>
          <button onClick={handleSubmit}>Registrarse</button>
        </form>
        {showCard && <p>aguarda por favor</p>}
        {error && erroresEspecificos.map((i, index) => <p key={index}>{i}</p>)}
      </>
    );
  };

  export default Formu;
