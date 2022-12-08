import React from 'react'
import LINK from "next/link"


const Product = ({product:{_id,name,image,slug,price}}) => {
  return (
    <div>
        <LINK href={`/product/${slug}`}>
              <div className="product-card">
                        <img className='product-image' src={image&&image[0]} alt={`product ${name}`}  width="250px" height="250px"/>
                        <div className="product-name">{name}</div>
                        <div className="product-price">₦{price.toLocaleString()}</div>
              </div>
        </LINK>
    </div>
  )
}

export default Product