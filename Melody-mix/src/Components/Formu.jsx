import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Formu = () => {
  const [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });
  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const validarEmail = (emailTest) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(emailTest);
    };

    if (validarEmail(info.email.trim()) && info.nombre.trim().length >= 6) {
      setShowCard(true);
      setError(false);
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } else {
      setError(true);
      setShowCard(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{textAlign:"center"}}>Crear Cuenta</h3>
        <hr />
        <br />
        <br />
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
            value={info.contraseña}
            onChange={(e) => setInfo({ ...info, contraseña: e.target.value })}
            onFocus={() => (setShowCard(false), setError(false))}
          />
          <span className="icon">🔒</span>
        </div>
        <button onClick={() => (handleSubmit)}>Registrarse</button>
      </form>
      {showCard && <p>aguarda por favor</p>}
      {error && <p>chequea que la información</p>}
    </div>
  );
};

export default Formu;
