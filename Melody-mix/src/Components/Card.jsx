import React from 'react'
import { Link } from 'react-router-dom'

const Card = ( {info} ) => {
    const {nombre, imagen, precio, id} = info

  return (
    <Link to={"/detalle/" + id}>
        <div className='card'>
            <h2>{nombre}</h2>
            <img src={imagen} />
            <div>
                <h4>{precio}</h4>
                <h4>Ver mas...</h4>
            </div>
        </div>
    </Link>
  )
}

export default Card