import React from 'react'
import BoxProduct from './BoxProduct'

function FeaturedProducts() {
  return (
    <div className='featuredProducts container-fluid'>
      <h2>Featured Products</h2>
      <p className='underTitle'>Do not miss the current offers until the end of the week.</p>
      <div className="productsList">
        {[0,0,0,0,0,0].map((item,index)=><BoxProduct item={item} key={index}/>)}
      </div>
    </div>
  )
}

export default FeaturedProducts