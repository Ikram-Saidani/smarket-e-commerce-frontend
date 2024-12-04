import React from "react";
import { TiTrash } from "react-icons/ti";
import QuantityBox from "./QuantityBox";
import { toast } from "react-toastify";

function CartBox({ cartItem, updateCart, minus, plus }) {
  const handleRemoveItem = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart?.filter((product) => product._id !== cartItem._id);
    if (cart.length !== newCart.length) {
      updateCart(newCart);
      toast.info("Product removed from cart");
    }
  };
  return (
    <div className="cartBox">
      <div className="boxLeft">
        <img src={cartItem.image} alt="..." />
      </div>
      <div className="boxRight">
        <h3 className="mb-0">
          {cartItem.title.length > 30
            ? cartItem.title.slice(0, 30) + "..."
            : cartItem.title}
        </h3>
        <p className="mb-0">
          {(Math.round(cartItem.price * 10) / 10).toFixed(1)} $
        </p>
        <div className="quantityBox">
          <QuantityBox cartItem={cartItem} 
        plus={plus}
        minus={minus}
         />
        </div>
        <span className="delete" onClick={handleRemoveItem}>
          <TiTrash />
        </span>
      </div>
    </div>
  );
}

export default CartBox;
