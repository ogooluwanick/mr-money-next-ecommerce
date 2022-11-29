import React, { createContext, useContext,useReducer, useState } from "react";
// import {toast} from "react-hot-toast"

import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/constants";


export const Store= createContext();

const initialState={
        cart: { cartItems: [] },
}

function reducer(state,action){
        switch(action.type){
                case CART_ADD_ITEM:
                        const item =action.payload
                        const existItem= state.cart.cartItems.find((x)=> x._id===item._id)
                        


                        const cartItems = existItem? 
                                                                state.cart.cartItems.map((x)=>x.name===item.name ? item: x) : 
                                                                [...state.cart.cartItems,item]

                        console.log     ("existItem",state.cart.cartItems.map((x)=>x._id===item._id ? item: x))

                       return {...state, cart:{ ...state.cart ,cartItems}}

                
                case CART_REMOVE_ITEM:                       //   fix this 
                        return {...state,cart:{ cartItems:state.cart.cartItems.filter((x)=>x._id !== action.payload._id) } }
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


export function StoreProvider({ children }) {
        const [showCart, setShowCart] = useState(false)
        const [state, dispatch] = useReducer(reducer, initialState);
        const value = { state, dispatch, setShowCart ,showCart  };
        
        return <Store.Provider value={value}>{children}</Store.Provider>;
}
