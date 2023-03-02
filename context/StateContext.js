import React, { createContext, useContext, useState } from "react";
import {toast} from "react-hot-toast"


const Context= createContext();

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