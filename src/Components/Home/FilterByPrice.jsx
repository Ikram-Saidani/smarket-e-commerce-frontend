import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FilterByPrice = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  return (
    <div className="filterByPrice">
      <h3>Price Range</h3>
      <div className="selectedPrice">
        <p>Selected range: ${priceRange[0]} - ${priceRange[1]}</p>
      </div>
      <div className="priceRange">
        <RangeSlider
          min={0}
          max={100}
          defaultValue={[0, 100]}
          value={priceRange}
          onInput={handlePriceChange} className="priceRange"
        />
      </div>
    </div>
  );
};

export default FilterByPrice;
