import React from "react";

function ProductComments() {
  const comments = [
    { user: "a", comment: "nice" },
    { user: "b", comment: "good" },
  ];
  return (
    <div className="productComments">
        <h3>Comments</h3>
      {comments.map((comment) => {
        return (
          <div className="comment">
            <h4 className="mb-0">{comment.user} :</h4>
            <p className="mb-0">{comment.comment} </p>
          </div>
        );
      })}
    </div>
  );
}

export default ProductComments;
