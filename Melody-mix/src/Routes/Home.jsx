import React from 'react'
import Buscador from '../Components/Buscador'
import TiposInstrumentos from '../Components/TiposInstrumentos'
import Recomendaciones from '../Components/Recomendaciones'

const Home = () => {
  return (
    <div>
        <Buscador /> 
        <TiposInstrumentos />
        <Recomendaciones />
    </div>
  )
}

export default Home