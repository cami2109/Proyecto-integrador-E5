import React, { useState } from 'react'
import { useUserContext } from '../Context/Context'

const AgregarProducto = ({ setShow }) => {

  const { state, dispatch } = useUserContext()

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    caracteristicas: [],
    imagen: "",
    categoria: ""
  })

  const [showInput, setShowInput] = useState(false)
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")
  const [input, setInput] = useState("")

  const [productoCompleto, setProductoCompleto] = useState(true)


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

  const handleSubmit = () => {
    const pasaNombre = () => {
      state.products.instrumentos.map((i) => {
        if(producto.nombre === i.nombre){
          return false
        }
      })
      return true
    }
    const estaCompleto = () => {
      return !!(producto.precio && 
             producto.nombre && 
             producto.imagen && 
             producto.descripcion && 
             producto.caracteristicas.length > 0 && 
             producto.categoria)
    }

    const configs = {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    }    

    if(pasaNombre() && estaCompleto()){
      // fetch agregar producto
      fetch("http://localhost:8080/instrumento/registrar", configs)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setShow(false)
      })
      .catch(error => console.log(error))
      
    } else {
      setProductoCompleto(false)
    }

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
                    <button onClick={(e) => {e.preventDefault(), setProducto({...producto, nombre: input}), setInput("")}}>Agregar</button>
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
                  <button onClick={(e) => {e.preventDefault(), setProducto({...producto, categoria: input}), setInput("")}}>Agregar</button>
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
            {!productoCompleto && <h2>Asegurate de que el producto este completo, y que no se repita ningun nombre</h2>}
            <div>
                <button onClick={(e) => {e.preventDefault(), handleSubmit(), console.log(producto)}}>✅</button> {/*Guardar cambios*/}
                <button onClick={(e) => {e.preventDefault(), setShow(false), setProducto({})}}>❌</button> {/*Borrar producto*/}
            </div>
      </div>
    </div>
  )
}

export default AgregarProducto