import React, { useState } from 'react'

const ModificarEliminar = ({ info, setShow }) => {

    const {nombre, precio, descripcion, id, caracteristicas, imagen} = info

    const [producto, setProducto] = useState({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        caracteristicas: caracteristicas
    })

    const [showBotones, setShowBotones] = useState([new Array(caracteristicas.length).fill(false)])
    const [showInput, setShowInput] = useState(false)

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
            <img src={imagen} />
            <h2>Id:{id}</h2>
            <h3>Nombre:{nombre}</h3>
            <h3>Precio:{precio}</h3>
            <p>Descripción:{descripcion}</p>
            <h3>Caracteristicas: </h3>
            <ul>
                {caracteristicas.map((i, index) => {
                    return(
                        <li key={index}>{i}</li>
                    )
                })}
            </ul>
            <form action="">
                <h3>Campos a modificar</h3>
                <label htmlFor="nombre">Nombre:</label>
                    <input type="text" placeholder={nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
                <label htmlFor="precio">Precio:</label>
                    <input type="text" placeholder={precio} onChange={(e) => setProducto({...producto, precio: e.target.value})}/>
                <label htmlFor="descripcion">Descripción</label>
                    <input type="text" placeholder={descripcion} onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
                <h4>Caracteristicas</h4>
                <ul>
                    {producto.caracteristicas.map((i, index) => (
                        <li key={index}>
                            <a onClick={() => toggleShowBotones(index)}>{i}</a>
                            {showBotones[index] && (
                                <div>
                                    <button onClick={(e) => {e.preventDefault(), handleDelete(index)}}>-</button>
                                    <button onClick={(e) => {e.preventDefault(), setShowInput(true)}}>+</button>
                                    {showInput && <input type='text' onChange={(e) => {}}/>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </form>
            <div>
                <button onClick={() => setShow(id - 1)}>✅</button> {/*Guardar cambios*/}
                <button onClick={() => setShow(id - 1)}>❌</button> {/*Borrar producto*/}
            </div>
        </div>
    </div>
  )
}

export default ModificarEliminar