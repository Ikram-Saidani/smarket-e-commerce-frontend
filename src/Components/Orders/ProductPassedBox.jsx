import React from 'react'
import productImage from "../../assets/images/beauty.png";

function ProductPassedBox() {
  return (
    <div className="productPassedBox" >
    <img src={productImage} alt="..." />
    <h3 className="mb-0">product title</h3>
    <p className="mb-0">product price $</p>
    <h3 className="mb-0">quantity</h3>
    <p className="mb-0">total product price $</p>
  </div>
  )
}

export default ProductPassedBox