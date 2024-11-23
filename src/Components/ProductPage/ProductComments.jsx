import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function ProductComments({ itemId }) {
  const [comments, setComments] = useState([]);
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
        console.log(fetchedComments)
        if (!fetchedComments) {
          toast.warning("No comment available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching comments for this product",err);
        toast.error("Failed to fetch comments. Please try again later.");
      });
  }, [itemId]);
  return (
    <div className="productComments">
      <h3>Comments</h3>
      {comments && comments.length > 0 ? (
      comments.map((comment, index) => {
        return (
          <div className="comment" key={index}>
            <img src={comment.user.avatar} alt="..." />
            <h4 className="mb-0">{comment.user.name} :</h4>
            <p className="mb-0">{comment.text} </p>
            <p>{comment.createdAt}</p>
          </div>
        );
      })):(<p>No comments available.</p>)
    }
    </div>
  );
}

export default ProductComments;
