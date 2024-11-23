import React from "react";
import Rating from "@mui/material/Rating";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import ProductDetails from "./ProductDetails";
import { toast } from "react-toastify";

function BoxProduct({ item }) {
  const handleAddToWishList = () => {
    let like = document.querySelector(".heart");
    if (like.style.color !== "red") {
      like.style.color = "red";
      let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
      wishList.push(item);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      toast.success("Product added to wishList");
    } else {
      like.style.color = "black";
      let wishList = JSON.parse(localStorage.getItem("wishList"));
      let newWishList = wishList.filter((product) => product.id !== item.id);
      localStorage.setItem("wishList", JSON.stringify(newWishList));
      toast.success("Product removed from wishList");
    }
  };
  const handleAddToCart = () => {
    if (!item.inStock) {
      toast.warning(
        "This product is not available at the moment. Please try again later!"
      );
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemExist = cart.find((product) => product.id === item.id);
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
        <ProductDetails itemId={item._id} />
        <span className="heart" onClick={() => handleAddToWishList}>
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
          <Rating name="read-only" value={4} readOnly />
        </div>
        <div className="row">
          {item.discount > 0 && <p className="oldPrice">{item.oldPrice}$</p>}
          <p className="currentPrice">{item.price}$</p>
        </div>
        <p className="coins">{item.coins} coins</p>
        <span className="addToCart" onClick={() => handleAddToCart}>
          <TiShoppingCart />
        </span>
      </div>
    </div>
  );
}

export default BoxProduct;
