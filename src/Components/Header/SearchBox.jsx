import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?title=${query.trim()}`);
      setQuery("");
    } else {
      toast.warning("Please enter a search term.");
    }
  };

  return (
    <div className="headerSearch">
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="search" onClick={handleSearch}>
        <IoIosSearch />
      </Button>
    </div>
  );
}

export default SearchBox;
