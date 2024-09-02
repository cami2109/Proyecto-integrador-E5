import React from "react";
import "../App.css";
import { useUserContext } from "../Context/Context";
import { categorias } from "../Utils/listaCategorias";

const Instrumentos = () => {
  const { state } = useUserContext();
  const instrumentos = state.products;

  return (
    <section className="section">
      <h2>Instrumentos por tipo</h2>
      <div className="section-mid">
        {categorias.map((categoria) => {
          console.log(categoria);
          return (
            <div key={categoria.id} className="card">
              <img
                src={categoria.imagen}
                alt="LOGO"
                style={{ width: "100%" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Instrumentos;
