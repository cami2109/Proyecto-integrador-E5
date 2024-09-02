import React, { useState } from 'react'

const AgregarProducto = ({ setShow, id}) => {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    caracteristicas: [],
    imagen: "",
    categorias: ""
  })

  const [showInput, setShowInput] = useState(false)
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")
  const [input, setInput] = useState("")


  const [showBotones, setShowBotones] = useState([new Array(producto.caracteristicas.length).fill(false)])

  const toggleShowBotones = (index) => {
    const nuevoVisible = [...showBotones];
    nuevoVisible[index] = !nuevoVisible[index];
    setShowBotones(nuevoVisible);
  };

  const handleDelete = (i) => {
    const carac = producto.caracteristicas
    carac.splice(i, 1)
    setProducto({...producto, caracteristicas: carac})
  }


  return (
    <div className='overlay'>
      <div className='card-modificar'>
        <h2>Crear Producto</h2>
        <form action="">
                <label htmlFor="imagen">Imagen:</label>
                <div className="input-container">
                  <input type="text" onChange={(e) => setInput(e.target.value)}/>
                  <button onClick={(e) => {e.preventDefault(), setProducto({...producto, imagen: input}), setInput("")}}>Agregar</button>
                </div>
                <label htmlFor="nombre">Nombre:</label>
                <div className="input-container">
                    <input type="text" onChange={(e) => setInput(e.target.value)} />
                    <button onClick={(e) => {e.preventDefault(),setProducto({...producto, nombre: input}), setInput("")}}>Agregar</button>
                </div>
                <label htmlFor="precio">Precio:</label>
                <div className="input-container">
                    <input type="text"  onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, precio: input}), setInput("")}}>Agregar</button>
                </div>
                <label htmlFor="descripcion">Descripción</label>
                <div className="input-container">
                    <input type="text" onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, descripcion: input}), setInput("")}}>Agregar</button>
                </div>
                <label htmlFor="categorias">Categoría: </label>
                <div className='input-container'>
                  <input type="text" onChange={(e) => setInput(e.target.value)}/>
                  <button onClick={(e) => {e.preventDefault(), setProducto({...producto, categorias: input}), setInput("")}}>Agregar</button>
                </div>
                <h3>Caracteristicas</h3>
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
                      <div className='nueva-caracteristica'>
                        <input type='text' onChange={(e) => setNuevaCaracteristica(e.target.value)}/>
                        <button onClick={(e) => {e.preventDefault(), (nuevaCaracteristica && setProducto({...producto, caracteristicas: [...producto.caracteristicas, nuevaCaracteristica]})), setNuevaCaracteristica("")}}>Agregar</button>
                      </div>
                  }
                </ul>
            </form>
            <div>
                <button onClick={(e) => {e.preventDefault(), setShow(false), console.log(producto)}}>✅</button> {/*Guardar cambios*/}
                <button onClick={(e) => {e.preventDefault(), setShow(false)}}>❌</button> {/*Borrar producto*/}
            </div>
      </div>
    </div>
  )
}

export default AgregarProducto