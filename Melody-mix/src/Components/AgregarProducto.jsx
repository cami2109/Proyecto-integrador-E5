import React, { useState } from 'react'

const AgregarProducto = ({}) => {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    caracteristicas: [],
    imagen: ""
  })



  return (
    <div className='overlay'>
      <div className='card-modificar'>
        <h2>Crear Producto</h2>
        <form action="">
                <label htmlFor="imagen">Imagen:</label>
                  <input type="text" onChange={(e) => setProducto({...producto, imagen: e.target.value})}/>
                <label htmlFor="nombre">Nombre:</label>
                    <input type="text" onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
                <label htmlFor="precio">Precio:</label>
                    <input type="text"  onChange={(e) => setProducto({...producto, precio: e.target.value})}/>
                <label htmlFor="descripcion">Descripción</label>
                    <input type="text" onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
                {/* <div>
                  <h4>Caracteristicas</h4>
                  <input type="text" />
                  <button>✅</button>
                  <button>❌</button>
                </div> */}
            </form>
      </div>
    </div>
  )
}

export default AgregarProducto