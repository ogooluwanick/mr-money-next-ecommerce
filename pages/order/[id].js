import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast';
import CartItem from '../../components/CartItem';
import { DELIVER_FAIL, DELIVER_REQUEST, DELIVER_RESET, DELIVER_SUCCESS, FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS, PAY_FAIL, PAY_REQUEST, PAY_RESET, PAY_SUCCESS } from '../../constants/constants';
import { Store } from '../../context/Store'
import { getError } from '../../lib/error';
import moment from "moment"
import MotionWrap from '../../components/MotionWrap';
import Paystack from '../../components/Paystack'
import Stripe from '../../components/Stripe';
import { Meta } from '../../components';



function reducer(state, action) {

        switch (action.type) {
                case  FETCH_REQUEST:
                        return { ...state, loading: true, error: '' };
                case  FETCH_SUCCESS:
                        return { ...state, loading: false, order: action.payload, error: '' };
                case  FETCH_FAIL:
                        return { ...state, loading: false, error: action.payload };
                case  PAY_REQUEST:
                        return { ...state, loadingPay: true };
                case  PAY_SUCCESS:
                        return { ...state, loadingPay: false, successPay: true };
                case  PAY_FAIL:
                        return { ...state, loadingPay: false, errorPay: action.payload };
                case  PAY_RESET:
                        return { ...state, loadingPay: false, successPay: false, errorPay: '' };
                case  DELIVER_REQUEST:
                        return { ...state, loadingDeliver: true };
                case  DELIVER_SUCCESS:
                        return { ...state, loadingDeliver: false, successDeliver: true };
                case  DELIVER_FAIL:
                        return { ...state, loadingDeliver: false };
                case  DELIVER_RESET:
                        return {...state, loadingDeliver: false, successDeliver: false, };
        
                default:state;
        }
      }



const Order = () => {
        const router= useRouter()
        // const {state:{cart,shippingAddress,paymentMethod}, dispatch ,showCart ,setShowCart} = useContext(Store)

 
        const [ {loading,error,order,successPay,loadingPay, loadingDeliver,successDeliver }, dispatch,] = useReducer(reducer, {
                loading: true,
                order: {},
                error: '',
                }
        );

        const {
                shippingAddress,
                paymentMethod,
                orderItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
                isPaid,
                paidAt,
                isDelivered,
                deliveredAt,
              } = order;

        useEffect(() => {
                const fetchOrder = async () => {
                  try {
                    dispatch({ type: 'FETCH_REQUEST' });
                    const { data } = await axios.get(`/api/orders/${router.query.id}`);
                    dispatch({ type: 'FETCH_SUCCESS', payload: data });
                  } catch (err) {
                    dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
                  }
                };
                if (!order._id || successPay || (order._id && order._id !== router.query.id)) {
                  fetchOrder();
                   if (successPay){
                        dispatch({type:PAY_RESET})
                   }
                }
        }, [order, router.query.id,successPay]);
        
  return (
    <div>
        <Meta title={`Order | Glams Haven`}/>
        <div  className='place-order-screen'>
                        <h1>Order {router.query.id}</h1>
                        {
                                loading ? ( <div>Loading...</div>) :
                                error?(<div style={{color:"red"}}>{error}</div>)
                                :
                                (
                                        <MotionWrap>
                                        <div className='place-order-container'>
                                                <div className='place-order-details '>
                                                        <div className='place-order-card'>
                                                                <h2>Personal info</h2>
                                                                
                                                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                                                        <p style={{textTransform:"capitalize"}} >{shippingAddress?.fullName}</p>
                                                                        <p  > {shippingAddress?.phone}</p>    
                                                                </div>

                                                                
                                                                <hr />

                                                                <h2>Shipping Adress</h2>
                                                                <p style={{textTransform:"capitalize"}} >   
                                                                        {
                                                                                `${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.postcode?  `${shippingAddress?.postcode},` :""} ${shippingAddress?.country}`
                                                                        }
                                                                </p>
                                                                <div className={`order-condition ${isDelivered?"order-condition-success":"order-condition-error"}`} style={{marginTop:".6rem"}}>
                                                                        {
                                                                                isDelivered? `Delivered on the ${moment(order.deliveredAt).format('Do [of] MMMM, YYYY [at] h:mma')}` :  "Not delivered"
                                                                        }
                                                                </div>
                                                                <hr />
                                                                <h2>Payment method</h2>

                                                                <div>
                                                                        {
                                                                                paymentMethod==="paystack"?
                                                                                                                <img src={`/paystack_svg.svg`}
                                                                                                                style={{marginLeft:"-00px"}}
                                                                                                                alt={`paystack method`}
                                                                                                                width="150px"
                                                                                                                height="40px"/>
                                                                                                                :
                                                                                                                <img src={`/stripe_svg.svg`}
                                                                                                                alt={`stripe method`}
                                                                                                                width="150px"
                                                                                                                height="40px"/>
                                                                                                                
                                                                                
                                                                        }

                                                                <div className={`order-condition ${isPaid?"order-condition-success":"order-condition-error"}`}>
                                                                        {
                                                                                isPaid? ` Paid on the ${moment(order.paidAt).format('Do [of] MMMM, YYYY [at] h:mma')}` :  "Not paid"
                                                                        }
                                                                </div>
                                                                </div>

                                                                {/* <div id="order-links" style={{width:"100%",display:"flex",justifyContent:"flex-end"}}><Link  href={"/shipping"}>Change</Link></div> */}
                                                        </div>
                                                
                                                        
                                                        <div className="product-container place-order-card">
                                                                {
                                                                        orderItems?.length>=1 && orderItems?.map((item)=>(
                                                                                <CartItem item={item} key={item._id}         showControls={true}/>
                                                                        ))
                                                                }
                                                        </div>
                                                </div>
                                                <div className='place-order-card place-order-summary'>
                                                        <h2>Order Summary</h2>
                                                        <div>
                                                                <div className='order-numbers'>
                                                                        <p>Subtotal</p>
                                                                        <p>???{itemsPrice?.toLocaleString()}</p>
                                                                </div>
                                                                {/* <div className='order-numbers'>
                                                                        <p>Tax</p>
                                                                        <p>???50.64</p>
                                                                </div> */}
                                                                <div className='order-numbers'>
                                                                        <p>Shipping</p>
                                                                        <p>???{shippingPrice?.toLocaleString()}</p>
                                                                </div>
                                                                <div className='order-numbers'>
                                                                        <p>Total</p>
                                                                        <p>???{totalPrice?.toLocaleString()}</p>
                                                                </div>
                                                        </div>
                                                        {/* <div><button disabled={loading} onClick={()=>placeOrderHandler()}>{loading?"Loading...":"Confirm Order"}</button></div> */}
                                                        {
                                                                !isPaid ? 
                                                                        (
                                                                                paymentMethod==="paystack" ?
                                                                               <Paystack id={router.query.id}   loading={loading}  totalPrice={totalPrice} dispatch={dispatch} successPay={successPay}/>    
                                                                               :
                                                                               <Stripe   loading={loading}  orderItems={orderItems}/>    
                                                                        )
                                                                : ""
                                                        }
                                                        
                                                                
                                                </div>
                                        </div>
                                        </MotionWrap>

                                )
                        }
                </div>
    </div>
  )
}

export default Order