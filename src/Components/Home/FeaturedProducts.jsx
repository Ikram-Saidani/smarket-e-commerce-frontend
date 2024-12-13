import React, { useEffect, useState } from "react";
import BoxProduct from "./BoxProduct";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    appAxios
      .get("/api/product/featured")
      .then((res) => {
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        if (!fetchedProducts || fetchedProducts.length === 0) {
          toast.warning("No featured products available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching featured products:", err);
      });
  }, []);
  return (
    <div className="featuredProducts container-fluid">
      <h2>Featured Products</h2>
      <p className="underTitle">
        Do not miss the current offers until the end of the week.
      </p>
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

export default FeaturedProducts;
