import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineShopping} from "react-icons/ai"
import Cart from './Cart'
import { Store } from '../context/Store'
// import {useStateContext} from "../context/StateContext"


const Navbar = () => {
        const {state:{cart}, setShowCart ,showCart} = useContext(Store)

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
        <button type='button' className='cart-icon' onClick={()=>setShowCart(prev=>!prev)}>
                <AiOutlineShopping/>
               {
                        cart.cartItems.length > 0  && <span className="cart-item-qty">{cart.cartItems.reduce((a, c)=> a + c.qty , 0)}</span>
               }
        </button>
        {showCart && <Cart />}
    </div>
  )
}

export default Navbar