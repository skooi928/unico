import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "../../utils/cookies"; // Import getCookie function

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState(getCookie("email")); // Get userEmail from cookies

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:8080/api/cart?userEmail=${userEmail}`)
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [userEmail]);

  const addToCart = (item, email) => {
    const currentUserEmail = email || userEmail; // Use provided email or fallback to userEmail
    setCartItems((prevItems) => {
      const safePrevItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = safePrevItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color &&
          cartItem.userEmail === currentUserEmail // Check userEmail
      );
      let updatedCartItems;
      if (existingItem) {
        updatedCartItems = safePrevItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color &&
          cartItem.userEmail === currentUserEmail // Check userEmail
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...safePrevItems,
          { ...item, quantity: 1, userEmail: currentUserEmail },
        ];
      }

      // Persist cart items to the server
      fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, userEmail: currentUserEmail }), // Include userEmail
      })
        .then((response) => response.json())
        .then((data) => console.log("Item added to cart:", data))
        .catch((error) => console.error("Error adding item to cart:", error));

      return updatedCartItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
