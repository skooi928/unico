import React, { useState } from 'react';
import Product from './Product';
import Cart from './Cart';

const AddCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  return (
    <div>
      <Product addToCart={addToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default AddCart;