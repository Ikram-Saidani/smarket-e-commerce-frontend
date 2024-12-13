import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import { BsArrowsFullscreen } from "react-icons/bs";
import ProductDescription from "../ProductPage/ProductDescription";
import ProductComments from "../ProductPage/ProductComments";
import AddComment from "../ProductPage/AddComment";
import "../../styles/productPage.css";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductDetails({ item }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const itemId = item._id;
  useEffect(() => {
    if (!itemId) {
      console.error("itemId is undefined or null.");
      toast.error("Invalid product ID.");
      return;
    }
    appAxios
      .get(`/api/comment/getcomments/${itemId}`)
      .then((res) => {
        const fetchedComments = res.data.data;
        setComments(fetchedComments);
        if (!fetchedComments) {
          toast.warning("No comment available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching comments for this product", err);
      });
  }, [itemId]);

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
            <ProductComments comments={comments} setComments={setComments} />
            <AddComment itemId={item._id} setComments={setComments} />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ProductDetails;
