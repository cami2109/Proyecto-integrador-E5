import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info }) => {
  const { nombre, imagen, precio, id } = info;

  return (
    <div className="card">
      <Link to={"/details/" + id}>
        <img src={imagen} width={200}/>
        <div>
          <h2>{nombre}</h2>
          <h4>{precio}</h4>
          <h4>ver mas...</h4>
        </div>
      </Link>
    </div>
  );
};

export default Card;
