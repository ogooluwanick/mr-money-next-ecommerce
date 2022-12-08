import React, { useContext, useEffect, useState } from 'react'

import {AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import { Product } from '../../components/index'
// import {useStateContext} from "../../context/StateContext"
import {toast} from "react-hot-toast"
import SuggestionCarousel from '../../components/SuggestionCarousel'
import Rating from '../../components/Rating'
import { Store } from '../../context/Store'
import { CART_ADD_ITEM } from '../../constants/constants'
import Head from 'next/head'
import {default as AllProducts}   from '../../models/Product'
import  ModalDialog  from '../../components/ModalDialog';
import axios from "axios"

import db from '../../lib/db'




const ProductDetails = ({product,similarProducts}) => {

        if(!product) return <div>No such Product I will create a model Here later</div>                                       //Incase Product is null

        const {name,image,_id,slug,price,details,rating,numReviews,countInStock}=product
        
        const [index, setIndex] = useState(0)
        const {state,dispatch,setShowCart ,showCart} = useContext(Store)

        const  itemInCart=state.cart.cartItems.find(x=>x._id===_id)
        const  itemInCartQty=itemInCart ? itemInCart.qty :0
        const [qty, setQty] = useState(0)
        


        const handleBuyNow=()=>{
                if (qty === 0 ) return toast.error("Select some 😢.")
                handleAddToCart(product,qty)

                setTimeout(() => {
                        setShowCart(true)
                }, 1000);
        }


        const plusQty=async()=>{
                const { data } = await axios.get(`/api/products/${_id}`);
                setQty(prev=>{
                       if (data.countInStock > qty) {
                                return prev+1
                       }
                       else{
                                toast.error(`Sorry. ${product.name} is out of stock 😢. `,
                                        {     
                                                duration: 1500,
                                                style: { maxWidth: screen.width <800 ? "80vw":"40vw" }
                                        }
                                )
                                return prev
                       }
                })
        }
        const minusQty=()=>{
                        setQty(prev=>prev>0 ? prev-1 : prev)
                }
        

        const handleAddToCart=(product,qty)=>{
                const existItem= state.cart.cartItems.find((x)=> x._id===product._id)

                if (qty === 0 ) return toast.error("Select some 😢.")


                dispatch({ type: CART_ADD_ITEM, payload:{_id,name, price,slug, image:product.image[0], qty,countInStock } })

                toast.success(`${qty} ${product.name} added to cart.`,
                {     duration: 1500,
                        style: {
                        maxWidth: screen.width <800 ? "80vw":"40vw"
                      },
                })
        }


       useEffect(() => {
        
        setQty(itemInCartQty)
         
       }, [itemInCart])
       
      
        
  return (
    <div>
        <Head>
                <title>{product.name} | Glam's Haven</title>
        </Head>
        <div className="product-detail-container">
                <div className="image-container">
                        <div className="">
                                <img src={image&&image[index]} className="product-detail-image"/>
                        </div>
                        <div className="small-images-container">
                                {
                                        image?.map((img,i)=>(
                                                <img src={img} key={i} className={i===index?"small-image selected-image":"small-image"} onMouseEnter={()=>setIndex(i)}/>
                                        ))
                                }
                        </div>
                </div>
                <div className="product-detail-desc">
                        <h1>{name}</h1>
                        <Rating rating={rating?rating:0}  text={`${numReviews?numReviews:0}`}/>
                        
                        <h4>Details: </h4>
                        <p>{details}</p>
                        <p className="price">₦{price.toLocaleString()} </p>
                        <p className="stock" style={{marginBottom:"10px"}}>{countInStock>0? "In stock" : "Unavailable"}</p>
                        <div className="quantity">
                                <h3>Quantity: </h3>
                                <p className="quantity-desc">
                                        <span className="minus" onClick={()=>minusQty()}><AiOutlineMinus/></span>
                                        <span className="num" >{qty}</span>
                                        <span className="plus" onClick={()=> plusQty()}><AiOutlinePlus/></span>
                                </p>
                        </div>
                        <div className="buttons">
                                <button type='button' className='add-to-cart' onClick={()=>handleAddToCart(product,qty)}>Add to Cart</button>
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
      

export const getServerSideProps= async ({ params:{slug}}) => {
        

        await db.connect();
                const product= await AllProducts.findOne({slug}).lean();
                const category=product?.category
                const similarProducts= await AllProducts.find({ category ,slug:{$ne: slug }}).sort({rating:-1}).limit(10).lean();            //show all products in the same category except the current page Product sort them by rating and show 10 max
        await db.disconnect();

        return {props:{  product:product ? db.convertDocToObj(product) : null ,  similarProducts:similarProducts.map(db.convertDocToObj)  }}
}

export default ProductDetails