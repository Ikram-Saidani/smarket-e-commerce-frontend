import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BoxProduct from "../Components/Home/BoxProduct";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = searchParams.get("title");

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/api/product/search`, {
          params: { title },
        });

        if (
          response.data.data.products &&
          response.data.data.products.length > 0
        ) {
          setSearchedProducts(response.data.data.products);
        } else {
          toast.warning("No products available with this title.");
          setSearchedProducts([]);
        }
      } catch (error) {
        setSearchedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchSearchedProducts();
    }
  }, [title]);

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
