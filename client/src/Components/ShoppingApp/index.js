





import React, { useState } from 'react';
import BarcodeScanner from "../../Components/BarcodeScanner"; // Ensure this path is correct

const ShoppingApp = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.name === product.name);

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity; // Increment quantity
        return updatedCart;
      } else {
        return [...prevCart, product]; // Add new product
      }
    });
  };

  return (
    <div>
      <BarcodeScanner addToCart={addToCart} cart={cart} setCart={setCart} />
    </div>
  );
};

export default ShoppingApp;

