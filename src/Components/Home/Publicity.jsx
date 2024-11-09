import React from 'react'
import image_discount from "../../assets/images/sale_up_50.jpg";
import image_discount2 from "../../assets/images/grocery_sale.jpg";
import image_discount3 from "../../assets/images/sidebar-banner.gif"

function Publicity() {
  return (
    <div className="discount">
        <img src={image_discount} alt="50% discount" />
        <img src={image_discount3} alt="50% discount" />
        <img src={image_discount2} alt="50% discount" />
      </div>
  )
}

export default Publicity