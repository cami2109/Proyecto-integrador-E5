import React from "react";
import { Link } from "react-router-dom";

const Card = ({ info, children, idArray }) => {
  
  const { nombre, imagenUrl, precio, id } = info;

  return (
    <div className="card">
      <Link to={"/details/" + idArray}>
        <img src={imagenUrl} style={{width: "100%"}} />
        <div>
          <h2>{nombre}</h2>
          <h4>{"$"+ precio}</h4>
          <h4>Ver mas..</h4>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Card;
