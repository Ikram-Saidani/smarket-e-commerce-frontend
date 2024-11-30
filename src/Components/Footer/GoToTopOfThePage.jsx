import { Button } from "@mui/material";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
function GoToTopOfThePage() {
  const handleScrollWindow = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button className="goToTop" onClick={handleScrollWindow}>
      <IoIosArrowUp />
    </Button>
  );
}

export default GoToTopOfThePage;
