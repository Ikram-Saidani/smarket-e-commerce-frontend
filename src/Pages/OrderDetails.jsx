import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import ProductPassedBox from "../Components/Orders/ProductPassedBox";

function OrderDetails() {
  return (
    <div className="container-fluid orderDetails">
      <h2>Order Details</h2>
      <p className="underTitle">Take a look at your order</p>
      <div className="orderDetailsBox">
        <div className="orderInfo">
          <h4 className="mb-0">order_id</h4>
          <p className="mb-0">total price $</p>
          <p className="mb-0">Command Date</p>
          <h4 className="mb-0">Status</h4>
          <Link to={"/ordersHistory"}>
            <Button>
              <RiArrowGoBackFill />
              Back
            </Button>
          </Link>
        </div>
        <div className="tableHead">
          <h3 className="mb-0">Image</h3>
          <h3 className="mb-0">Title</h3>
          <h3 className="mb-0">Price</h3>
          <h3 className="mb-0">Quantity</h3>
          <h3 className="mb-0">Total price</h3>
        </div>
        <div className="productsPassedList">
          {[0, 0, 0].map((item, index) => (
            <ProductPassedBox key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
