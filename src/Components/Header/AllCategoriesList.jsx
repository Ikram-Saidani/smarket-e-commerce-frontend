import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import fashion from "../../assets/images/fashion.png";
import electronics from "../../assets/images/electronics.png";
import bags from "../../assets/images/bags.png";
import footwear from "../../assets/images/footwear.png";
import groceries from "../../assets/images/groceries.png";
import beauty from "../../assets/images/beauty.png"
import jewellery from "../../assets/images/jewellery.png";

function AllCategoriesList() {
  const allCategories = [
    "fashion",
    "bags",
    "footwear",
    "jewellery",
    "beauty",
    "electronics",
    "groceries",
  ];
  const allCategoriesImages = [
    fashion,
    bags,
    footwear,
    jewellery,
    beauty,
    electronics,
    groceries,
  ];
  return (
    <div className="container-fluid allCategoriesList">
      {allCategories.map((item, index) => (
        <Link key={index} to={`/shop/${item}`} className="categoryLink container-fluid">
          <Button>
            <img src={allCategoriesImages[index]} alt={item} />
            {item}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default AllCategoriesList;
