import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [info, setInfo] = useState({
        email: "",
        contraseña: ""
    });

    const [showCard, setShowCard] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const validarEmail = (emailTest) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(emailTest);
        };

          if (validarEmail(info.email.trim())){
            setShowCard(true);
            setError(false);
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } else {
            setError(true);
            setShowCard(false);
        }


    }


  return (
    <div className='crearCuenta'>
        <form>
        <h3 style={{textAlign:"center"}}>Log In</h3>
        <hr />
        <br /><br />
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
        <button onClick={() => (handleSubmit)}>Ingresar</button>
        </form>
        {showCard && <p>aguarda por favor</p>}
        {error && <p>chequea que la información</p>}
    </div>
  )
}

export default LogIn