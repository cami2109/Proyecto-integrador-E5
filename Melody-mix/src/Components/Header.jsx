import React from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/Context";


const Header = () => {
  const {state} = useUserContext()


  return (
    <div className="header" >
      <div className="header-left">
        <div className="logo">
        <Link to="/"><img src='/Img/logo.png' alt="LOGO" width={140}/></Link>
        {/* <Link to="/"><FontAwesomeIcon icon="fa-solid fa-bars" fade /></Link> */}
        </div>
        <div>Tu viaje musical a un click</div>
      </div>
      <div className="header-right">
        <nav className="nav">
          {state.user.nombre ? <Link to={"/perfil"}><h4>{state.user.nombre + state.user.apellido}</h4></Link>: <><Link to="/login"><h4>Login</h4></Link><Link to="/crearcuenta"><h4>Crear Cuenta</h4></Link></>}
          {state.admin && <h4>Modo Admin</h4>}
        </nav>
        <div className="hamb">
          <img src="Img/hamb.png" alt="hamburguesa" width={30}/>
        </div>
      </div>
    </div>
  );
};

export default Header
