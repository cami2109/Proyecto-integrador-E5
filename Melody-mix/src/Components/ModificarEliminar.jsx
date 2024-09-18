import React, { useState } from 'react'
import { useUserContext } from '../Context/Context'

const ModificarEliminar = ({ info, setShow, id }) => {

    const { state } = useUserContext()

    const {nombre, precio, descripcion,  caracteristicasList, imagenUrl, categoria} = info

    const token = localStorage.getItem("token");


    const [producto, setProducto] = useState({
        id: info.id,
        nombre: nombre,
        precio: precio,
        imagenUrl: imagenUrl,
        descripcion: descripcion,
        caracteristicasList: caracteristicasList,
        categorias: categoria
    })

    const [modificaciones, setModificaciones] = useState({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categorias: producto.categorias
    })

    const [showBotones, setShowBotones] = useState([new Array(producto.caracteristicasList.length).fill(false)])
    const [showInput, setShowInput] = useState(false)
    const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")
    const [productoCompleto, setProductoCompleto] = useState(true)

    const toggleShowBotones = (index) => {
        const nuevoVisible = [...showBotones];
        nuevoVisible[index] = !nuevoVisible[index];
        setShowBotones(nuevoVisible);
    };

    const handleDelete = (i) => {
        const carac = producto.caracteristicasList
        carac.splice(i, 1)
        setProducto({...producto, caracteristicas: carac})
    }



    const handleDeleteProduct = () => {
        const configs = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        };
    
        fetch(`http://localhost:8080/instrumento/${producto.id}`, configs)
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return res.text();
            })
            .then((text) => {
                try {
                    const data = JSON.parse(text);
                    console.log("Respuesta JSON:", data);
                    setShow(id);
                    location.reload();
                } catch (error) {
                    console.log("Respuesta en texto plano:", text);
                    setShow(id);
                    location.reload();
                }
            })
            .catch((error) => console.log("Error al borrar el producto:", error));
    };
    



    const handleSubmit = () => {
    
        const estaCompleto = () => {
            return !!(modificaciones.precio && 
                   modificaciones.nombre && 
                   producto.imagenUrl && 
                   modificaciones.descripcion && 
                   producto.caracteristicasList.length > 0 && 
                   modificaciones.categorias)
        }



        if (estaCompleto()) {
            const productoEnviar = {
                nombre: modificaciones.nombre,
                precio: Number(modificaciones.precio),
                imagenUrl: producto.imagenUrl,
                descripcion: modificaciones.descripcion,
                caracteristicas: producto.caracteristicasList.join(", "),
                categoria: modificaciones.categorias
            }
    
            const configs = {
                method: "PUT",
                body: JSON.stringify(productoEnviar),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token
                },
            }


            fetch(`http://localhost:8080/instrumento/actualizar/${producto.id}`, configs)
                .then((res) => {
                    if (!res.ok) {
                        return res.text().then((text) => {
                            throw new Error(`Error ${res.status}: ${text}`)
                        });
                    }
                    // Leer respuesta como texto plano
                    return res.text()
                })
                .then((text) => {
                    console.log("Respuesta en texto plano:", text)
                    setShow(id)
                    location.reload()
                })
                .catch((error) => console.log("Error al actualizar el producto:", error))
        } else {
            setProductoCompleto(false)
        }
    };
    
    
    
  return (
    <div className='overlay'>
        <div className='close-button-container'>
            <button onClick={() => setShow(id)} className='close-button'>✖</button>
        </div>
        <div className='card-modificar'>
            <img src={producto.imagenUrl} />
            <h2>Id: {producto.id}</h2>
            <h3>Nombre: {producto.nombre}</h3>
            <h3>Precio: {producto.precio}</h3>
            <p>Descripción: {producto.descripcion}</p>
            <h3>Categoria: {producto.categorias}</h3>
            <h3>Caracteristicas: </h3>
            <ul>
                {producto.caracteristicasList.map((i, index) => {
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
                    {/* <button onClick={(e) => {e.preventDefault(), setProducto({...producto, nombre: modificaciones.nombre})}}>Agregar</button> */}
                </div>

                <label htmlFor="precio">Precio:</label>
                <div className="input-container">
                    <input type="text" placeholder={producto.precio} onChange={(e) => setModificaciones({...modificaciones, precio: e.target.value})}/>
                    {/* <button onClick={(e) => {e.preventDefault(), setProducto({...producto, precio: modificaciones.precio})}}>Agregar</button> */}
                </div>

                <label htmlFor="descripcion">Descripción</label>
                <div className="input-container">
                    <input type="text" placeholder={producto.descripcion} onChange={(e) => setModificaciones({...modificaciones, descripcion: e.target.value})}/>
                    {/* <button onClick={(e) => {e.preventDefault(), setProducto({...producto, descripcion: modificaciones.descripcion})}}>Agregar</button> */}
                </div>

                <label htmlFor="categorias">Categoría: </label>
                <div className='input-container'>
                    <select 
                        value={modificaciones.categorias || producto.categorias} 
                        onChange={(e) => setModificaciones({...modificaciones, categorias: e.target.value}, console.log(modificaciones.categorias))}
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        <option value="Teclados">Teclados</option>
                        <option value="Percusion">Percusión</option>
                        <option value="Viento">Viento</option>
                        <option value="Cuerda">Cuerda</option>
                        {/* Añade más opciones según sea necesario */}
                    </select>
                    {/* <button onClick={(e) => {e.preventDefault(), setProducto({...producto, categorias: modificaciones.categorias})}}>Agregar</button> */}
                </div>


                <h3>Características</h3>
                <ul>
                    {producto.caracteristicasList.map((i, index) => (
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
                            <button onClick={(e) => {e.preventDefault(), (nuevaCaracteristica && setProducto({...producto, caracteristicasList: [...producto.caracteristicasList, nuevaCaracteristica]})), setNuevaCaracteristica("")}}>Agregar</button>
                        </div>
                    }
                </ul>
            </form>
            {!productoCompleto && <h2>Asegurate de que el producto este completo</h2>}
            <div>
                <button onClick={(e) => {e.preventDefault(), handleSubmit()}}>✅</button> {/*Guardar cambios*/}
                <button onClick={(e) => {e.preventDefault(), handleDeleteProduct()}}>❌</button> {/*Borrar producto*/}
            </div>
        </div>
    </div>
  )
}

export default ModificarEliminar