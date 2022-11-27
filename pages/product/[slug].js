import React, { useEffect, useState } from 'react'

import {client,urlFor} from "../../lib/client"
import {AiFillStar,AiOutlineMinus,AiOutlinePlus,AiOutlineStar,AiOutlineTwitter} from "react-icons/ai"
import { Product } from '../../components/index'
import {useStateContext} from "../../context/StateContext"
import {toast} from "react-hot-toast"
import SuggestionCarousel from '../../components/SuggestionCarousel'
import Rating from '../../components/Rating'




const ProductDetails = ({product,similarProducts}) => {
        console.log("product",product)
        const {name,image,slug,price,details,rating,numReviews}=product
        const [index, setIndex] = useState(0)
        const {plusQty,minusQty,qty,onAdd,setShowCart,totalQty}=useStateContext()

        const handleBuyNow=()=>{
                if (qty === 0 ) return toast.error("Empty cart 😢.")
                onAdd(product,qty)
                setShowCart(true)
        }


       
       
        
  return (
    <div>
        <div className="product-detail-container">
                <div className="image-container">
                        <div className="">
                                <img src={urlFor(image&&image[index])} className="product-detail-image"/>
                        </div>
                        <div className="small-images-container">
                                {
                                        image?.map((img,i)=>(
                                                <img src={urlFor(img)} key={i} className={i===index?"small-image selected-image":"small-image"} onMouseEnter={()=>setIndex(i)}/>
                                        ))
                                }
                        </div>
                </div>
                <div className="product-detail-desc">
                        <h1>{name}</h1>
                        <Rating rating={rating?rating:4.5}  text={`${numReviews?numReviews:20}`}/>
                        
                        <h4>Details: </h4>
                        <p>{details}</p>
                        <p className="price">₦{price}</p>
                        <div className="quantity">
                                <h3>Quantity: </h3>
                                <p className="quantity-desc">
                                        <span className="minus" onClick={()=>minusQty()}><AiOutlineMinus/></span>
                                        <span className="num" >{qty}</span>
                                        <span className="plus" onClick={()=>plusQty()}><AiOutlinePlus/></span>
                                </p>
                        </div>
                        <div className="buttons">
                                <button type='button' className='add-to-cart' onClick={()=>onAdd(product,qty)}>Add to Cart</button>
                                <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                        </div>


                </div>
        </div>

        <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <SuggestionCarousel similarProducts={similarProducts}/>
        </div>
    </div>
  )
}

// export const getStaticPaths = async () => {
//         const query = `*[_type == "product"] {
//                                         slug {
//                                                 current
//                                         }
//                                 }`;
      
//         const products = await client.fetch(query);
      
//         const paths = products.map((product) => ({
//           params: { 
//             slug: product.slug.current
//           }
//         }));
      
//         return {
//           paths,
//           fallback: 'blocking'
//         }
//       }
      

export const getServerSideProps= async ({ params}) => {
        const productQuery=`*[_type == "product" && slug.current=="${params.slug}"][0]`
        const similarProductQuery=`*[_type == "product"]`
        
        const product= await client.fetch(productQuery)
        const similarProducts= await client.fetch(similarProductQuery)

        return {props:{product,similarProducts}}
}

export default ProductDetails