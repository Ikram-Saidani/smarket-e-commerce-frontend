import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { GoCommentDiscussion } from "react-icons/go";

function AddComment() {
  return (
    <form className="addComment">
      <div className="commentText">
        <span className="commentTitle"><GoCommentDiscussion />
        <h4 className="mb-0">Add your comment</h4></span>
        <textarea placeholder="Your comment here ..."></textarea>
      </div>
      <div className="commentRating">
        <h4>rate this product</h4>
        <Rating name="size-large" defaultValue={0} size="large" />
      </div>
      <Button>add</Button>
    </form>
  );
}

export default AddComment;
