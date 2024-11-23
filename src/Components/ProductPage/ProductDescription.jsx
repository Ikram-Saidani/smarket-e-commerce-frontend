import { Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
function ProductDescription({ itemId }) {
  function renderExtraInformation(product) {
    switch (product.category) {
      case "fashion":
        return (
          <span><strong>Size :</strong> &nbsp;
            {product.size?.map((s, index) => (
              <span key={index}>
                 {s.size} , &nbsp;
              </span>
            ))}
          </span>
        );
      case "footwear":
        return (
          <span><strong>Size :</strong> &nbsp;
            {product.shoeSize?.map((s, index) => (
              <span key={index}>
                 {s.shoeSize} , &nbsp;
              </span>
            ))}
          </span>
        );
      case "beauty":
        return <span>Ingredients: {product.ingredients?.join(", ")}</span>;
      case "electronics":
        return (
          <span>
            Specifications:
            {Object.entries(product.specifications).map(
              ([key, value], index) => (
                <li key={index}>
                  <strong>{key}:</strong> {value}
                </li>
              )
            )}
          </span>
        );
      case "groceries":
        return product && product.expiryDate && (
          <span>
  Expiry Date : {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : "Not available"}
</span>
        )
        
      default:
        return <span>No extra information available.</span>;
    }
  }

  const [product, setProduct] = useState({});
  useEffect(() => {
    if (!itemId) {
      console.error("itemId is undefined or null.");
      toast.error("Invalid product ID.");
      return;
    }
    appAxios
      .get(`/api/product/${itemId}`)
      .then((res) => {
        const fetchedProduct = res.data.data;
        setProduct(fetchedProduct);
        if (!fetchedProduct) {
          toast.warning("No product available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("Failed to fetch product. Please try again later.");
      });
  }, [itemId]);

  return (
    <div className="productDescription">
      <div className="rightSide">
        <img src={product.image} alt="..." />
        <Rating
          name="read-only"
          size="large"
          value={
            product?.rate?.rating && product.rate.rating <= 5
              ? product.rate.rating
              : 0
          }
          readOnly
          className="ratingStar"
        />
        {product.discount > 0 && (
          <span className="discountNumber">{product.discount} %</span>
        )}
        <span className="coins">{product.coins} coins</span>
        <div className="row">
          {product.discount > 0 && (
            <h4 className="oldPrice">{product.oldPrice}$</h4>
          )}
        <h4 className="currentPrice">{product.price}$</h4>
        </div>
        <h5 className={product.inStock ? "inStock" : "notAvailable"}>
          {product.inStock ? "In stock" : "Not available"}
        </h5>
      </div>
      <div className="leftSide">
        <h3>{product.title}</h3>
        <p>Description : {product.description}</p>
        <div className="extraInformation">
          {renderExtraInformation(product)}
        </div>

        {product.inStock ? (
          <Button className="inStockButton">Shop Now</Button>
        ) : (
          <Button className="notAvailableButton" disabled>
            Shop Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductDescription;
