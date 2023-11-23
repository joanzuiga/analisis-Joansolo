import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"
import logo from "./Assets/SupercellLogo.png"
function Navbar(props) {

    if (props.isLogin) {

        return (
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <div className="links-container">
                    <Link to="/signup" className="nav-link">Registrarse</Link>

                </div>
            </nav>
        );

    } else if (props.isSignUp) {

        return (
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <div className="links-container">
                    <Link to="/login" className="nav-link">Iniciar sesion</Link>

                </div>
            </nav>
        );

    } else if (props.isAdmin) {

        return (
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <div className="links-container">
                    <Link to="/ShowUsers" className="nav-link">Inicio</Link>
                    <Link to="/ShowUsers" className="nav-link">Usuarios</Link>
                    <Link to="/ShowProducts" className="nav-link">Productos</Link>
                    <Link to="/login" className="nav-link">Cerrar sesíon</Link>
                </div>
            </nav>
        );

    } else {

        return (
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <div className="links-container">
                    <Link to="/Home" className="nav-link">Inicio</Link>
                    <Link to="/login" className="nav-link">Cerrar sesíon</Link>
                    
                </div>
            </nav>
        );

    }


}

export default Navbar;