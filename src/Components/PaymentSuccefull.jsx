import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import  { CartData } from "../Context/CartContext";
import axios from "axios";
import { Auth } from "../Context/AuthContext";

const PaymentSuccefull = () => {
  let {user}=useContext(Auth)
  let{cartItems,setCartItems,order,setOrder}=useContext(CartData)
  // console.log(items)
  useEffect(() => {
    if (!user || cartItems.length === 0) return

    const saveOrder = async () => {
      const items = cartItems.map(item => ({
        title: item.title,
        author: item.author,
        genre: item.genre,
        publishedYear: item.publishedYear,
        rating: item.rating,
        pages: item.pages,
        price: item.price,
        imageUrl: item.imageUrl,
        bookId:item.bookId,
        userId: user._id
      }))

      await Promise.all(
        items.map(el =>
          axios.post("http://localhost:5000/orderapi/order", el)
        )
      )

      const res = await axios.get(
        `http://localhost:5000/orderapi/order/user/${user._id}`
      )
      setOrder(res.data.payload)

      await axios.delete(`http://localhost:5000/cartapi/cart/user/${user._id}`)
       setCartItems([])
    }

    saveOrder()
  }, [user, cartItems])

  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  let navigate=useNavigate()
  function handleUrl(e){
    e.preventDefault()
       navigate("/")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-green-600 text-3xl">✔</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your transaction was completed successfully.
        </p>

        {/* Reference ID */}
        {reference && (
          <div className="bg-gray-50 border rounded-md p-3 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Reference ID:</strong> {reference}
            </p>
          </div>
        )}

        {/* Button */}
        <button  onClick={handleUrl}className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccefull;
