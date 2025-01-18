import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import ItemsInCart from "./ItemsInCart";
import Header from "../../components/Header";
import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [items, setItems] = useState(cartItems || []);

  useEffect(() => {
    setItems(cartItems || []);
  }, [cartItems]);

  const removeFromCart = async (id, size, color) => {
    try {
      const response = await fetch("http://localhost:8080/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, size, color }),
      });

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          )
        );
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

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
              {items.map((item, index) => (
                <ItemsInCart
                  key={`${item.id}-${index}`} // Ensure unique keys
                  id={item.id}
                  image={item.image} // Pass the image property
                  name={item.name}
                  price={`RM${item.price}`}
                  size={Array.isArray(item.size) ? item.size.join(", ") : item.size || "N/A"}
                  color={item.color} // Pass the color property
                  quantity={item.quantity}
                  onRemove={removeFromCart} // Pass the remove function
                />
              ))}
            </div>
            <div className="button-container">
              <button
                className="continue-shopping-btn"
                onClick={() => navigate(-1)}
              >
                Continue Shopping
              </button>
              <button
                className="proceed-payment-btn"
                onClick={() => navigate("/payment", { state: { items } })}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;