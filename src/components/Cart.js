import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import "./Cart.css"; // Import the CSS file

const Cart = () => {
  const { cart } = useContext(ProductContext);

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <ul className="cart-list">
          {cart.map((i) => (
            <li key={i.id} className="cart-item">
              <img src={i.image} alt={i.title} className="cart-image" />
              <div className="cart-details">
                <h3 className="cart-title">{i.title}</h3>
                <span className="cart-price">${i.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
