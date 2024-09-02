import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import { useUserContext } from '../Context/Context'

const Instrumentos = () => {
  const { state } = useUserContext()
  const instrumentos = state.products;

  return (
    <section className="section">
        <h2>Instrumentos por tipo</h2>
        <div className="section-mid">
          <div key={1} className="card">
            <Link to={"/instrumentos/teclados"}>
              {/* <h3>Card {1}</h3>
              <p> card {1}</p> */}
              <img src='/Img/CategVarios.jpg' alt="LOGO" style={{width: "100%"}}/>
              <h3>Teclados</h3>
            </Link>
          </div>
          <div key={2} className="card">
            <Link to={"instrumentos/percusion"}>
              {/* <h3>Card {2}</h3>
              <p> card {2}</p> */}
              <img src='/Img/CategPercusion.jpg' alt="LOGO" style={{width: "100%"}}/>
              <h3>Percusión</h3>
            </Link>
          </div>
          <div key={3} className="card">
            <Link to={"instrumentos/viento"}>
              {/* <h3>Card {3}</h3>
              <p> card {3}</p> */}
              <img src='/Img/CategViento.jpg' alt="LOGO" style={{width: "100%"}}/>
              <h3>Viento</h3>
            </Link>
          </div>
          <div key={4} className="card">
            <Link to={"instrumentos/cuerda"}>
              {/* <h3>Card {4}</h3>
              <p> card {4}</p> */}
              <img src='/Img/CategCuerda.jpg' alt="LOGO" style={{width: "100%"}}/>
              <h3>Cuerda</h3>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default Instrumentos;
