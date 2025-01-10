import React from 'react';
import { NavLink } from "react-router-dom";
import './Footer.css'; 

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex items-center justify-center">
        <div className="footer-left max-w-screen-xl row d-flex flex-wrap justify-between">
          <div className="col-md-4 flex flex-col items-center text-center md:text-center">
            <h4>Customer Service</h4>
            <ul>
              <li><NavLink to="/help" className="footer-nav-link">Help Center</NavLink></li>
              <li><NavLink to="/contact" className="footer-nav-link">Contact Us</NavLink></li>
              <li><NavLink to="/returns" className="footer-nav-link">Returns</NavLink></li>
            </ul>
          </div>
          <div className="col-md-4 flex flex-col items-center text-center md:text-center">
            <h4>Company</h4>
            <ul>
              <li><NavLink to="/about" className="footer-nav-link">About Us</NavLink></li>
              <li><NavLink to="/careers" className="footer-nav-link">Careers</NavLink></li>
              <li><NavLink to="/press" className="footer-nav-link">Press</NavLink></li>
            </ul>
          </div>
          <div className="col-md-4 flex flex-col items-center text-center md:text-center">
            <h4>Follow Us</h4>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com/YourEcommerce" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/YourEcommerce" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/YourEcommerce" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright text-center mt-6">
          <p className="copyright-text">
            &copy; 2024-2025 Unico All Rights Reserved
          </p>
          <p className="copyright-text">
            Disclaimer: All contents, intellectual Properties & Copyrights Reserved
          </p>
        </div>
      </div>
    </footer>

  );
};
