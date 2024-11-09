import React from "react";
import productImage from "../../assets/images/beauty.png";
import { TiTrash } from "react-icons/ti";
import QuantityBox from "./QuantityBox";

function CartBox() {

  return (
    <div className="cartBox">
      <div className="boxLeft">
        <img src={productImage} alt="..." />
        <h3 className="mb-0">product title</h3>
        <p className="mb-0">product price $</p>
      </div>
      <div className="boxRight">
        <QuantityBox/>
        <span className="delete">
          <TiTrash />
        </span>
      </div>
    </div>
  );
}

export default CartBox;
