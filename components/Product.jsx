import React from 'react'
import LINK from "next/link"
import { urlFor } from '../lib/client'


const Product = ({product:{_id,name,image,slug,price}}) => {
        console.log("Product",name)
  return (
    <div>
        <LINK href={`/product/${slug.current}`}>
              <div className="product-card">
                        <img className='product-image' src={urlFor(image&&image[0])} alt={`product ${name}`}  width="250px" height={250}/>
                        <div className="product-name">{name}</div>
                        <div className="product-price">₦{price}</div>
              </div>
        </LINK>
    </div>
  )
}

export default Product