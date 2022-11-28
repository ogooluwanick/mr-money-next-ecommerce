import React, { useContext } from 'react'
import Link from 'next/link'
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {toast} from "react-hot-toast"
import {urlFor} from "../lib/client"
import getStripe from '../lib/getStripe'
import Paystack from './Paystack'
import { Store } from '../context/Store'
import { CART_REMOVE_ITEM } from '../constants/constants'
// import { useStateContext } from '../context/StateContext'



const Cart = () => {
        // const {cartItems,totalPrice,totalQty,setShowCart,toggleCartItemQty,removeItem}=useStateContext()
        const {state:{cart}, dispatch, setShowCart ,showCart} = useContext(Store)

        const removeItem=(product)=>{
               dispatch({type: CART_REMOVE_ITEM ,payload:{product}})
        }


        // const handleStripeCheckout = async () => {
        //         const stripe = await getStripe();
        //         const response = await fetch('/api/stripe', {
        //           method: 'POST',
        //           headers: {
        //             'Content-Type': 'application/json',
        //           },
        //           body: JSON.stringify(cartItems),
        //         });
            
        //         if(response.statusCode === 500) return;
                
        //         const data = await response.json();

            
        //         toast.loading('Redirecting...');
            
        //         stripe.redirectToCheckout({ sessionId: data.id });
        //       }
        
  return (
    <div className='cart-wrapper' >
        <div className="cart-container">
                <button type='button' className='cart-heading' onClick={()=>setShowCart(false)}>
                        <AiOutlineLeft/>
                        <span className='heading'>Your Cart</span>
                        <span className='cart-num-items'>( {cart.cartItems.reduce((a, c)=> a + c.qty , 0)} items)</span>
                </button>

                {
                        cart.cartItems.length<1 && (
                                <div className='empty-cart'>
                                        <AiOutlineShopping    size={150}/>
                                        <h3>Your shopping bag is empty</h3>
                                        <Link href={"/"}>
                                                <button type='button' onClick={()=>setShowCart(false)} className="btn">
                                                        Continue Shopping
                                                </button>
                                        </Link>
                                </div> 
                        )
                }

                <div className="product-container">
                        {
                                cart.cartItems.length>=1 && cart.cartItems.map((item)=>(
                                        <div className="product" key={item._id}>
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
                                                                                <span className="minus" onClick={"()=>toggleCartItemQty(item._id,"-")"}><AiOutlineMinus/></span>
                                                                                <span className="num" >{item.qty}</span>
                                                                                <span className="plus" onClick={"()=>toggleCartItemQty(item._id,"+")"}><AiOutlinePlus/></span>
                                                                        </p>
                                                                </div>
                                                                <button type='button' className='remove-item' onClick={()=>removeItem(item)}>
                                                                        <TiDeleteOutline/>
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                ))
                        }
                </div>

                {/*cartItems.length>=1*/ true && (
                        <div className="cart-bottom">
                                <div className="total">
                                        <h3>Sub-total:</h3>
                                        <h3>₦{/*totalPrice*/}</h3>
                                </div>
                                <div className="btn-container">
                                        <button type='button' className='btn' onClick={"handleStripeCheckout"}>
                                                Pay with Stripe
                                        </button>  
                                        {/* <Paystack totalPrice={totalPrice}/> */}
                                </div>
                        </div>
                )}
        </div>
    </div>
  )
}

export default Cart