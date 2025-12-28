import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Auth } from "../Context/AuthContext"
import { CartData } from "../Context/CartContext"

const Cart = () => {

  let {user}=useContext(Auth)
  let{cartItems,setCartItems,order,setOrder}=useContext(CartData)
  const [shippingCost, setShippingCost] = useState(32.67)

  const shippingOptions = [
  {
    id: "standard",
    label: "Standard shipping – 14 to 28 business days",
    cost: 32.67,
  },
  {
    id: "priority",
    label: "Priority shipping – 1 to 7 business days",
    cost: 122.54,
  },
]


  let getCart = async()=>{
      let result = await axios.get(`http://localhost:5000/cartapi/cart`)
      let data=result.data.payload.filter((item)=>{
        return item.userId==user._id
      })
      setCartItems(data)
  }
  useEffect(()=>{
       getCart()
  } , [])

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5000/cartapi/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item._id !== id))
  }


function increaseQty(id) {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    )
  )
}

function decreaseQty(id) {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  )
}

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * (item.quantity || 1),
  0
)
const total = subtotal + shippingCost

let navigate=useNavigate()
const checkoutHandler=async(amount)=>{
  if(user){
    const {data:KeyData}=await axios.get("http://localhost:5000/api/v1/getKey")
    const {key}=KeyData
    console.log(key)
  const {data:orderData}=await axios.post("http://localhost:5000/api/v1/payment/process",{amount})
          const {order}=orderData

    const options = {
        key,
        amount,
        currency: 'INR',
        name: user.username, 
        description: 'Test Transaction',
        order_id: order.id,
        callback_url: "/api/v1/paymentVerification",
        prefill: {
          name: 'Akshay Vinod',
          email: 'akshay@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    }
    else{
      navigate("/userlogin")
    }
}

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      
      <h1 className="text-2xl font-semibold text-blue-700 mb-6">
        Shopping basket ({cartItems.length} item)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 border rounded-md p-5 bg-white">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="border-b pb-5 mb-5">
                <div className="flex gap-5">
                  {/* <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-36 object-contain border"
                  /> */}
                  <img
              src={
                item.imageUrl?.includes("https")
                  ? item.imageUrl
                  : `http://localhost:5000/uploads/${item.imageUrl}`
              }
              alt={item.title}
              // className="h-56 object-contain hover:scale-105 transition"
                    className="w-24 h-36 object-contain border" />
                  <div className="flex-1 text-sm">
                    <h3 className="text-blue-700 font-medium hover:underline">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {item.author}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                    <span>Quantity</span>

                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 border rounded"
                      // disabled={(item.quantity || 1) === 1}
                    >
                      -
                    </button>

                    <span>{item.quantity || 1}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>


                    <p className="text-gray-500 mt-2">1 available</p>

                    <div className="mt-3 flex gap-6 text-sm text-blue-600">

                      <button className="cursor-pointer hover:underline" onClick={()=>{removeFromCart(item._id)}}>
                        Delete
                      </button>

                    </div>
                  </div>

                  <div className="text-right font-semibold text-sm">
                    ₹ {item.price}
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              🛒 Your cart is empty
            </p>
          )}

          <div className="border-t pt-5">
  <h3 className="font-semibold mb-3">
    Choose a shipping option
  </h3>

  {shippingOptions.map((option) => (
    <label
      key={option.id}
      className="flex items-center gap-3 mb-2 text-sm cursor-pointer"
    >
      <input
        type="radio"
        name="shipping"
        value={option.cost}
        checked={shippingCost === option.cost}
        onChange={() => setShippingCost(option.cost)}
      />
      <span>
        <strong>₹ {option.cost}</strong> – {option.label}
      </span>
    </label>
  ))}
</div>

        </div>

        <div className="border rounded-md p-5 bg-white h-fit">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total ({cartItems.length} item)</span>
            <span>₹ {total}</span>
          </div>

          <button onClick={()=>{checkoutHandler(total)}}className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700">
            Proceed to checkout
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart


