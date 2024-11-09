import React from 'react'
import productImage from "../../assets/images/beauty.png";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

function FavoriteBox() {
  return (
    <div className="favoriteBox">
      <div className="boxleft">
        <Link to="/shop/:category/:id" className="boxLink">
          <img src={productImage} alt="..." />
        </Link>
        
      </div>
      <div className="boxRight">
        <h3 className="mb-0">product title</h3>
        <h4 className="mb-0">in stock</h4>
        <div className="rating">
          <Rating name="read-only" value={4} readOnly />
        </div>
        <p className="mb-0">product price $</p>

       
          <span className="addToCart">
            <TiShoppingCart />
          </span>
       
      </div>
    </div>
  )
}

export default FavoriteBox