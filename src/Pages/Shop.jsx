import React, { useState, useEffect } from "react";
import BoxProduct from "../Components/Home/BoxProduct";
import { Button } from "@mui/material";
import FilterByPrice from "../Components/Home/FilterByPrice";
import FilterByRating from "../Components/Home/FilterByRating";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await appAxios.get(
          `/api/product/pagination?page=${currentPage}&limit=${itemsPerPage}`
        );

        const { data, totalCount } = response.data;
        setProducts(data);
        setTotalProducts(totalCount);

        if (totalCount === 0) {
          toast.warning("No products available at this moment.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [currentPage]);

  const currentProducts = products;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="d-flex">
      <div className="filter">
        <FilterByPrice />
        <FilterByRating />
      </div>
      <div className="allProducts container-fluid">
        <h2>Shop: Explore our wide range of products!</h2>
        <p className="underTitle">Make your life easier and save more money</p>

        <div className="allProductsList">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <BoxProduct item={product} key={product._id} />
            ))
          ) : (
            <p>No products available at the moment.</p>
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

export default Shop;
