import React from 'react'
import "../App.css"
import { instrumentos } from "../Utils/listaInstrumentos"
import Card from './Card'

const Recomendaciones = () => {
   // mostrar cards en forma desordenada
   // Genera un array de índices (0, 1, 2,..., instrumentos.length - 1)
   const indices = [...Array(instrumentos.length).keys()];
   // Desordena los índices de forma aleatoria y lurgo tomo solo hasta 10
   const randomIndices = indices.sort(() => Math.random() - 0.5).slice(0, 10);
   
  return (
    <section className="section">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="section-bottom">          
          { randomIndices.map((index) => {
            return (                
                <Card key={instrumentos[index].id} info={instrumentos[index]}/>
            )
          })}
        </div>
      </section>
  )
}

export default Recomendaciones