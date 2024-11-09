import React from 'react';
import "../styles/favorite.css";
import FavoriteBox from '../Components/Favorites/FavoriteBox';
const Wishlist = () => {
  
  return (
    <div className="favorites container-fluid">
    <h2>Favorites</h2>
    <p className="underTitle">Check out your favorite products</p>

    <div className="FavoritesList">
      {[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ].map((item, index) => (
        <FavoriteBox item={item} key={index} />
      ))}
    </div>
  </div>
  );
};

export default Wishlist;
