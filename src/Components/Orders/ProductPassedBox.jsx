import React from "react";

function ProductPassedBox({ item }) {
  return (
    <tr className="productPassedBox">
      <td className="image">
        <img
          src={item.productId?.image}
          alt={item.productId?.title}
        />
      </td>
      <td className="title">{item.productId?.title?.length>40?item.productId?.title.slice(0,40)+"...":item.productId?.title}</td>
      <td className="price">{item.productId?.price.toFixed(2)} TND</td>
      <td className="qantity">{item.quantity}</td>
      <td className="totalPrice">{item.totalPrice} TND</td>
    </tr>
  );
}

export default ProductPassedBox;
