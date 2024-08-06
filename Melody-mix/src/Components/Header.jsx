import React from "react"
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <img src="" alt="LOGO" />
        </div>
        <div>Tu viaje musical a un click</div>
      </div>
      <div className="header-right">
        <nav className="nav">
          <Link to="/"><h4>Home</h4></Link>
          <Link to="/login"><h4>Login</h4></Link>
          <Link to="/register"><h4>Register</h4></Link>
        </nav>
      </div>
    </div>
  );
};

export default Header
