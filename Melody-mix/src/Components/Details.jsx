import React from 'react'
import { instrumentos } from '../Utils/listaInstrumentos'
import { useParams } from 'react-router-dom'


const Details = () => {
    const { id } = useParams()

    const instrumentoActual = instrumentos[id - 1]

  return (
    <div>
        <h2>{instrumentoActual.nombre}</h2>
        <img src={instrumentoActual.imagen} />
        <h4>{instrumentoActual.precio}</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem numquam ducimus, incidunt rem vitae tempore nisi error mollitia doloribus accusamus, eaque reprehenderit id quia qui sunt voluptas excepturi explicabo blanditiis.</p>
    </div>
  )
}

export default Details