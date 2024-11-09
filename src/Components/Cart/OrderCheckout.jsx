import React from "react";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

function OrderChekout() {
  const [newAddress, setNewAddress] = useState(false);
  const [orderInfos, setOrderInfos] = useState({
    address: "address",
    paymentMethod: "on delivary",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  function handleInfosChange(e) {
    setOrderInfos({ ...orderInfos, address: e.target.value });
  }
  const handleChangePaymentMethod = (e) => {
    setOrderInfos({ ...orderInfos, paymentMethod: e.target.value });
    setPaymentMethod(e.target.value);
  };
  return (
    <form>
      <div className="checkout">
        <div className="address">
          <h4>Select your address</h4>
          <div className="addressBox">
            <div className="addresses">
              {[0, 0, 0].map((item, index) => (
                <div key={index} className="addressRadio">
                  <input
                    type="radio"
                    name="userAddress"
                    value={"address"}
                    onChange={handleInfosChange}
                    onClick={() => setNewAddress(false)}
                  />
                  <label htmlFor="">{item}</label>
                </div>
              ))}
            </div>
            <div className="addressRadio">
              <input
                type="radio"
                name="userAddress"
                value={"new address"}
                onChange={handleInfosChange}
                onClick={() => setNewAddress(true)}
              />
              <label htmlFor="">New address</label>
            </div>

            {newAddress && (
              <div className="newAddress">
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="newAddressInput"
                />
              </div>
            )}
          </div>
        </div>

        <div className="payment">
          <div>
            <FormControl className="paymentMethod">
              <InputLabel id="demo-simple-select-helper-label">
                Payment method
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={paymentMethod}
                label="Payment method"
                onChange={handleChangePaymentMethod}
              >
                <MenuItem value={"on delivary"}>
                  <em>on delivary</em>
                </MenuItem>
                <MenuItem value={"paypal"}>paypal</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="submitOrder d-flex justify-content-center mt-3">
      <Link to={"/cart/paymentPaypal"} ><Button>Submit</Button></Link>
      </div>
    </form>
  );
}

export default OrderChekout;
