import React, { useState, useEffect } from "react";
import BoxProduct from "../Components/Home/BoxProduct";
import { useParams } from "react-router-dom";
import FilterByPrice from "../Components/Home/FilterByPrice";
import FilterByRating from "../Components/Home/FilterByRating";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    appAxios
    .get(`/api/product/category/${category}`)
      .then((res) => {
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        
        if (!fetchedProducts || fetchedProducts.length === 0) {
          toast.warning("No products available in this category.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to fetch products. Please try again later.");
      });
    
  }, [category]);
  
  return (
    <div className="d-flex">
      <div className="filter">
        <FilterByPrice />
        <FilterByRating />
      </div>

      <div className="allProducts container-fluid">
        <h2>{category}</h2>
        <p className="underTitle">Make your life easier and save more money</p>

        <div className="allProductsList">
          {products.length > 0 ? (
            products.map((item) => <BoxProduct item={item} key={item._id} />)
          ) : (
            <p>No products available in this category.</p>
          )}
        </div>

       
      </div>
    </div>
  );
}

export default CategoryProducts;
