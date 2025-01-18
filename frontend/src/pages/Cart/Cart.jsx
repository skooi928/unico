import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Header } from "../../components";
import Card from '../../components/Product/Card';
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import  ItemsInCart  from "./ItemsInCart";

export const setCartItems = (item, cartItems, setCartItems) => {
  const existingItem = cartItems.find((cartItem) => 
    cartItem.id === item.id && 
    cartItem.size === item.size && 
    cartItem.color === item.color
  );

  let updatedCartItems;
  if (existingItem) {
    updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
  }

  setCartItems(updatedCartItems);
  console.log('Updated Cart Items:', updatedCartItems); // For debugging
};

export const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-content">
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Add your items here!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="card-container">
              {items.map((item) => (
                <ItemsInCart
                  key={item.id}
                  id={item.id}
                  image={item.image[0]} // Display the first image
                  name={item.name}
                  price={`RM${item.price}`}
                  size={Array.isArray(item.size) ? item.size.join(", ") : item.size || "N/A"} 
                  color={item.color}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <div className="button-container">
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
