import React, { useContext, useEffect, useState } from "react";
import CartBox from "../Components/Cart/CartBox";
import { Button } from "@mui/material";
import "../styles/cart.css";
import OrderChekout from "../Components/Cart/OrderCheckout";
import { IoBagCheckOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SubTotal from "../Components/Cart/SubTotal";

const Cart = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const minus = (itemId) => {
    const newCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const plus = (itemId) => {
    const newCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    if (!user) {
      toast.warning("Please login to continue");
      navigate("/login");
    }
    setOpenCheckout(true);
  };

  return (
    <div className="cartPage container-fluid">
      <h2>Shopping Cart</h2>
      <p className="underTitle">Check your orders and proceed to checkout</p>
      <div className="cartList">
        <div className="cartHeader">
          <div className="cart">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <CartBox
                  cartItem={cartItem}
                  updateCart={updateCart}
                  minus={minus}
                  plus={plus}
                  key={cartItem._id}
                />
              ))
            ) : (
              <p className="noItems">Your cart is empty!</p>
            )}
          </div>
          <SubTotal cartItems={cartItems} />
        </div>
        {cartItems.length > 0 && (
          <Button onClick={handleCheckout}>
            <span className="mb-1">
              <IoBagCheckOutline />
            </span>
            checkout
          </Button>
        )}
        {openCheckout && (
          <div className="orderCheckout">
            <OrderChekout />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
