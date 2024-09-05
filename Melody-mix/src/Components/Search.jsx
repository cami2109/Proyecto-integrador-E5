import React from "react";
import "../App.css"

const Search = () => {
  return (
    <div>
      <section className="section-top">
        <div className="section-top-left">
          <h2>Encuentra tu instrumento</h2>
        </div>
        <div className="section-top-right">
          <input type="search" />
          <button>Buscar</button>
        </div>
      </section>
    </div>
  );
};

export default Search;
