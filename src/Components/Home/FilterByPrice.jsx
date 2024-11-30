import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterByPrice = ({ priceRange, setNewPriceRange, newPriceRange }) => {
  const handlePriceChange = (newRange) => {
    setNewPriceRange(newRange);
  };

  return (
    <div className="filterByPrice">
      <h3>Price Range</h3>
      <div className="selectedPrice">
        <p>
          Selected range: ${newPriceRange[0]} - ${newPriceRange[1]}
        </p>
      </div>
      <div className="priceRange">
        <RangeSlider
          min={priceRange[0]}
          max={priceRange[1]}
          defaultValue={[priceRange[0], priceRange[1]]}
          value={newPriceRange}
          onInput={handlePriceChange}
          className="priceRange"
        />
      </div>
    </div>
  );
};

export default FilterByPrice;
