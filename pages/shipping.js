import { useSession } from 'next-auth/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';


import Breadcrumbs from '../components/Breadcrums'
import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/constants';
import { Store } from '../context/Store';


const Shipping = () => {
        const { register, handleSubmit , formState:{errors}, getValues,setValue} = useForm();
        const router= useRouter()
        const {state:{cart,shippingAddress}, dispatch ,showCart} = useContext(Store)
        const { status, data: session } = useSession();



        const submitHandler = async ({ fullName,address, city,postcode, country, }) => {
                dispatch({type:CART_SAVE_SHIPPING_ADDRESS , payload:{fullName:fullName,address:address , city:city ,postcode:postcode , country:country }})
                // router.push("payment")
        
                toast.success( `Order details saved`,
                        {     
                                duration: 2000,
                                style: { maxWidth: screen.width <800 ? "80vw":"40vw" }
                        }
                )
        }

        useEffect(() => {
                !shippingAddress.fullName? setValue("fullName", session?.user?.name) :setValue("fullName",shippingAddress.fullName)
                setValue("address",shippingAddress.address)
                setValue("city",shippingAddress.city)
                setValue("postcode",shippingAddress.postcode)
                setValue("country",shippingAddress.country)
          
        }, [setValue,shippingAddress])
        
  return (
    <div>
                <Head>
                        <title>Shipping | Glams Haven</title>       
                </Head>
                <Breadcrumbs activeStep={1}/>
                <form onSubmit={handleSubmit(submitHandler)} className="shipping-form">
                        <h1>About your order</h1>

                        <div className="info-shipping">
                               
                               <div className="shipping-form-item">
                                        <div className="shipping-item-desc">
                                                <h2>Personal info</h2>
                                                <p>Provide your personal info</p>
                                        </div>

                                        <div className="shipping-form-inputs">
                                                <div className="shipping-form-input">
                                                        <label htmlFor="fullName">Full Name</label>
                                                        <input id='fullName' type="text" autoFocus  style={{textTransform:"capitalize"}} {
                                                                                        ...register(      "fullName",
                                                                                                                {
                                                                                                                        required:"Please enter your full name. 😭",
                                                                                                                })
                                                                                }
                                                        />
                                                        {errors.fullName?<div className="loginErrors">{errors.fullName.message}</div>:""}
                                                </div>
                                        </div>
                               </div>
                                <hr />
                               <div className="shipping-form-item">
                                        <div className="shipping-item-desc">
                                                <h2>Shipping Adress</h2>
                                                <p>Provide us with your address please</p>
                                        </div>

                                        <div className="shipping-form-inputs">
                                                <div className="shipping-form-input">
                                                        <label htmlFor="address">Address</label>
                                                        <input id='address' type="text"  autoFocus  {
                                                                                        ...register(      "address",
                                                                                                                {
                                                                                                                        required:"You've gotta have an address right? 😭",
                                                                                                                        minLength:{value: 3 , message:"It should be longer right? 😭"}
                                                                                                                })
                                                                                }
                                                        />
                                                        {errors.address?<div className="loginErrors">{errors.address.message}</div>:""}
                                                </div>

                                                <div className="shipping-form-input">
                                                        <label htmlFor="city">City</label>
                                                        <input id='city' type="text" autoFocus  {
                                                                                        ...register(      "city",
                                                                                                                {
                                                                                                                        required:"Represent your city! 😎",
                                                                                                                })
                                                                                }
                                                        />
                                                        {errors.city?<div className="loginErrors">{errors.city.message}</div>:""}
                                                </div>
                                                
                                                <div className="shipping-form-input">
                                                        <label htmlFor="postcode">Post code</label>
                                                        <input id='postcode' type="text" autoFocus  { ...register( "postcode") }
                                                        />
                                                </div>
                                                <div className="shipping-form-input">
                                                        <label htmlFor="country">Country</label>
                                                        <input id='country' type="text" autoFocus  {
                                                                                        ...register(      "country",
                                                                                                                {
                                                                                                                        required:"You've got a country! 😎",
                                                                                                                })
                                                                                }
                                                        />
                                                        {errors.country?<div className="loginErrors">{errors.country.message}</div>:""}
                                                </div>
                                        </div>
                                </div>
                                <hr />
                                <div className="shipping-form-item">
                                        <div className="shipping-item-desc">
                                                <h2>Payment method</h2>
                                                <p>How will you like to pay</p>
                                        </div>
                                        <div className="shipping-form-inputs">
                                                <div className="shipping-form-input">

                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div className="shipping-btn-container">
                                <button className='shipping-btn' >Save & Continue</button>
                        </div>
                </form>
        </div>
  )
}

export default Shipping