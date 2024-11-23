import React, { useEffect, useState } from 'react'
import BoxProduct from './BoxProduct'
import appAxios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function NewProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    appAxios
      .get("/api/product/newproducts")
      .then((res) => {
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        if (!fetchedProducts || fetchedProducts.length === 0) {
          toast.warning("No new products available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching new products:", err);
        toast.error("Failed to fetch products. Please try again later.");
      });
  }, []);
  return (
    <div className='newProducts container-fluid'>
      <h2>New Products</h2>
      <p className='underTitle'>New products with updated stocks.</p>
      <div className="productsList">
      {(!products || products.length === 0) && (
          <p>No products to display at the moment.</p>
        )}
        {products.map((item,index)=><BoxProduct item={item} key={index}/>)}
      </div>
    </div>
  )
}

export default NewProducts