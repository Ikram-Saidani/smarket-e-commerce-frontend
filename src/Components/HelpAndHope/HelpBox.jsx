import React from "react";
import productImage from "../../assets/images/beauty.png";
import { Button } from "@mui/material";

function HelpBox() {
  return (
    <div className="helpBox">
      <img src={productImage} alt="..." />

      <h3 className="mb-0">product title</h3>
      <h4 className="mb-0">in stock</h4>
      <p className="mb-0">100 Coin</p>

      <Button className="donate">Donate Now</Button>
    </div>
  );
}

export default HelpBox;
