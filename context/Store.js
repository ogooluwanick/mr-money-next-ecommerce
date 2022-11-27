import React, { createContext, useContext,useReducer, useState } from "react";
import {toast} from "react-hot-toast"

import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/constants";
import product from "../mr-server/schemas/product";


export const Store= createContext();

const initialState={
        cart: { cartItems: [] },

}

function reducer(state,action){
        switch(action.type){
                case CART_ADD_ITEM:
                        const item =action.payload
                        const existItem= state.cart.cartItems.find((x)=> x.product===item.product)

                        const cartItems = existItem? 
                                                                state.cart.cartItems.map((x)=>x.name===item.name?item:x) : 
                                                                [...state.cart.cartItems,item]
                       return {...state, cart:{ ...state.cart ,cartItems}}

                case CART_REMOVE_ITEM:
                        return {...state,cart:{ cartItems:state.cart.cartItems.filter((x)=>x.product!==action.payload) } }
                case CART_SAVE_SHIPPING_ADDRESS:
                        return {...state,shippingAddress:action.payload}
                // case CART_SAVE_PAYMENT_METHOD:
                //         return {...state,paymentMethod:action.payload}
                case CART_EMPTY: 
                        return {...state, cart:{cartItems:[]}};
                default:
                        return state;
        }
}


export function StoreProvider({childeren}){
        const [state, dispatch] = useReducer(reducer,   initialState);
        const value={state, dispatch}

        return <Store.Provider value={value}> {childeren} </Store.Provider>
}


export const StateContext= ({children})=>{
        const [showCart, setShowCart] = useState(false)
        const [cartItems, setCartItems] = useState([])
        const [totalPrice, setTotalPrice] = useState(0)
        const [totalQty, setTotalQty] = useState(0)
        const [qty, setQty] = useState(0)


        let foundProduct,index;

        const onAdd=(product,quantity)=>{
                if(quantity===0)return setCartItems(cartItems)
                console.log("here")
                const checkProductInCart=cartItems.find(item=>item._id===product._id) 
                setTotalPrice(prev=>prev+product.price*quantity)
                setTotalQty(prev=>prev+quantity)

                if(checkProductInCart){

                        const updatedCartItems=cartItems.map(item=>{
                                if( item._id===product._id){
                                                return {...item, quantity:item.quantity+quantity}
                                }
                        })

                        setCartItems(updatedCartItems)
                }else{
                        product.quantity=quantity
                        
                        setCartItems([...cartItems,{...product}])
                }
                
                toast.success(`${qty} ${product.name} added to cart.`)
        }

        const toggleCartItemQty=(id,val)=>{
                 foundProduct=cartItems.find(item=>item._id===id)
                 index=cartItems.findIndex((product)=>product._id===id)
                 const newCartitems=cartItems.filter((item,index)=>item._id!=id).sort()

                 if(val==="+"){
                        setCartItems((prev) =>prev.map((item) => {
                                                                                                        if (item._id === id) {
                                                                                                                return { ...item, quantity: item.quantity + 1, };
                                                                                                        }
                                                                                                        return item;
                                                                                                }
                                                )
                        );
                        setTotalPrice(prev=>prev+foundProduct.price)
                        setTotalQty(prev=>prev+1)
                 }
                 else if((val==="-")){
                        if (foundProduct.quantity>1){
                                setCartItems((prev) =>prev.map((item) => {
                                                                        if (item._id === id) {
                                                                                return { ...item, quantity: item.quantity - 1, };
                                                                        }
                                                                        return item;
                                                                }
                                )
                                );
                                setTotalPrice(prev=>prev-foundProduct.price)
                                setTotalQty(prev=>prev-1)
                        }
                 }
        }

        const removeItem=(id)=>{
                foundProduct=cartItems.find(item=>item._id===id)
                setCartItems(cartItems.filter(item=>item._id!==id))
                setTotalPrice(prev=>prev-foundProduct.price*foundProduct.quantity)
                setTotalQty(prev=>prev-foundProduct.quantity)
        }

        const plusQty=()=>{
                setQty((prev)=>prev+1)
        }
        const minusQty=()=>{
                setQty(prev=>{
                        if(prev<=1){
                                return 1
                        }
                        return prev-1
                })
        }
        return (
                        <Context.Provider value={{setCartItems,setTotalPrice,setTotalQty,showCart,cartItems, totalPrice,totalQty,qty,plusQty,minusQty,onAdd,showCart,setShowCart,toggleCartItemQty,removeItem}}>
                                {children}
                        </Context.Provider>)
}


export const useStateContext=()=>useContext(Context)