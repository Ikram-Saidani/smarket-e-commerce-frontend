import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Size({ cartItem, setCartItems }) {
  const [valueForm, setValueForm] = useState("");
  let sizeOptions =[]
  if(cartItem.category === "fashion"){
    cartItem.size.forEach((size) => {
      sizeOptions.push(size.size);
    }
    )
  } else if(cartItem.category === "footwear"){
    cartItem.shoeSize.forEach((size) => {
      sizeOptions.push(size.shoeSize);
    }
    )
  }
 
  const handleAddSize = (e) => {
    const selectedSize = e.target.value;

    // Update the cart in localStorage
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((item) => {
      if (item._id === cartItem._id) {
        return { ...item, selectedSize };
      }
      return item;
    });

    // Update state and localStorage
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Update local state for the selected size
    setValueForm(selectedSize);
  };

  return (
    <FormControl className="size">
      <InputLabel id="size-select-label">Size</InputLabel>
      <Select
        labelId="size-select-label"
        id="size-select"
        name="size"
        value={valueForm}
        label="Size"
        onChange={handleAddSize}
      >
        {sizeOptions?.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Size;

