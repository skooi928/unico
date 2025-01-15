import React from "react";
import "./Cart.css";
import { Header } from "../components";


export const Cart = () => {
  return (
    <div className="shopping-cart-container">
      <Header />   
      <div className="empty-basket">
        <div className="empty-icon">
          <i className="fa fa-shopping-bag"></i>
        </div>
        <p>Your basket is empty</p>
        <p>The items you add will be shown here</p>
      </div>

      {/* Suggestions Section */}
      <div className="suggestions">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="suggestions-items">
          {/* Sample items, replace these with dynamic content */}
          <div className="suggestion-item">
            <img src="/images/sample-perfume.jpg" alt="Perfume" />
            <p>RED ZARA TEMPTATION</p>
          </div>
          <div className="suggestion-item">
            <img src="/images/sample-jeans.jpg" alt="Jeans" />
            <p>WIDE-LEG JEANS</p>
          </div>
          <div className="suggestion-item">
            <img src="/images/sample-coat.jpg" alt="Coat" />
            <p>BLACK COAT</p>
          </div>
          <div className="suggestion-item">
            <img src="/images/sample-perfume2.jpg" alt="Perfume" />
            <p>GOLDEN DELUXE</p>
          </div>
          <div className="suggestion-item">
            <img src="/images/sample-jacket.jpg" alt="Leather Jacket" />
            <p>LEATHER JACKET</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;