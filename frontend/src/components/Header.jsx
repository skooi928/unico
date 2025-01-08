import React from "react";
import "./Header.css";
import logo from "../assets/Unico.webp";
import heartIcon from "/Icon/heart.webp"; 
import cartIcon from "/Icon/shopping-cart.webp";
import { NavLink } from "react-router-dom";


export const Header = () =>{
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Unico Logo" className="logo" />
      </div>

      <nav className="nav">
        <ul className="horizontal-list">
          <li>
            <NavLink to="unico/product" className="nav-link" activeClassName="active">
              Product
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="icon-container">
        <NavLink to="/favorites">
          <button className="icon-button">
            <img src={heartIcon} alt="Favorites" className="icon" />
          </button>
        </NavLink>
        <NavLink to="/cart">
          <button className="icon-button">
            <img src={cartIcon} alt="Cart" className="icon" />
          </button>
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
