import React, { useState, useEffect } from "react";
import "../styles/favorite.css";
import FavoriteBox from "../Components/Favorites/FavoriteBox";

const Wishlist = () => {
  
const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem("wishList")) || [];
  setFavorites(storedFavorites);
}, []);

const updateFavorites = (updatedList) => {
  setFavorites(updatedList);
  localStorage.setItem("wishList", JSON.stringify(updatedList));
};

  return (
    <div className="favorites container-fluid">
      <h2>Favorites</h2>
      <p className="underTitle">Check out your favorite products</p>

      <div className="FavoritesList">
      {favorites.length > 0 ? (
        favorites.map((item) => (
          <FavoriteBox
            key={item._id}
            item={item}
            updateFavorites={updateFavorites}
          />
        ))
      ) : (
          <p className="noFavorites">You have no favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

