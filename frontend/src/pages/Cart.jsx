 import React, { useState } from "react";
import "./Cart.css";
import { Header } from "../components";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleContinueShopping = () => {
    navigate("/"); // Adjust the path to match your shopping page route
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Cart is empty, add your items here</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
