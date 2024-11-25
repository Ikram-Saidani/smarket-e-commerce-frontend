import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import { BsArrowsFullscreen } from "react-icons/bs";
import ProductDescription from "../ProductPage/ProductDescription";
import ProductComments from "../ProductPage/ProductComments";
import AddComment from "../ProductPage/AddComment";
import "../../styles/productPage.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductDetails({item}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <span className="fullScreen" onClick={() => setIsOpenModal(true)}>
        <BsArrowsFullscreen />
      </span>

      <Dialog
     
        maxWidth="lg"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        TransitionComponent={Transition}
        className="detailsModal"
      >
        <Button className="close" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>

        <div className="productPage container-fluid">
          <h2>Product Details</h2>
          <p className="underTitle">Look at the details of this product</p>

          <div className="productInfo">
            <ProductDescription item={item} />
            <ProductComments itemId={item._id}/>
            <AddComment />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ProductDetails;
