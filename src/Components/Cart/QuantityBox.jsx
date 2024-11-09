import React from "react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function QuantityBox({ item }) {
  const [quantityValue, setQuantityValue] = useState(1);
  const minus = () => {
    if (quantityValue > 1) {
      setQuantityValue(quantityValue - 1);
    }
  };
  const plus = () => {
    if (item.inStock > quantityValue) {
      setQuantityValue(quantityValue + 1);
    }
  };
  return (
    <>
      <span onClick={minus}>
        <FaMinus />
      </span>
      <input type="text" value={quantityValue} />
      <span onClick={plus}>
        <FaPlus />
      </span>
    </>
  );
}

export default QuantityBox;
