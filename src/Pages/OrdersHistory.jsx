import React from "react";
import OrderHistoryBox from "../Components/Orders/OrderHistoryBox";
import "../styles/orderHistory.css";
const OrdersHistory = () => {
  return (
    <div className="container-fluid orderHistory">
      <h2>Orders History</h2>
      <p className="underTitle">Check your previous orders</p>

      <div className="orderList">
        {[0, 0, 0].map((order, index) => (
          <OrderHistoryBox key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersHistory;
