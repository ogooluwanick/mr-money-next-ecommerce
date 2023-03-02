import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from "react-icons/bs"
import { useStateContext } from '../context/StateContext'
import { Fireworks } from '../lib/utililes'

const Success = () => {
        const {setCartItems,setTotalPrice,setTotalQty}=useStateContext()
        const [order, setOrder] = useState(null)

        useEffect(() => {
              localStorage.clear()
              setCartItems([])
              setTotalPrice(0)
              setTotalQty(0)
              Fireworks()
          
        }, [])
        
  return (
    <div className='success-wrapper'>
        
        <div className="success">
                <p className="icon">
                        <BsBagCheckFill/>
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email for your receipt</p>
                <p className="description">
                        If you have any questions please email
                        <a className='email' href='mailto:orders@mail.com'>orders@mail.com</a>
                </p>
                <Link className='btn'  href={"/"}>
                        <button className='btn' type='button' width="1000px">Continue Shopping</button>
                </Link>
        </div>
        
    </div>
  )
}

export default Success