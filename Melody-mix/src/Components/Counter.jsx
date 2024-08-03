import { useState } from "react";

const Counter = () => {
    const [counter, setCounter] = useState(0)
    console.log(counter);

    // let contador = 0

    const restar = () => {
        // console.log(contador);
        // contador --
        setCounter (counter-1)
    }
    const sumar = () => {
        // console.log(contador);
        // contador++
        //setCounter (counter+1)

        //otra manera de conseguir el valor del state es pidiendo por 
        //--prev-- utilizando un callback con setState. esto es:        
        setCounter ((prev) => {
            console.log('el valor de prev es: ', prev);
            return prev +1
        })
    }
    // console.log(contador);
  return (
    <div>
        <button onClick={restar} disabled={counter===0}>-</button>
        {/* <h3>{contador}</h3> */}
        <h4>{counter}</h4>
        <button onClick={sumar}>+</button>

    </div>
  )
}

export default Counter