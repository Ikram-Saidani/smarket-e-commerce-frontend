import React, { useEffect, useState } from "react";
import OrderHistoryBox from "../Components/Orders/OrderHistoryBox";
import "../styles/orderHistory.css";
import appAxios from "../utils/axiosConfig";
const OrdersHistory = () => {
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    appAxios
      .get("/api/order/userorders", {
        headers: { authorization: token },
      })
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);
  return (
    <div className="container-fluid orderHistory">
      <h2>Orders History</h2>
      <p className="underTitle">Check your previous orders</p>

      {orders.length > 0 ? (
        <div className="orderList">
          {orders.map((order, index) => (
            <OrderHistoryBox key={index} order={order} />
          ))}
        </div>
      ) : (
        <div className="noOrders">
          <p className="text-center">No orders yet. Start shopping now.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
