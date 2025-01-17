import React from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import logo from "../assets/logo.svg";
import heartIcon from "/Icon/heart.webp"; 
import cartIcon from "/Icon/shopping-cart.webp";
import userIcon from "/Icon/user.webp";
import { NavLink } from "react-router-dom";

export const Header = () => {

  const location = useLocation();
  const currentActive = location.hash.replace('#', '') || "";

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" style={{ textDecoration: 'none', height: '50px' }}>
          <img src={logo} alt="Unico Logo" className="logo" />
        </a>
      </div>

      <nav className="nav">
        <ul className="horizontal-list">
          <li>
            <NavLink
              to="/product#Men"
              className={ currentActive === "Men" ? "header-nav-link selected" : "header-nav-link"}
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product#Women"
              className={ currentActive === "Women" ? "header-nav-link selected" : "header-nav-link"}
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product#Kids"
              className={ currentActive == "Kids" ? "header-nav-link selected" : "header-nav-link"}
            >
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product#Accessories"
              className={ currentActive == "Accessories" ? "header-nav-link selected" : "header-nav-link"}
            >
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
        <NavLink to="/profile">
          <button className="icon-button">
            <img src={userIcon} alt="User" className="icon" />
          </button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;