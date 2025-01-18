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

  const addToCart = async (item, email) => {
    const currentUserEmail = email || userEmail;

    // First persist cart items to the server
    try {
      const response = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, userEmail: currentUserEmail }),
      });
      const data = await response.json();
      console.log("Item added to cart:", data);

      // Then update local state
      setCartItems((prevItems) => {
        const safePrevItems = Array.isArray(prevItems) ? prevItems : [];
        const existingItem = safePrevItems.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color &&
            cartItem.userEmail === currentUserEmail
        );

        if (existingItem) {
          return safePrevItems.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color &&
            cartItem.userEmail === currentUserEmail
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }

        return [
          ...safePrevItems,
          { ...item, quantity: 1, userEmail: currentUserEmail },
        ];
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
