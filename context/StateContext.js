import React, { createContext, useContext, useState } from "react";
import {toast} from "react-hot-toast"


const Context= createContext();

export const StateContext= ({children})=>{
        const [showCart, setShowCart] = useState(false)
        const [cartItems, setCartItems] = useState([])
        const [totalPrice, setTotalPrice] = useState(0)
        const [totalQty, setTotalQty] = useState(0)
        const [qty, setQty] = useState(0)

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
                        <Context.Provider value={{showCart,cartItems, totalPrice,totalQty,qty,plusQty,minusQty,onAdd,showCart,setShowCart}}>
                                {children}
                        </Context.Provider>)
}


export const useStateContext=()=>useContext(Context)