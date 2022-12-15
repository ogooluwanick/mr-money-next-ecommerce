import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from "react-icons/bs"

const Success = () => {
        // const {setCartItems,setTotalPrice,setTotalQty}=useStateContext()
        // const [order, setOrder] = useState(null)

        useEffect(() => {
              
          
        }, [])
        
  return (
    <div className='success-wrapper'>
        
        <div className="success">
                <p className="success-icon">
                        <BsBagCheckFill/>
                </p>
                <h2>Sorry but your Payment didn't go through!</h2>
                <p className="email-msg">Check your email for your receipt</p>
                <p className="description">
                        If you have any questions please email
                        <a className='email' href='mailto:orders@mail.com'>orders@mail.com</a>
                </p>
                <Link className='btn'  href={"/"}>
                        <button className='btn' type='button' width="1000px">Continue Shopping</button>
                </Link>
                <Link className='btn'  href={"/order-history"}>
                        <button className='btn' type='button' width="1000px" style={{backgroundColor:"#324d67", marginTop:".8rem"}}>Your Orders</button>
                </Link>
        </div>
        
    </div>
  )
}

export default Success