import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";

const FilterByRating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="filterByRating">
      <h3>Rating Filter</h3>
      <div className="selectedRating">
        <Typography variant="body1" className="selectedRatingText">
          Selected rating:{" "}
          {selectedRating > 0 ? `${selectedRating} Stars & up` : "All ratings"}
        </Typography>
      </div>
      <div className="ratingFilter">
        <p
          onClick={() => handleRatingClick(0)}
          className={selectedRating === 0 ? "all" : "notAll"}
        >
          All
        </p>

        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={selectedRating === rating ? "selected" : "notSelected"}
          >
            {rating <= selectedRating ? <StarIcon className="star" /> : <StarBorderIcon />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;
