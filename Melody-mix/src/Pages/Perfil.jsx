import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"


const Perfil = () => {

    const iniciales = (nombre) => {
        let nombreSeparado = nombre.split(' ')
        return nombreSeparado[0].charAt(0) + nombreSeparado[1].charAt(0)
    }

    const [user, setUser] = useState({})

    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/users/1").then((res) => {
            setUser(res.data)
        })
    }, [])

  return (
    <div>
        <h2>{iniciales(user.name)}</h2>
        <div>
            {/* imagen iniciales nombre */}
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
        </div>
        
        <Link to={"/perfil/editar"}><button>Editar perfil</button></Link>
        <button>Cerrar sesión</button> {/*Ejecutar dispatch cerrar sesion*/}
    </div>
  )
}

export default Perfil