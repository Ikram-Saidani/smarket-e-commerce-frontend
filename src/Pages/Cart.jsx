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
import appAxios from "../utils/axiosConfig";

const Cart = () => {
  const token = localStorage.getItem("authToken");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [totalCoins, setTotalCoins] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [discountMessage, setDiscountMessage] = useState("");
  const [abilityToOrderWithCoins, setAbilityToOrderWithCoins] = useState(false);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    let totalCoins = 0;
    storedCart.forEach((item) => {
      totalCoins += item.coins;
    });
    setTotalCoins(totalCoins);
    if (user?.coinsEarned < totalCoins) {
      setAbilityToOrderWithCoins(false);
    } else {
      setAbilityToOrderWithCoins(true);
    }
  }, [setCartItems, user]);

  useEffect(() => {
    appAxios
      .get("/api/order/userorders", {
        headers: { authorization: token },
      })
      .then((res) => {
        setHasOrders(res.data.data.length > 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  useEffect(() => {
    const messages = [];

    if (user?.discountEarnedWithGroup > 0) {
      messages.push(
        `You have a discount of ${user.discountEarnedWithGroup}% earned with your group.`
      );
    }

    if (["coordinator", "ambassador", "admin"].includes(user?.role)) {
      messages.push(`As ${user.role}, you are entitled to a 20% discount.`);
    }

    if (user?.dateOfBirth) {
      const userBirthday = new Date(user.dateOfBirth);
      const today = new Date();
      if (userBirthday.getMonth() === today.getMonth()) {
        messages.push("Happy Birthday! Enjoy a 5% discount for this month.");
      }
    }

    if (!hasOrders) {
      messages.push("Welcome! You receive a 20% discount on your first order.");
    }

    setDiscountMessage(messages.join(" "));
  }, [user, hasOrders]);

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
        {discountMessage.length > 0 && (
          <h2 className="discountMessage">{discountMessage}</h2>
        )}
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
          <SubTotal
            totalCoins={totalCoins}
            hasOrders={hasOrders}
            cartItems={cartItems}
          />
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
            <OrderChekout
              totalCoins={totalCoins}
              abilityToOrderWithCoins={abilityToOrderWithCoins}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
