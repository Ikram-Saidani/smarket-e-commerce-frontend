import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";

function OrderHistoryBox({ order }) {
  return (
    <div className="OrderHistoryBox">
      <h4 className="mb-0">{order._id}</h4>
      <div className="orderStatus">
      <p className="mb-0">{order.paymentTotal.toFixed(2)} TND</p>
      <p className="mb-0">{new Date(order.createdAt).toLocaleDateString()}</p>
      <h3 className="mb-0"
      style={{
        color: order.status === "done" ? "green" : order.status === "cancelled" ? "red" : "blue"
      }}
      >{order.status}</h3>
      </div>
      <Link to={`/ordersHistory/${order._id}/Details`}>
        <Button>
         <span> <FcViewDetails /></span>
          <span>Details</span>
        </Button>
      </Link>
    </div>
  );
}

export default OrderHistoryBox;
