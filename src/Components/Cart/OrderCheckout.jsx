import React, { useContext, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

function OrderCheckout({abilityToOrderWithCoins , totalCoins, pointsEarned }) {
  const token = localStorage.getItem("authToken");
  const { user,setUser } = useContext(UserContext);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [newAddress, setNewAddress] = useState(false);
  const [paymentMode, setPaymentMode] = useState("onDelivery");
  const [orderInfos, setOrderInfos] = useState({
    address: "",
    orderAddress: "",
    paymentMode: "onDelivery",
  });
  const [openPayment, setOpenPayment] = useState(false);
  const navigate = useNavigate();

  const handleInfosChange = (e) => {
    const { value } = e.target;
    setOrderInfos((prev) => ({ ...prev, address: value }));
    setNewAddress(value === "new address");
  };

  const handlePaymentModeChange = (e) => {
    const { value } = e.target;
    setOrderInfos((prev) => ({ ...prev, paymentMode: value }));
    setPaymentMode(value);
  };

  const handleOrderAddressChange = (e) => {
    const { value } = e.target;
    setOrderInfos((prev) => ({ ...prev, orderAddress: value }));
  };

  const postOrder = async () => {
   
    const finalAddress =
      orderInfos.address === "new address"
        ? orderInfos.orderAddress
        : orderInfos.address;

    if (orderInfos.address === "new address") {
      try {
        await appAxios.put(
          `/api/user/update/${user._id}`,
          { address: [...user.address, orderInfos.orderAddress] },
          { headers: { authorization: token } }
        );
        toast.success("Address updated successfully!");
      } catch (error) {
        console.error("Error updating address:", error);
      }
    }

    const orderedProducts = cart.map((item) => ({
      productId: item._id,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));
    if(!finalAddress) {
      toast.warning("Please select an address!");
    }
    const confirmPostOrder = window.confirm("Are you sure you want to place this order?");
if (confirmPostOrder) {
  try {
    await appAxios.post(
      "/api/order/postorder",
      {
        orderedProducts,
        address: finalAddress,
        paymentMode: orderInfos.paymentMode,
      },
      { headers: { authorization: token } }
    );
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Your order was placed successfully!");
    navigate("/ordersHistory");
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

  };

  const handleSubmitOrder = async(e) => {
    e.preventDefault();
    if (paymentMode === "onDelivery") {
      postOrder();
    } else if(paymentMode === "withCoins"){
      try {
        await appAxios.put(
          `/api/user/coinsearned/${user._id}`,
          { coinsEarned: (user.coinsEarned - totalCoins) },
          {
            headers: { Authorization: token },
          }
        );
        if (totalCoins > 0) {
          toast.success(`You used ${totalCoins} coins!`);
          const updatedUser = {
            ...user,
            coinsEarned: user?.coinsEarned - totalCoins,
          };
          setUser(updatedUser);
        }
      } catch (error) {
        console.error(
          "Failed to update user's coinsEarned:",
          error.response || error
        );
        toast.error("Failed to use your coins earned.");
      }
      postOrder();
    }else {
      setOpenPayment(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="checkout">
          <div className="address">
            <h2>Select your address</h2>
            <div className="addressBox">
              <div className="addresses">
                {user?.address.map((item, index) => (
                  <div key={index} className="addressRadio">
                    <input
                      type="radio"
                      name="userAddress"
                      value={item}
                      onChange={handleInfosChange}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
              <div className="addressRadio">
                <input
                  type="radio"
                  name="userAddress"
                  value="new address"
                  onChange={handleInfosChange}
                />
                <label>New address</label>
              </div>

              {newAddress && (
                <div className="newAddress">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="newAddressInput"
                    onChange={handleOrderAddressChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="payment">
            <FormControl className="paymentMethod">
              <InputLabel id="payment-method-label">Payment method</InputLabel>
              <Select
                labelId="payment-method-label"
                value={paymentMode}
                onChange={handlePaymentModeChange}
              >
                <MenuItem value="onDelivery">On delivery</MenuItem>
                <MenuItem value="withCard">With card</MenuItem>
                {abilityToOrderWithCoins && <MenuItem value="withCoins">With coins</MenuItem>}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="submitOrder d-flex justify-content-center mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {(openPayment&&paymentMode==="withCard") && <Payment cartItems={cart} postOrder={postOrder} />}
    </>
  );
}

export default OrderCheckout;
