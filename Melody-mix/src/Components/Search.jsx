import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualiza el estado con el valor del input
  };
  
  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      navigate(`/buscar?q=${encodeURIComponent(inputValue)}`); // Redirige a la página de búsqueda con el término en la query
    }
  }
  
  return (
    <div>
      <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra tu instrumento</h2>
        </div>
        <div className="section-top-right">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Buscar instrumento..."
          />
            <button onClick={handleSearch}>Buscar</button> {/* Llama a handleSearch cuando se presiona el botón */}
        </div>
      </section>
    </div>
  );
};

export default Search;
