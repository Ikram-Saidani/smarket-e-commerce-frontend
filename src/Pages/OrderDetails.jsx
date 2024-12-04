import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import ProductPassedBox from "../Components/Orders/ProductPassedBox";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function OrderDetails() {
  const token = localStorage.getItem("authToken");
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    appAxios
      .get(`/api/order/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setOrder(res.data.data);
        setProducts(res.data.data.orderedProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, id]);
  const handleDeleteOrder = () => {
    if(order.status !== "pending"){
      return toast.error("This order is terminated and can't be cancelled");
    }
    const confirmDeletion = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmDeletion) {
      appAxios
        .delete(`/api/order/delete/${id}`, {
          headers: { authorization: token },
        })
        .then((res) => {
          toast.success("Order cancelled successfully");
          navigate("/ordersHistory");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="container-fluid orderDetails">
      <h2>Order Details</h2>
      <p className="underTitle">Take a look at your order</p>
      <div className="orderDetailsBox">
        <div className="orderInfo">
          <h4 className="mb-0">{order._id}</h4>
          <p className="mb-0">{order.paymentTotal} $</p>
          <p className="mb-0">Discount {order.discountApplied} %</p>
          <p className="mb-0">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <h4
            className="mb-0"
            style={{
              color:
                order.status === "done"
                  ? "green"
                  : order.status === "Cancelled"
                  ? "red"
                  : "blue",
            }}
          >
            {order.status}
          </h4>
          <p className="mb-0">{order.paymentMode}</p>
          <div className="removeOrBack">
            <Link to={"/ordersHistory"}>
              <Button>
                <RiArrowGoBackFill />
                Back
              </Button>
            </Link>
            <Button onClick={handleDeleteOrder}>Cancel</Button>
          </div>
        </div>
        <table className="productsTable">
          <thead className="tableHead">
            <tr>
              <th className="image">Image</th>
              <th className="title">Title</th>
              <th className="price">Price</th>
              <th className="quantity">Quantity</th>
              <th className="totalPrice">Total price</th>
            </tr>
          </thead>
          <tbody className="productsPassedList">
            {products.map((item, index) => (
              <ProductPassedBox key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
