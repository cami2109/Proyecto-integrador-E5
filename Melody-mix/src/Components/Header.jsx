import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/Context";

const Header = () => {
  const { state } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú

  const handleMouseEnter = () => {
    setMenuOpen(true); // Mostrar el menú cuando se pasa el cursor por encima
  };

  const handleMouseLeave = () => {
    setMenuOpen(false); // Ocultar el menú cuando se quita el cursor
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">
            <img src="/Img/logo.png" alt="LOGO" width={140} />
          </Link>
        </div>
        <div>Tu viaje musical a un click</div>
      </div>
      <div className="header-right">
        <nav className="nav">
          {state.user.nombre ? (
            <Link to={"/perfil"}>
              <h4>{state.user.nombre + " " + state.user.apellido}</h4>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <h4>Login</h4>
              </Link>
              <Link to="/crearcuenta">
                <h4>Crear Cuenta</h4>
              </Link>
            </>
          )}
        </nav>
        <div
          className="hamb"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src="Img/hamb.png" alt="hamburguesa" width={30} />
        </div>
        {/* Menú desplegable */}
        {menuOpen && (
          <ul className="dropdown-menu">            
            {state.user.nombre ? (
            <Link to={"/perfil"}>
              <h4>{state.user.nombre + " " + state.user.apellido}</h4>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <h4>Login</h4>
              </Link>
              <Link to="/crearcuenta">
                <h4>Crear Cuenta</h4>
              </Link>
            </>
          )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
