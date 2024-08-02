import React from 'react'
import { instrumentos } from '../Utils/listaInstrumentos'

const TiposInstrumentos = () => {
  return (
    <div>
      <h3>Instrumentos por tipo</h3>
        <div>
          <img src={instrumentos[0].imagen} alt="" />
          <img src={instrumentos[1].imagen} alt="" />
          <img src={instrumentos[3].imagen} alt="" />
          <img src={instrumentos[4].imagen} alt="" />
        </div>
    </div>
  )
}

export default TiposInstrumentos