import React from 'react'
import "../App.css"

const Instrumentos = () => {
  return (
    <section className="section">
        <h2>Instrumentos por tipo</h2>
        <div className="section-mid">
          <div key={1} className="card">
            {/* <h3>Card {1}</h3>
            <p> card {1}</p> */}
            <img src='/Img/guitarra.jpeg' alt="LOGO" height={150}/>
          </div>
          <div key={2} className="card">
            {/* <h3>Card {2}</h3>
            <p> card {2}</p> */}
            <img src='/Img/bateria.jpeg' alt="LOGO" width={140}/>
          </div>
          <div key={3} className="card">
            {/* <h3>Card {3}</h3>
            <p> card {3}</p> */}
            <img src='/Img/flauta.jpeg' alt="LOGO" height={150}/>
          </div>
          <div key={4} className="card">
            {/* <h3>Card {4}</h3>
            <p> card {4}</p> */}
            <img src='/Img/piano.jpeg' alt="LOGO" width={140}/>
          </div>
        </div>
      </section>
  )
}

export default Instrumentos