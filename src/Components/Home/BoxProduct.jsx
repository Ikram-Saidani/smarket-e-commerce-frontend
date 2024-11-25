import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import ProductDetails from "./ProductDetails";
import { toast } from "react-toastify";

function BoxProduct({ item }) {
  const [isLiked, setIsLiked] = useState(() => {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    return wishList.some((product) => product._id === item._id);
  });
  const handleAddToWishList = () => {
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    let itemExist = wishList.find((product) => product._id === item._id);

    if (itemExist) {
      wishList = wishList.filter((product) => product._id !== item._id);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      setIsLiked(false);
      toast.info("Product removed from wishList");
    } else {
      wishList.push(item);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      setIsLiked(true);
      toast.success("Product added to wishList");
    }
  };
  const handleAddToCart = () => {
    if (!item.inStock) {
      toast.warning(
        "This product is not available at the moment. Please try again later!"
      );
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemExist = cart.find((product) => product._id === item._id);
    if (itemExist) {
      toast.warning("This product is already in your cart.");
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart");
    }
  };
  return (
    <div className="productBox">
      <div className="boxTop">
        <img src={item.image} alt="..." />
        <ProductDetails item={item} />
        <span className="heart" style={{ color: isLiked ? "red" : "black" }} onClick={handleAddToWishList}>
          
          <FaHeart />
        </span>
        {item.discount > 0 && (
          <span className="discountNumber">{item.discount} %</span>
        )}
      </div>
      <div className="boxBottom">
        <h3>
          {item?.title?.length > 30
            ? `${item.title.slice(0, 30)}...`
            : item.title}
        </h3>

        <h4 style={{ color: item.inStock ? "green" : "red" }}>
          {item.inStock ? "in stock" : "not available"}
        </h4>
        <div className="rating">
          <Rating name="read-only" value={item.rate.rating} readOnly />
        </div>
        <div className="row">
          {item.discount > 0 && <p className="oldPrice">{item.oldPrice}$</p>}
          <p className="currentPrice">{item.price}$</p>
        </div>
        <p className="coins">{item.coins} coins</p>
        <span className="addToCart" onClick={handleAddToCart}>
          <TiShoppingCart />
        </span>
      </div>
    </div>
  );
}

export default BoxProduct;
