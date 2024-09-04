import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instrumentos } from "../Utils/listaInstrumentos"; // Importa la lista de instrumentos
import Calendar from "react-calendar";

const Buscar = () => {
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [resultados, setResultados] = useState([]);
  const [noResults, setNoResults] = useState(false); // Estado para manejar el mensaje de no encontrado

  //ejecuta la primera busqueda cuando viene del home
  useEffect(() => {
    // Filtrar los instrumentos que coincidan con el nombre
    const trimmedQuery = query.trim();
    const filtered = instrumentos.filter((instrumento) =>
      instrumento.nombre.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setResultados(filtered);
    setNoResults(filtered.length === 0);
  }, []);

  // Función para realizar la búsqueda
  const handleSearch = () => {
    // Filtrar los instrumentos que coincidan con el nombre
    const trimmedQuery = query.trim();
    const filtered = instrumentos.filter((instrumento) =>
      instrumento.nombre.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setResultados(filtered);
    setNoResults(filtered.length === 0); // Actualiza el estado de no encontrado
  };

  // Función para seleccionar todo el texto en el input
  const handleDoubleClick = (e) => {
    e.target.select(); // Selecciona todo el texto en el input
  };

  return (
    <div>
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

      <div>
        {noResults ? (
          <p> no resulados</p>
        ) : (
          resultados.map((instrumento) => (
            <div className="section-caract-reserva">
              <div key={instrumento.id} className="card">
                <h2>{instrumento.nombre}</h2>
                <img
                  src={instrumento.imagenDetalle}
                  alt={instrumento.nombre}
                  style={{ width: "40%" }}
                />
              </div>
              <Calendar />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buscar;
