import { Button, Rating } from "@mui/material";
import productImage from "../../assets/images/beauty.png";
function ProductDescription() {
  const inStock = true;
  return (
    <div className="productDescription">
      <div className="rightSide">
        <img src={productImage} alt="..." />
      </div>
      <div className="leftSide">
        <Rating
          name="read-only"
          size="large"
          value={2}
          readOnly
          className="ratingStar"
        />
        <h3>product title</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eveniet
          sequi voluptatum molestiae quibusdam dignissimos optio cum ipsam
          necessitatibus praesentium id facilis vitae error at veritatis,
          architecto a odio porro?
        </p>
        <h4>price $</h4>
        <h5 className={inStock ? "inStock" : "notAvailable"}>
          {inStock ? "in stock" : "not available"}
        </h5>
        {inStock ? (
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
