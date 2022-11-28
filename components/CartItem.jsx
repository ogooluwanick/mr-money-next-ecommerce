import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {urlFor} from "../lib/client"
import { Store } from '../context/Store'
import { CART_ADD_ITEM } from '../constants/constants'
import toast from 'react-hot-toast'


const CartItem = ({item}) => {
        const {state:{cart}, dispatch ,showCart, plusQty,  minusQty} = useContext(Store)

        const  itemInCart=cart.cartItems.find(x=>x._id===item._id)
        const  itemInCartQty=itemInCart ? itemInCart.qty :0
        // console.table("Here", product)
        const [qty, setQty] = useState(0)

        const handleReduceProduct=(item)=>{
                minusQty(setQty,item.qty)

                handleAddToCart(item,qty)
        }
        const handleIncreaseProduct=(item)=>{
                plusQty(setQty,item.qty,item.name)

                setTimeout(() => {
                        handleAddToCart(item,qty)
                        
                }, 200);
        }

        const handleAddToCart=(product,qty)=>{
                const existItem= cart.cartItems.find((x)=> x.slug===product.slug)

                if (qty === 0 ) return toast.error("Select some 😢.")

                dispatch({ type: CART_ADD_ITEM, payload:{...product,  qty } })

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
        <div className="product" >
                <Link  href={`/product/${item.slug.current}`}>
                        <img className='cart-product-image' src={urlFor(item?.image[0])} alt={item?.name + " product image"} /> 
                </Link>
                <div className="item-desc">
                        <div className="flex top">
                                <h5> <Link  href={`/product/${item.slug.current}`}>{item.name}</Link></h5>
                                <h4>₦{item.price}</h4>
                        </div>
                        <div className="flex bottom">
                                <div className="">
                                        <p className="quantity-desc">
                                                <span className="minus" onClick={()=>handleReduceProduct(item)}><AiOutlineMinus/></span>
                                                <span className="num" >{qty}</span>
                                                <span className="plus" onClick={()=>handleIncreaseProduct(item)}><AiOutlinePlus/></span>
                                        </p>
                                </div>
                                <button type='button' className='remove-item' onClick={()=>removeItem(item)}>
                                        <TiDeleteOutline/>
                                </button>
                        </div>
                </div>
        </div>
  )
}

export default CartItem