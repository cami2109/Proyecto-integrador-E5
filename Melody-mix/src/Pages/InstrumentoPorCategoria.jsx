import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../Context/Context'
import Card from '../Components/Card'


const InstrumentoPorCategoria = () => {

    const { instrumento } = useParams()

    const { state } = useUserContext()

    const instrumentosAMostrar = () => {
        const lista = []
        
        state.products.instrumentos.map((i) => {
            if(i.categoria === instrumento) lista.push(i)
        })

        return lista
    }


  return (
    <div>
        <h3>Categoria: {instrumento}</h3>
        <div className='section-bottom'>
            {instrumentosAMostrar().map(i => <Card key={i.id} info={i} />)}
        </div>
    </div>
  )
}

export default InstrumentoPorCategoria