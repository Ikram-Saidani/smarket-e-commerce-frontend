import React, { useEffect, useState } from "react";
import HelpBox from "../Components/HelpAndHope/HelpBox";
import "../styles/helpAndHope.css";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function HelpAndHope() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    appAxios
      .get("/api/helpAndHope")
      .then((res) => {
        const fetchedProducts = res.data.data;
        setItems(fetchedProducts);

        if (!fetchedProducts || fetchedProducts.length === 0) {
          toast.warning("No products available to donate.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="helpProducts container-fluid">
      <h2>Help and Hope</h2>
      <p className="underTitle">Donate to help those in need</p>

      <div className="helpProductsList">
        {items.length > 0 ? (
          items.map((item, index) => <HelpBox item={item} key={index} />)
        ) : (
          <p>No products available to donate.</p>
        )}
      </div>
    </div>
  );
}

export default HelpAndHope;
