import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

function FavoriteBox({ item, updateFavorites }) {
  const handleRemoveItemFromWishList = () => {
    let favorites = JSON.parse(localStorage.getItem("wishList")) || [];
    let updatedFavorites = favorites.filter((product) => product._id !== item._id);
    updateFavorites(updatedFavorites);
    toast.success("Product removed from favorites");
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
    <div className="favoriteBox">
      <div className="boxleft">
          <img src={item.image} alt="..." />
    
      </div>
      <div className="boxRight">
        <h3 className="mb-0">{item.title.length>40?item.title.slice(0,40)+"...":item.title}</h3>
        <h4 style={{color:item.inStock? "green":"red"}} className="mb-0">{item.inStock ? "In stock" : "Not available"}</h4>

        <p className="mb-0">{(Math.round(item.price * 10) / 10).toFixed(1)} $</p>

        <span className="addToCart" onClick={handleAddToCart}>
          <TiShoppingCart />
        </span>
        <span className="removeWish" onClick={handleRemoveItemFromWishList}>
          <IoClose />
        </span>
      </div>
    </div>
  );
}

export default FavoriteBox;