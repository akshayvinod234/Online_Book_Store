import React, { createContext, useContext, useState } from 'react'
import { Auth } from './AuthContext'
import axios from 'axios'


export let CartData = createContext()
const CartContext = ({children}) => {
   let {user} = useContext(Auth)
    let [cart , setCart] = useState([])
    let addToCart = (course)=>{
        let cartObject = {...course , userId:user.id}
       let result =  axios.post('http://localhost:3000/cart' , cartObject)
       console.log(result.data);
       setCart([...cart , result.data[0]])
    }


  return (
    <CartData.Provider value={{addToCart , cart}}>
        {children}
    </CartData.Provider>
  )
}

export default CartContext