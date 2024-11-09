import React from "react";
import BoxProduct from "./BoxProduct";
import AllCategoriesList from "../Header/AllCategoriesList";

function PopularProducts() {
  return (
    <div className="popularProducts container-fluid">
      <h2>Popular Products</h2>
      <p className="underTitle">sign in for exclusive offers.</p>
      <div className="categoriesBar">
        <AllCategoriesList />
      </div>
      <div className="productsList">
        {[0, 0, 0, 0, 0, 0].map((item, index) => (
          <BoxProduct item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
