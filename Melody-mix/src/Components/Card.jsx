import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info, children }) => {
  const { nombre, imagenUrl, precio, id } = info;

  return (
    <div className="card">
      <Link to={"/details/" + id}>
        <img src={imagenUrl} style={{width: "100%"}} />
        <div>
          <h2>{nombre}</h2>
          <h4>{"$"+ precio}</h4>
          <h4>ver mas...</h4>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Card;
