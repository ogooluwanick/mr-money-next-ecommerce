import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineShopping} from "react-icons/ai"
import Cart from './Cart'
import {useStateContext} from "../context/StateContext"
import { Store } from '../context/Store'


const Navbar = () => {
        // const {showCart,setShowCart,totalQty}=useStateContext()
        const {state:{cart}, dispatch}=useContext(Store)

  return (
    <div className='navbar-container'>
        <p className='logo'>
                <Link href={"/"}>
                        <span className='logoSpan'>
                                <Image src="/glam_icon.png" alt="GLAM Logo"  width={40} height={40}/>
                                GLAM
                        </span>
                </Link>
        </p>
        <button type='button' className='cart-icon' onClick={"()=>setShowCart(prev=>!prev)"}>
                <AiOutlineShopping/>
               {
                cart.cartItems.lenght>0 &&  <span className="cart-item-qty">{cart.cartItems.lenght}</span>
                }
        </button>
        {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar