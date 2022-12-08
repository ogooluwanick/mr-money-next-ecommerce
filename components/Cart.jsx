import React, { useContext } from 'react'
import Link from 'next/link'
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {toast} from "react-hot-toast"
import getStripe from '../lib/getStripe'
import Paystack from './Paystack'
import { Store } from '../context/Store'
import { CART_REMOVE_ITEM } from '../constants/constants'
import CartItem from './CartItem'
import {  useRouter } from 'next/router'
// import { useStateContext } from '../context/StateContext'



const Cart = () => {
        const router=useRouter()
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
                                        <CartItem item={item} key={item._id}/>
                                ))
                        }
                </div>

                {/*cartItems.length>=1*/ true && (
                        <div className="cart-bottom">
                                <div className="total">
                                        <h3>Sub-total:</h3>
                                        <h3>₦{cart.cartItems.reduce((a,c)=>a+ c.qty * c.price,0).toLocaleString()}</h3>
                                </div>
                                <div className="btn-container">
                                        <button type='button' className='btn' onClick={()=>{ router.push("/login?redirect=/shipping") && (setShowCart(false))} }>
                                                Check Out
                                        </button>  
                                        {/* <Paystack totalPrice={cart.cartItems.reduce((a,c)=>a+ c.qty * c.price,0)}/> */}
                                </div>
                        </div>
                )}
        </div>
    </div>
  )
}

export default Cart