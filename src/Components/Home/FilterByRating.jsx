import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";

const FilterByRating = ({ratingFilter,setRatingFilter}) => {

  const handleRatingClick = (rating) => {
    setRatingFilter(rating);
  };

  return (
    <div className="filterByRating">
      <h3>Rating Filter</h3>
      <div className="selectedRating">
        <Typography variant="body1" className="selectedRatingText">
          Selected rating:{" "}
          {ratingFilter > 0 ? `${ratingFilter} Stars & up` : "All ratings"}
        </Typography>
      </div>
      <div className="ratingFilter">
        <p
          onClick={() => handleRatingClick(0)}
          className={ratingFilter === 0 ? "all" : "notAll"}
        >
          All
        </p>

        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={ratingFilter === rating ? "selected" : "notSelected"}
          >
            {rating <= ratingFilter ? <StarIcon className="star" /> : <StarBorderIcon />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;
