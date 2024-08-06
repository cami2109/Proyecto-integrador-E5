import '../App.css'
import Buscador from '../Components/Buscador'
import Recomendaciones from '../Components/Recomendaciones'
import TipoInstrumentos from '../Components/TipoInstrumentos'


const Home = () => {
  return (
    <div className="grid-container">
      <main className="main-content">
        <Buscador />
        <TipoInstrumentos />
        <Recomendaciones />
      </main>
    </div>
  )
}

export default Home
