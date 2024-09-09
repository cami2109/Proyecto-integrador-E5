import React from 'react'
import "../App.css"
import Card from './Card'
import { useUserContext } from '../Context/Context'

const Recomendaciones = () => {
  const {state} = useUserContext()

   // mostrar cards en forma desordenada
   // Genera un array de índices (0, 1, 2,..., instrumentos.length - 1)
   const indices = [...Array(state.products.length).keys()]
   // Desordena los índices de forma aleatoria y lurgo tomo solo hasta 10
   const randomIndices = indices.sort(() => Math.random() - 0.5).slice(0, 10)
   
  


  return (
    <section className="section">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="section-bottom">          
          {randomIndices.map((index) => {
            return (               
              <Card key={index} info={state.products[index]} />   
            )
          })}
          {/* {state.products.map((i, index) => {
            return(
              <Card key={index} info={i} />
            )
          })} */}
        </div>
      </section>
  )
}

export default Recomendaciones