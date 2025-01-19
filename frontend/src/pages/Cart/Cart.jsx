import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import ItemsInCart from "./ItemsInCart";
import Header from "../../components/Header";
import { getCookie } from "../../utils/cookies"; // Import getCookie function
import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart(); // Use useCart to manage cartItems
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userEmail = getCookie("email"); // Get userEmail from cookies

  useEffect(() => {
    if (userEmail) {
      fetch(`https://unico-201.onrender.com/api/cart?userEmail=${userEmail}`)
        .then((response) => response.json())
        .then((data) => setCartItems(data)) // Use setCartItems to set cart items
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [userEmail, setCartItems]);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a token or cookies
    const token = localStorage.getItem("token");
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="));
    const password = document.cookie
      .split("; ")
      .find((row) => row.startsWith("password="));
    if (token || (email && password)) {
      setIsLoggedIn(true);
    }
  }, []);

  const removeFromCart = async (id, size, color) => {
    try {
      const response = await fetch("https://unico-201.onrender.com/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, size, color, userEmail }), // Include userEmail
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter(
            (item) =>
              !(item.id === id && item.size === size && item.color === color)
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
        {!isLoggedIn ? (
          <div className="empty-cart">
            <p>Please login to an account first!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/login")}
            >
              Login Here
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Add your items here!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/product")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="card-container">
              {cartItems.map((item, index) => (
                <ItemsInCart
                  key={`${item.id}-${index}`} // Ensure unique keys
                  id={item.id}
                  image={item.image} // Pass the image property
                  name={item.name}
                  price={`RM${item.price}`}
                  size={
                    Array.isArray(item.size)
                      ? item.size.join(", ")
                      : item.size || "N/A"
                  }
                  color={item.color} // Pass the color property
                  quantity={item.quantity}
                  onRemove={removeFromCart} // Pass the remove function
                />
              ))}
            </div>
            <div className="button-container">
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/product")}
              >
                Continue Shopping
              </button>
              <button
                className="proceed-payment-btn"
                onClick={() =>
                  navigate("/payment", { state: { items: cartItems } })
                }
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
