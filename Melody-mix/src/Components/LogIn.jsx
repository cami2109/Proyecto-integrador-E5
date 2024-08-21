import React from 'react'
import { useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/Context';

const LogIn = () => {

  const {state, dispatch} = useUserContext()

  console.log(state.admin)

    const [info, setInfo] = useState({
        email: "",
          contrasena: ""
    });
    

    const [isChecked, setIsChecked] = useState(false)

    const [showCard, setShowCard] = useState(false);
    const [error, setError] = useState(false);

    const configs = {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
          'Content-Type': 'application/json'
      }
    }

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
            fetch("http://localhost:8080/usuario/login", configs)
            .then(res => {
              console.log(res.status)
              return res.json() 
            })
            .then(data => (dispatch({type: "LOG_IN", payload: data}, dispatch({type: "ADMIN", payload: isChecked}), setTimeout(() => {navigate("/")}, 3000))))
            .catch(error => {
              setError(true);
            })
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
            value={info.contrasena}
            onChange={(e) => setInfo({ ...info, contrasena: e.target.value })}
            onFocus={() => (setShowCard(false), setError(false))}
          />
          <span className="icon">🔒</span>
        </div>
        <input type='checkbox' onChange={() => setIsChecked(!isChecked)}/>
        <button onClick={handleSubmit}>Ingresar</button>
        </form>
        {showCard && <p>aguarda por favor</p>}
        {error && <p>chequea que la información</p>}
    </div>
  )
}

export default LogIn