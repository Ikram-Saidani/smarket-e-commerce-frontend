import React from 'react'
import BoxProduct from './BoxProduct'

function NewProducts() {
  return (
    <div className='newProducts container-fluid'>
      <h2>New Products</h2>
      <p className='underTitle'>New products with updated stocks.</p>
      <div className="productsList">
        {[0,0,0,0,0,0].map((item,index)=><BoxProduct item={item} key={index}/>)}
      </div>
    </div>
  )
}

export default NewProducts