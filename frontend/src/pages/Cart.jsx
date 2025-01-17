import React, { useState } from "react";
import "./Cart.css";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import Card from '../components/Product/Card';

export const Cart = ({ cartItems }) => {
  
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
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
          <div className="cart-items">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <div className="cart-item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                  <span className="added-to-cart">Added to Cart</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;