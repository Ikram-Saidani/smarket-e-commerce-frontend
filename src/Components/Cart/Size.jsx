import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Size({ cartItem }) {
  const [valueForm, setValueForm] = useState("Size");
  const handleAddSize = (e) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart.map((item) => {
      if (item._id === cartItem._id) {
        return { ...item, selectedSize: e.target.value };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    let target = e.target.value;
    cartItem.category === "fashion"
      ? setValueForm(target.size)
      : setValueForm(target.shoeSize);
  };
  return (
    <FormControl className="size">
      <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper size"
        name="size"
        value={valueForm}
        label="Size"
        onChange={(e) => handleAddSize(e)}
      >
        {cartItem.category === "fashion"
          ? cartItem.size?.map((item, i) => {
              return (
                <MenuItem key={i} className="sizeItem" value={item}>
                  {item.size}
                </MenuItem>
              );
            })
          : cartItem.shoeSize?.map((item, i) => {
              return (
                <MenuItem key={i} className="menuCategory" value={item}>
                  {item.shoeSize}
                </MenuItem>
              );
            })}
      </Select>
    </FormControl>
  );
}

export default Size;
