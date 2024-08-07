import React from 'react'
import "../App.css"
import { instrumentos } from "../Utils/listaInstrumentos"
import Card from './Card'

const Recomendaciones = () => {
  return (
    <section className="section">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="section-bottom">          
          { instrumentos.map((item) => {
            return (
                <Card key={item.id} info={item}/>
            )
          })}
        </div>
      </section>
  )
}

export default Recomendaciones