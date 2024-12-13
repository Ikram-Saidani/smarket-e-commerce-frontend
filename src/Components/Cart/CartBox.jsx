import React from "react";
import { TiTrash } from "react-icons/ti";
import QuantityBox from "./QuantityBox";
import { toast } from "react-toastify";
import Size from "./Size";

function CartBox({ cartItem, updateCart, minus, plus, setCartItems,setTotalCoins }) {
  const handleRemoveItem = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart?.filter((product) => product._id !== cartItem._id);
    if (cart.length !== newCart.length) {
      updateCart(newCart);
      toast.info("Product removed from cart");
    }
    const totalCoins = newCart.reduce((acc, item) => {
      return acc + item.coins * item.quantity;
    }, 0);
    setTotalCoins(totalCoins);
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
          {(Math.round(cartItem.price * 10) / 10).toFixed(1)} TND
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
      {(cartItem.category==="fashion"||cartItem.category==="footwear")&&(
          <Size
          cartItem={cartItem}
          setCartItems={setCartItems}

          />
        )}
    </div>

  );
}

export default CartBox;
