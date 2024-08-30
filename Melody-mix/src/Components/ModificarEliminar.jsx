import React, { useState } from 'react'

const ModificarEliminar = ({ info, setShow }) => {

    const {nombre, precio, descripcion, id, caracteristicas, imagen} = info

    const [producto, setProducto] = useState({
        id: id,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        caracteristicas: caracteristicas
    })

    const [showBotones, setShowBotones] = useState([new Array(producto.caracteristicas.length).fill(false)])
    const [showInput, setShowInput] = useState(false)
    const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")

    const toggleShowBotones = (index) => {
        const nuevoVisible = [...showBotones];
        nuevoVisible[index] = !nuevoVisible[index];
        setShowBotones(nuevoVisible);
    };

    const handleDelete = (i) => {
        const carac = caracteristicas
        carac.splice(i, 1)
        setProducto({...producto, caracteristicas: carac})
        // setShowBotones([...showBotones, showBotones[i] = false])
    }

  return (
    <div className='overlay'>
        <div className='card-modificar'>
            <img src={producto.imagen} />
            <h2>Id: {producto.id}</h2>
            <h3>Nombre: {producto.nombre}</h3>
            <h3>Precio: {producto.precio}</h3>
            <p>Descripción: {producto.descripcion}</p>
            <h3>Caracteristicas: </h3>
            <ul>
                {producto.caracteristicas.map((i, index) => {
                    return(
                        <li key={index}>{i}</li>
                    )
                })}
            </ul>
            <form action="">
                <h3>Campos a modificar</h3>
                <label htmlFor="nombre">Nombre:</label>
                    <input type="text" placeholder={producto.nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
                <label htmlFor="precio">Precio:</label>
                    <input type="text" placeholder={producto.precio} onChange={(e) => setProducto({...producto, precio: e.target.value})}/>
                <label htmlFor="descripcion">Descripción</label>
                    <input type="text" placeholder={producto.descripcion} onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
                <h4>Caracteristicas</h4>
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
            <div>
                <button onClick={(e) => {e.preventDefault(), setShow(id - 1)}}>✅</button> {/*Guardar cambios*/}
                <button onClick={(e) => {e.preventDefault(), setShow(id - 1)}}>❌</button> {/*Borrar producto*/}
            </div>
        </div>
    </div>
  )
}

export default ModificarEliminar