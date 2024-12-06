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
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1 / 0]);
  const [newPriceRange, setNewPriceRange] = useState([
    priceRange[0],
    priceRange[1],
  ]);
  
  useEffect(() => {
    appAxios
      .get(`/api/product/category?category=${category}&minPrice=${newPriceRange[0]}&maxPrice=${newPriceRange[1]}&minRating=${ratingFilter}`)
      .then((response) => {
        const data = response.data.data.data;
        const minimunPrice = response.data.data.minimunPrice;
        const maximunPrice = response.data.data.maximunPrice;
        setPriceRange((prevRange) => {
          const newRange = [minimunPrice, maximunPrice];
          return prevRange[0] !== newRange[0] || prevRange[1] !== newRange[1]
            ? newRange
            : prevRange;
        });
        setProducts(data);
        if (response.data.data.totalCount === 0) {
          toast.warning("No products available in this category.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        window.scrollTo(0, 0);
        toast.warning("No product exist with this filter search.");
      });
  }, [category, ratingFilter, newPriceRange]);

  return (
    <div className="shopPage">
      <div className="filter">
      <FilterByPrice
          priceRange={priceRange}
          setNewPriceRange={setNewPriceRange}
          newPriceRange={newPriceRange}
        />
        <FilterByRating
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
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
