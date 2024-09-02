import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";

const LogIn = () => {
  const { dispatch } = useUserContext();

  const [info, setInfo] = useState({
    email: "",
    contrasena: "",
    contrasenaAdmin: ""
  });

  const [isChecked, setIsChecked] = useState(false);

  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState(false);
  const [erroresEspecificos, setErroresEspecificos] = useState([]);

  const configs = {
    method: "POST",
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const esAdmin = () => {
    //   if (passAdmin == "ADMIN" && isChecked){
    //     setInfo({...info, contrasenaAdmin: passAdmin})
    //   }
    // };

    const validarEmail = (emailTest) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(emailTest);
    };

    const validarContraseña = (pass) => {
      const passRegex = /^.{7,}$/; // por el momento solo chequea que tenga mas de 6 caracteres, mas adelante le ponemos mas validaciones

      return passRegex.test(pass);
    };


    if (
      validarEmail(info.email.trim()) &&
      validarContraseña(info.contrasena.trim())
    ) {
      setShowCard(true)
      setError(false)
      fetch("http://localhost:8080/usuario/login", configs)
        .then((res) => res.json())
        .then((data) =>
          dispatch(
            { type: "LOG_IN", payload: data },
            setTimeout(() => {
              navigate("/");
            }, 3000)
          )
        )
        .catch((error) => {
          setError(true);
          setShowCard(false);
          setErroresEspecificos(["no login. Error: " + error]);
        });
    } else {
      setError(true);
      setShowCard(false);
      const erroresNuevos = [];
      if (!validarEmail(info.email.trim()))
        erroresNuevos.push("Email incorrecto");
      if (!validarContraseña(info.contrasena.trim()))
        erroresNuevos.push("Contraseña incorrecta");
      setErroresEspecificos(erroresNuevos);
    }
  };

  return (
    <div className="crearCuenta">
      <form>
        <h3 style={{ textAlign: "center" }}>Log In</h3>
        <hr />
        <br />
        <br />
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            onFocus={() => (setShowCard(false), setError(false))}
          />
          <span className="icon">📧</span>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={info.contrasena}
            onChange={(e) => setInfo({ ...info, contrasena: e.target.value })}
            onFocus={() => (setShowCard(false), setError(false))}
          />
          <span className="icon">🔒</span>
        </div>
        <div className="checkbox">
          <p>Admin</p>
          <input type="checkbox" onChange={() => setIsChecked(!isChecked)} />
        </div>
        {isChecked && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña Admin"
              // value={}
              onChange={(e) => setInfo({...info, contrasenaAdmin: e.target.value})}
            />
            <span className="icon">🔒</span>
          </div>
        )}
        <button onClick={handleSubmit}>Ingresar</button>
      </form>
      <div>
        {showCard && <p>aguarda por favor</p>}
        {error &&
          erroresEspecificos.map((i, index) => {
            return <p key={index}>{i}</p>;
          })}
      </div>
    </div>
  );
};

export default LogIn;
