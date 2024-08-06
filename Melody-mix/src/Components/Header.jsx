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
          <Link to="/"><p>Home</p></Link>
          <a href="#login">Login</a>
          <a href="#register">Register</a>
        </nav>
      </div>
    </div>
  );
};

export default Header
