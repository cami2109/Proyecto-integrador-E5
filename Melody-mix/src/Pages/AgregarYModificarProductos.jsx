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
        if(state.user.isAdmin) navigate("/")
    }, [])

    const toggleModificarEliminar = (index) => {
        const nuevoVisible = [...showModificarEliminar];
        nuevoVisible[index] = !nuevoVisible[index];
        setShowModificarEliminar(nuevoVisible);
    };


  return (
    <div className='agregar-modificar'>
        <div className='agregar-modificar-section'>
            <button className="btn-agregar-producto" onClick={() => setShowAgregar(!showAgregar)}>Agregar Producto</button>
                {state.products.instrumentos.map((i, index) => {
                    return(
                        <>
                            <Card key={i.id} info={i}>
                                <div>
                                    <button onClick={(e) => toggleModificarEliminar(index)}>Modificar/eliminar</button>
                                </div>
                            </Card> 
                            {showModificarEliminar[index] && <ModificarEliminar key={index} info={i} setShow={toggleModificarEliminar} />}
                        </>
                    )
                })}
        </div>
        {showAgregar && <AgregarProducto setShow={setShowAgregar}/>}
    </div>
  )
}

export default AgregarYModificarProductos