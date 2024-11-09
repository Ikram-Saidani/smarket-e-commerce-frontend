import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";

function OrderHistoryBox() {
  return (
    <div className="OrderHistoryBox">
      <h4 className="mb-0">order_id</h4>
      <p className="mb-0">total price $</p>
      <p className="mb-0">Command Date</p>
      <h3 className="mb-0">Status</h3>
      <Link to={"/ordersHistory/:id/Details"}>
        <Button>
         <span> <FcViewDetails /></span>
          <span>Details</span>
        </Button>
      </Link>
    </div>
  );
}

export default OrderHistoryBox;
