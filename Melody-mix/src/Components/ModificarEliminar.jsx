import React, { useState } from 'react'

const ModificarEliminar = ({ info, setShow }) => {

    const {nombre, precio, descripcion, id, caracteristicas, imagen} = info

    const [producto, setProducto] = useState({
        id: id,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        caracteristicas: caracteristicas,
        categorias: ""
    })

    const [modificaciones, setModificaciones] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        categorias: ""
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
        console.log(i)
        const carac = producto.caracteristicas
        carac.splice(i, 1)
        setProducto({...producto, caracteristicas: carac})
    }


  return (
    <div className='overlay'>
        <div className='card-modificar'>
            <img src={producto.imagen} />
            <h2>Id: {producto.id}</h2>
            <h3>Nombre: {producto.nombre}</h3>
            <h3>Precio: {producto.precio}</h3>
            <p>Descripción: {producto.descripcion}</p>
            <h3>Categoria: {producto.categorias}</h3>
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
                <div className="input-container">
                    <input type="text" placeholder={producto.nombre} onChange={(e) => setModificaciones({...modificaciones, nombre: e.target.value})} />
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, nombre: modificaciones.nombre})}}>Agregar</button>
                </div>

                <label htmlFor="precio">Precio:</label>
                <div className="input-container">
                    <input type="text" placeholder={producto.precio} onChange={(e) => setModificaciones({...modificaciones, precio: e.target.value})}/>
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, precio: modificaciones.precio})}}>Agregar</button>
                </div>

                <label htmlFor="descripcion">Descripción</label>
                <div className="input-container">
                    <input type="text" placeholder={producto.descripcion} onChange={(e) => setModificaciones({...modificaciones, descripcion: e.target.value})}/>
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, descripcion: modificaciones.descripcion})}}>Agregar</button>
                </div>

                <label htmlFor="categorias">Categoría: </label>
                <div className='input-container'>
                    <input type="text" placeholder={producto.categorias} onChange={(e) => setModificaciones({...modificaciones, categorias: e.target.value})}/>
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, categorias: modificaciones.categorias})}}>Agregar</button>
                </div>

                <h3>Características</h3>
                <ul>
                    {producto.caracteristicas.map((i, index) => (
                        <li key={index}>
                            <a onClick={() => toggleShowBotones(index)}>{i}</a>
                            {showBotones[index] && (
                                <div>
                                    <button onClick={(e) => {e.preventDefault(), handleDelete(index)}}>-</button>
                                </div>
                            )}
                        </li>
                    ))}
                    <button onClick={(e) => {e.preventDefault(), setShowInput(!showInput)}}>+</button>
                    {showInput && 
                        <div className="nueva-caracteristica">
                            <input type='text' onChange={(e) => setNuevaCaracteristica(e.target.value)}/>
                            <button onClick={(e) => {e.preventDefault(), (nuevaCaracteristica && setProducto({...producto, caracteristicas: [...producto.caracteristicas, nuevaCaracteristica]})), setNuevaCaracteristica("")}}>Agregar</button>
                        </div>
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