import React from "react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@mui/material";

function SearchBox() {
  return (
    <div className="headerSearch">
      <input type="text" placeholder="Search for products..." />
      <Button className="search">
        <IoIosSearch />
      </Button>
    </div>
  );
}

export default SearchBox;
