import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { GoCommentDiscussion } from "react-icons/go";
import { toast } from "react-toastify";
import { useState } from "react";
import appAxios from "../../utils/axiosConfig";

function AddComment({ itemId, setComments }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddComment = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.warning("You need to login to add a comment.");
      return;
    }

    if (!comment.trim()) {
      toast.warning("Please enter a comment.");
      return;
    }

    try {
      const response = await appAxios.post(
        `/api/comment/addcomment/${itemId}`,
        { comment, rating },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      toast.success("Comment added successfully!");
      setComments((prevComments) => [
        ...prevComments,
        response.data.data,
      ]);

      setComment("");
      setRating(0);
    } catch (error) {
      toast.error("Failed to add comment.");
      console.error("Failed to add comment: ", error);
    }
  };

  return (
    <form className="addComment" onSubmit={(e) => e.preventDefault()}>
      <div className="commentText">
        <span className="commentTitle">
          <GoCommentDiscussion />
          <h4 className="mb-0">Add your comment</h4>
        </span>
        <textarea
          name="comment"
          placeholder="Your comment here ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="commentRating">
        <h4>Rate this product</h4>
        <Rating
          name="size-large"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
        />
      </div>
      <Button onClick={handleAddComment} type="submit">
        Add
      </Button>
    </form>
  );
}

export default AddComment;
