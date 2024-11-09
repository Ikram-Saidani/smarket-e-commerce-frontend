import React from "react";
import productImage from "../../assets/images/beauty.png";
import Rating from "@mui/material/Rating";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import ProductDetails from "./ProductDetails";

function BoxProduct() {
  return (
    <div className="productBox">
      <div className="boxTop">
          <img src={productImage} alt="..." />
        <ProductDetails/>
        <span className="heart">
          <FaHeart />
        </span>
      </div>
      <div className="boxBottom">
        <h3>product title</h3>
        <h4>in stock</h4>
        <div className="rating">
          <Rating name="read-only" value={4} readOnly />
        </div>
        <p>product price $</p>

       
          <span className="addToCart">
            <TiShoppingCart />
          </span>
       
      </div>
    </div>
  );
}

export default BoxProduct;
