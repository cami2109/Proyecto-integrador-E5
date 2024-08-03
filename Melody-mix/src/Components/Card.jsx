import CardStyles from '../Styles/Card.module.css'
import Counter from './Counter';
//console.log(CardStyles);
const Card = ({item, setCart}) => {
  //const {img, tipo, precio} = item
  return (
    <div className={CardStyles.cardContainer}>
        {/* <h2 className="titulo">Otro ejemplo css</h2> */}
        <img src={item.imagen} alt={item.nombre} className={CardStyles.cardImg} />
        <h4>{item.nombre}</h4>
        <h4>${item.precio}</h4>
        {/* <Counter/> */}
        {/* <button onClick={() => setCart([...cart, item])}>🛒</button> */}

        {/* Otra forma de dar el valor del state, es mediante un callback y traigo el valor
        del estado por parametro con --prev-- (llamado aca como prevState). entonces en este
        caso ya no necesito pedir por parametro el valor del state (cart) */}
        <button onClick={() => setCart((prevState) => [...prevState, item])}>🛒</button>        

    </div>
  )
}

export default Card