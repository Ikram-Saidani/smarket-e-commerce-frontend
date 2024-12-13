import React, { useEffect, useState } from "react";
import BoxProduct from "./BoxProduct";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    appAxios
      .get("/api/product/popular")
      .then((res) => {
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        if (!fetchedProducts || fetchedProducts.length === 0) {
          toast.warning("No popular products available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching popular products:", err);
      });
  }, []);
  return (
    <div className="popularProducts container-fluid">
      <h2>Popular Products</h2>
      <p className="underTitle">sign in for exclusive offers.</p>
      <div className="productsList">
        {(!products || products.length === 0) && (
          <p>No products to display at the moment.</p>
        )}
        {products.map((item, index) => (
          <BoxProduct item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
