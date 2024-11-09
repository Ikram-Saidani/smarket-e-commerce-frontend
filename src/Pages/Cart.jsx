import React, { useState } from "react";
import CartBox from "../Components/Cart/CartBox";
import { Button } from "@mui/material";
import "../styles/cart.css";
import OrderChekout from "../Components/Cart/OrderCheckout";
import { IoBagCheckOutline } from "react-icons/io5";
const Cart = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  return (
    <div className="cartPage container-fluid">
      <h2>Shopping Cart</h2>
      <p className="underTitle">Check your orders and proceed to checkout</p>

      <div className="cartList">
        {[0, 0, 0, 0, 0].map((item, index) => (
          <CartBox item={item} key={index} />
        ))}
        <h3>Total $</h3>
        <Button onClick={() => setOpenCheckout(true)}>
          <span className="mb-1"><IoBagCheckOutline /></span> checkout
        </Button>
      {openCheckout && <div className="orderCheckout"><OrderChekout/></div>}
      </div>
    </div>
  );
};

export default Cart;
