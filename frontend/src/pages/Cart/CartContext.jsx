import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/cart")
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error("Error fetching cart items:", error));
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const safePrevItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = safePrevItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );
      let updatedCartItems;
      if (existingItem) {
        updatedCartItems = safePrevItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [...safePrevItems, { ...item, quantity: 1 }];
      }

      // Persist cart items to the server
      fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
      .then(response => response.json())
      .then(data => console.log("Item added to cart:", data))
      .catch(error => console.error("Error adding item to cart:", error));

      return updatedCartItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};