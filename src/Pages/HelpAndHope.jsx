import React, { useState } from 'react';
import HelpBox from '../Components/HelpAndHope/HelpBox';
import { Button } from "@mui/material";
import "../styles/helpAndHope.css";

function HelpAndHope() {
  const items = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="helpProducts container-fluid">
      <h2>Help and Hope</h2>
      <p className="underTitle">Donate to help those in need</p>

      <div className="helpProductsList">
        {currentItems.map((item, index) => (
          <HelpBox item={item} key={index} />
        ))}
      </div>

      <div className="pagination">
        <Button
          className="previous-next"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : "inactive"}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          className="previous-next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default HelpAndHope;
