import React from 'react'
import { useRouter } from "next/router"

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import getStripe from '../lib/getStripe'
import toast from 'react-hot-toast';



const Stripe = ({orderItems,loading}) => {
        const route=useRouter()
        const { status, data: session } = useSession();

        const handleStripeCheckout = async () => {
                const stripe = await getStripe();
                const response = await fetch('/api/stripe', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderItems),
                });
                
                if(response.statusCode === 500) return;
                
                const data = await response.json();

                
                toast.loading('Redirecting...');
                
                stripe.redirectToCheckout({ sessionId: data.id });
        }


        

  return (
    <motion.button  disabled={loading}   whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="paystackBtn-container">
                <div  className='paystackBtn'  onClick={()=>handleStripeCheckout()} >
                        <img src={`/stripe_svg.svg`}    alt={`stripe method`}    width="35px"    height="30px"/>
                        <span>{!loading? "Stripe": "Loading"}</span>    
                </div>                
    </motion.button>
  )
}

export default Stripe