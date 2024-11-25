import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BoxProduct from "../Components/Home/BoxProduct";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function SearchResults() {
  const [searchParams] = useSearchParams(); // Get query parameters
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(false); // To handle loading state
  const title = searchParams.get("title"); // Extract 'title' parameter

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await appAxios.get(`/api/product/search`, {
          params: { title }, // Pass title as query parameter
        });

        if (response.data.data.products && response.data.data.products.length > 0) {
          setSearchedProducts(response.data.data.products); // Update state with fetched products
        } else {
          toast.warning("No products available with this title."); // Show warning toast
          setSearchedProducts([]); // Empty results
        }
      } catch (error) {
        toast.error("Failed to fetch products. Please try again later."); // Show error toast
        setSearchedProducts([]); // Empty results
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (title) {
      fetchSearchedProducts();
    }
  }, [title]); // Re-fetch if the title changes

  return (
    <div className="allProducts container-fluid">
      <h2>Search</h2>
      {title && <p className="underTitle">Results for: "{title}"</p>}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="allProductsList">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((item, index) => (
              <BoxProduct item={item} key={index} />
            ))
          ) : (
            <p>No products available with this title.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
