import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [query, setQuery] = useState(""); // Store input value
  const navigate = useNavigate(); // To handle navigation

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form behavior
    if (query.trim()) {
      navigate(`/search?title=${(query.trim())}`); // Navigate to SearchResults with query
      setQuery(""); // Clear input field
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <div className="headerSearch">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
      />
      <Button className="search" onClick={handleSearch}>
        <IoIosSearch />
      </Button>
    </div>
  );
}

export default SearchBox;
