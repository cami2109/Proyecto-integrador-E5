import React from "react";
import "../App.css"

const Search = () => {
  return (
    <div>
      <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra el instrumento que deseas</h2>
        </div>
        <div className="section-top-right">
          <input type="text" />
          <button>Buscar</button>
        </div>
      </section>
    </div>
  );
};

export default Search;
