import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function QuantityBox({ cartItem,plus,minus }) {
  const handleIncr = () => {
    if(cartItem.quantity<cartItem.countInStock){
      plus(cartItem._id);
    }else{
      toast.info("Enough stock available");
    }
  };
  const handleDecr = () => {
    if(cartItem.quantity>1){
      minus(cartItem._id);
    }
  };
  return (
    <>
      <span
        className="inputQuantity"
      >{cartItem.quantity}</span>
      <div className="plusMinus">
        <span onClick={handleIncr}>
          <FaPlus />
        </span>
        <span onClick={handleDecr}>
          <FaMinus />
        </span>
      </div>
    </>
  );
}

export default QuantityBox;
