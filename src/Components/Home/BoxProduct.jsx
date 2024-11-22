import React from "react";
import Rating from "@mui/material/Rating";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import ProductDetails from "./ProductDetails";

function BoxProduct({ item }) {
  return (
    <div className="productBox">
      <div className="boxTop">
          <img src={item.image} alt="..." />
        <ProductDetails/>
        <span className="heart">
          <FaHeart />
        </span>
      </div>
      <div className="boxBottom">
        <h3>{item.title}</h3>
        <h4 >{item.inStock? "in stock":"not available"}</h4>
        <div className="rating">
          <Rating name="read-only" value={4} readOnly />
        </div>
        <p>{item.oldPrice}</p>

       
          <span className="addToCart">
            <TiShoppingCart />
          </span>
       
      </div>
    </div>
  );
}

export default BoxProduct;
