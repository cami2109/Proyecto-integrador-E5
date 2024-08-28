import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/Context'
import Card from '../Components/Card'
import ModificarEliminar from '../Components/ModificarEliminar'
import AgregarProducto from '../Components/AgregarProducto'

const AgregarYModificarProductos = () => {

    const {state} = useUserContext()

    const [showAgregar, setShowAgregar] = useState(false)

    const [showModificarEliminar, setShowModificarEliminar] = useState(new Array(state.products.instrumentos.length).fill(false))

    const navigate = useNavigate()

    useEffect(() => {
        if(!state.isAdmin) navigate("/")
    }, [])

    const toggleModificarEliminar = (index) => {
        const nuevoVisible = [...showModificarEliminar];
        nuevoVisible[index] = !nuevoVisible[index];
        setShowModificarEliminar(nuevoVisible);
    };


  return (
    <div className='section'>
        {/* primer card para agregar productos */}
        <button onClick={() => setShowAgregar(!showAgregar)}>Agregar Producto</button>
        {showAgregar && <AgregarProducto />}
        <div className='section-bottom'>
            {state.products.instrumentos.map((i, index) => {
                return(
                    <>
                        <Card key={i.id} info={i}>
                            <div>
                                <button onClick={() => toggleModificarEliminar(index)}>Modificar/eliminar</button>
                            </div>
                        </Card> 
                        {showModificarEliminar[index] && <ModificarEliminar key={index} info={i} setShow={toggleModificarEliminar}/>}
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default AgregarYModificarProductos