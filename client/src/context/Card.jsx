import React, { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    const existingItem = localStorage.getItem("cart")
    if(existingItem) setCart(JSON.parse(existingItem))
  },[])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

















