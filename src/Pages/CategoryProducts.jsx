import React, { useState, useEffect } from "react";
import BoxProduct from "../Components/Home/BoxProduct";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import FilterByPrice from "../Components/Home/FilterByPrice";
import FilterByRating from "../Components/Home/FilterByRating";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/product/category/${category}?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        setProducts(data.data);
        setTotalProducts(data.totalCount);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="d-flex">
      <div className="filter">
        <FilterByPrice />
        <FilterByRating />
      </div>

      <div className="allProducts container-fluid">
        <h2>{category}</h2>
        <p className="underTitle">Make your life easier and save more money</p>

        <div className="allProductsList">
          {products.length > 0 ? (
            products.map((item) => <BoxProduct item={item} key={item._id} />)
          ) : (
            <p>No products available in this category.</p>
          )}
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
    </div>
  );
}

export default CategoryProducts;
