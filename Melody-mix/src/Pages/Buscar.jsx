import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Card from "../Components/Card";
import Reservas from "../Components/Reservas";
import { useUserContext } from "../Context/Context";

const Buscar = () => {
  const { state } = useUserContext()
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [resultados, setResultados] = useState([]);
  const [noResults, setNoResults] = useState(false); // Estado para manejar el mensaje de no encontrado

  //ejecuta la primera busqueda cuando viene del home
  useEffect(() => {
    // Filtrar los instrumentos que coincidan con el nombre
    const trimmedQuery = query.trim();
    const filtered = state.products.filter((instrumento) => 
      instrumento.nombre.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setResultados(filtered);
    setNoResults(filtered.length === 0);
  }, []);

  // Función para realizar la búsqueda
  const handleSearch = () => {
    // Filtrar los instrumentos que coincidan con el nombre
    const trimmedQuery = query.trim();
    const filtered = state.products.filter((instrumento) =>
      instrumento.nombre.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setResultados(filtered);
    setNoResults(filtered.length === 0); // Actualiza el estado de no encontrado
    navigate(`/buscar?q=${encodeURIComponent(trimmedQuery)}`); //url con el valor de la busqueda
  };

  // Función para seleccionar todo el texto en el input
  const handleDoubleClick = (e) => {
    e.target.select(); // Selecciona todo el texto en el input
  };

  const titulo = "Fechas disponibles"; //titulo a usar en <Reservas/>

  return (
    <div className="main-content">
      <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra el instrumento que deseas</h2>
        </div>
        <div className="section-top-right">
          <input
            type="text"
            placeholder="Buscar instrumento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onDoubleClick={handleDoubleClick}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </section>

      <>
        {noResults ? (
          <p> no resulados</p>
        ) : (
          resultados.map((instrumento) => (
            <div className="section-caract-reserva">
              <Card key={instrumento.id} info={instrumento} />
              <Reservas id={instrumento.id} titulo={titulo} />
            </div>
          ))
        )}
      </>
    </div>
  );
};

export default Buscar;
