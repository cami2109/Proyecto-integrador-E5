import React, { useState } from 'react'

const AgregarProducto = ({}) => {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    caracteristicas: [],
    imagen: ""
  })

  const [showInput, setShowInput] = useState(false)
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")


  const handleDelete = (i) => {
    const carac = caracteristicas
    carac.splice(i, 1)
    setProducto({...producto, caracteristicas: carac})
    // setShowBotones([...showBotones, showBotones[i] = false])
  }


  return (
    <div className='overlay'>
      <div className='card-modificar'>
        <h2>Crear Producto</h2>
        <form action="">
                <label htmlFor="imagen">Imagen:</label>
                  <input type="text" onChange={(e) => setProducto({...producto, imagen: e.target.value})}/>
                  <button>Agregar</button>
                <label htmlFor="nombre">Nombre:</label>
                    <input type="text" onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
                    <button>Agregar</button>
                <label htmlFor="precio">Precio:</label>
                    <input type="text"  onChange={(e) => setProducto({...producto, precio: e.target.value})}/>
                    <button>Agregar</button>
                <label htmlFor="descripcion">Descripción</label>
                    <input type="text" onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
                    <button>Agregar</button>
                <ul>
                    {producto.caracteristicas.map((i, index) => { 
                        return(
                            <li key={index}>
                                <a onClick={() => toggleShowBotones(index)}>{i}</a>
                                {showBotones[index] && (
                                    <div>
                                        <button onClick={(e) => {e.preventDefault(), handleDelete(index)}}>-</button>
                                    </div>
                                )}
                            </li>
                        )}
                    )}
                    <button onClick={(e) => {e.preventDefault(), setShowInput(!showInput)}}>+</button>
                    {showInput && 
                      <>
                        <input type='text' onChange={(e) => setNuevaCaracteristica(e.target.value)}/>
                        <button onClick={(e) => {e.preventDefault(), (nuevaCaracteristica && setProducto({...producto, caracteristicas: [...producto.caracteristicas, nuevaCaracteristica]})), setNuevaCaracteristica("")}}>Agregar</button>
                      </>
                  }
                </ul>
            </form>
      </div>
    </div>
  )
}

export default AgregarProducto