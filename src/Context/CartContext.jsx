

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Auth } from "./AuthContext"

export const CartData = createContext()

const CartContext = ({ children }) => {
  const { user } = useContext(Auth)

  const [cartItems, setCartItems] = useState([])
  const [order,setOrder]=useState([])

  useEffect(() => {
    if (user?._id) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [user])
console.log(order)
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cartapi/cart/user/${user._id}`
      )
      setCartItems(res.data.payload)
    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = async (item) => { 
    try {
     console.log(cartItems,item._id)
    const exists = cartItems.some(
      cart => cart.bookId === item._id
    )
console.log(exists)
    if (exists) {
      toast.error("Book already in cart")
      return
    }
      const {_id,...items}=item
      const res = await axios.post(
        "http://localhost:5000/cartapi/cart",
        { ...items, bookId:_id,userId: user._id }
      )
      setCartItems((prev) => [...prev, res.data.payload])
      toast.success("book Added to cart")
    } catch (err) {
      console.error(err)
      toast.error("Failed to add")
    }
  }
  const fetchOrders = async (userId) => {
  const res = await axios.get(
    `http://localhost:5000/orderapi/order/user/${userId}`
  )
  setOrder(res.data.payload)
}

  return (
    <CartData.Provider
      value={{
        cartItems,
        setCartItems,
        order,
        setOrder,
        cartCounts: cartItems.length,
        addToCart,
        fetchOrders
      }}
    >
      {children}
    </CartData.Provider>
  )
}

export default CartContext
