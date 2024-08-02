import React, { useState } from 'react'

const InputBuscador = () => {

    const [instrumento, setInstrumento] = useState('')
    

  return (
    <div>
        <input type="text" onChange={(e) => setInstrumento(e.target.value)}/>
        <button>Buscar</button>
    </div>
  )
}

export default InputBuscador