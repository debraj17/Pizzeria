import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpeg';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark text-center">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand text-white">Pizzeria</Link>
          <Link to="/">
            <img 
              src={logo}
              alt="Pizzeria Logo" 
              style={{width:'50px', height:'50px', cursor:'pointer'}} 
            />
          </Link>
          <Link to="/orderPizza" className="nav-link text-white mx-3">Order Pizza</Link>
          <Link to="/buildPizza" className="nav-link text-white mx-3">Build Ur Pizza</Link>
        </div>
        <div>
          <Link to="/shoppingCart" className="btn btn-warning">🛒 Shopping Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;