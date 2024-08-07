import React from "react"
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <div align="center" className="header-left">
        <div className="logo">
          <img src='/Img/logo.jpeg' alt="LOGO" width={140}/>
        </div>
        <div>Tu viaje musical a un click</div>
      </div>
      <div className="header-right">
        <nav className="nav">
          <Link to="/"><h4>Home</h4></Link>
          <Link to="/login"><h4>Login</h4></Link>
          <Link to="/register"><h4>Register</h4></Link>
        </nav>
        <div class="hamb">
            <img src="Img/hamb.png" alt="hamburguesa"/>
        </div>
      </div>
    </div>
  );
};

export default Header
