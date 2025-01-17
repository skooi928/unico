import React from "react";
import "./Header.css";
import logo from "../assets/logo.svg";
import heartIcon from "/Icon/heart.webp"; 
import cartIcon from "/Icon/shopping-cart.webp";
import userIcon from "/Icon/user.webp";
import { NavLink } from "react-router-dom";

export const Header = () =>{
  const isLoggedIn = !!localStorage.getItem("token"); // or context, etc.

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" style={{textDecoration:'none', height:'50px'}}><img src={logo} alt="Unico Logo" className="logo" /></a>
      </div>

      <nav className="nav">
        <ul className="horizontal-list">
          <li>
            <NavLink to="/product" className="header-nav-link" activeClassName="active">
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/product/women" className="header-nav-link" activeClassName="active">
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="/product/kids" className="header-nav-link" activeClassName="active">
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink to="/product/accesories" className="header-nav-link" activeClassName="active">
              Accessories
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
        <NavLink to={ isLoggedIn ? "/profile" : "/login" }>
          <button className="icon-button">
            <img src={userIcon} alt="User" className="icon" />
          </button>
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
