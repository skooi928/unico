import React from 'react';
import { NavLink } from "react-router-dom";
import './Footer.css'; 

export const Footer = () => {
  return (
    <footer className="footer">
  <div className="container flex items-center justify-center">
    <div className="max-w-screen-xl row d-flex flex-wrap justify-between">
      <div className="col-md-4 flex flex-col items-center text-center md:text-center">
        <h4>General</h4>
        <ul>
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/visitpenang/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/visitpenang/faqs" className="nav-link">FAQs</NavLink></li>
        </ul>
      </div>
      <div className="col-md-4 flex flex-col items-center text-center md:text-center">
        <h4>More</h4>
        <ul>
          <li><NavLink to="/visitpenang/heritage" className="nav-link">Tourist Spots</NavLink></li>
          <li><NavLink to="/visitpenang/foods-and-beverages" className="nav-link">Foods & Beverages</NavLink></li>
          <li><NavLink to="/visitpenang/hotels" className="nav-link">Hotels</NavLink></li>
        </ul>
      </div>
      <div className="col-md-4 flex flex-col items-center text-center md:text-center">
        <h4>Social Media</h4>
        <ul className="social-icons">
          <li>
            <a href="https://www.facebook.com/VisitPenang" target="_blank" rel="noopener noreferrer">
              Facebook<i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/visitpenang" target="_blank" rel="noopener noreferrer">
              Instagram<i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/visitpenang" target="_blank" rel="noopener noreferrer">
              TikTok<i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="copyright text-center mt-6">
      <p className="copyright-text">
        &copy; 2024-2025 Visit Penang
      </p>
      <p className="copyright-text">
        Disclaimer: All contents, intellectual Properties & Copyrights Reserved
      </p>
    </div>
  </div>
</footer>

  );
};
