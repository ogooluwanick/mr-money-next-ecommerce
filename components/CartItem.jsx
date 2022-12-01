import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {urlFor} from "../lib/client"
import { Store } from '../context/Store'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/constants'
import toast from 'react-hot-toast'


const CartItem = ({item}) => {
        const {state:{cart}, dispatch ,showCart} = useContext(Store)
        let countInStock=5                                                                                                                        //Make  dyn later


        const  itemInCart=cart.cartItems.find(x=>x._id===item._id)
        const  itemInCartQty=itemInCart ? itemInCart.qty :0
        const [qty, setQty] = useState(0)

        const removeItem=(product)=>{
                dispatch({ type: CART_REMOVE_ITEM, payload:{...product } })
                toast.error(`${item.name} has been removed.`,
                {     duration: 1500,
                        style: {
                        maxWidth: screen.width <800 ? "80vw":"40vw"
                      },
                })
        }
        

        const handleAddToCart=(product,qty)=>{
                const existItem= cart.cartItems.find((x)=> x.slug===product.slug)

                if (qty === 0 ) return toast.error("Select some 😢.")

                dispatch({ type: CART_ADD_ITEM, payload:{_id,name, price,slug, image:product.image[0], qty} })

                toast.success(`${qty} ${item.name} added to cart.`,
                {     duration: 1500,
                        style: {
                        maxWidth: screen.width <800 ? "80vw":"40vw"
                      },
                })
        }

        const plusQty=()=>{
                setQty(prev=>{
                       if (countInStock > qty) {
                                return prev+1
                       }
                       else{
                                toast.error(`Sorry. ${item.name} is out of stock 😢. Sorry. `,
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

               
        

        useEffect(() => {
                
                setQty(itemInCartQty)
                 
        }, [itemInCart])
  return (
        <div className="product" >
                <Link  href={`/product/${item.slug.current}`}>
                        <img className='cart-product-image' src={urlFor(item?.image)} alt={item?.name + " product image"} /> 
                </Link>
                <div className="item-desc">
                        <div className="flex top">
                                <h5> <Link  href={`/product/${item.slug.current}`}>{item.name}</Link></h5>
                                <h4>₦{item.price}</h4>
                        </div>
                        <div className="flex bottom">
                                <div className="">
                                        <p className="quantity-desc">
                                                <span className="minus" onClick={()=>minusQty()}><AiOutlineMinus/></span>
                                                <span className="num" >{qty}</span>
                                                <span className="plus" onClick={()=>plusQty()} ><AiOutlinePlus/></span>
                                        </p>
                                </div>
                                <div>
                                        <button type='button' className='add-item' onClick={()=>handleAddToCart(item,qty)}>
                                                <AiOutlineCheckCircle/>
                                        </button>
                                        <button type='button' className='remove-item' onClick={()=>removeItem(item)}>
                                                <TiDeleteOutline/>
                                        </button>
                                </div>
                        </div>
                </div>
        </div>
  )
}

export default CartItem