import React from "react";
import { Button } from "@mui/material";
import { baseURL } from "../../utils/config";

function HelpBox({ item }) {
  return (
    <div className="helpBox">
      <img src={`${baseURL}/${item.image}`} alt={item.title} className="helpImage" />

      <h3 className="mb-0">{item.title}</h3>
      <p className="mb-0">{item.coins} coins</p>

      <Button className="donate">Donate Now</Button>
    </div>
  );
}

export default HelpBox;
