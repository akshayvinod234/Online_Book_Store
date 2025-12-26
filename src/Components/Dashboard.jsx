

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Additional from "./Additional"
import { toast } from 'react-toastify'
import { Auth } from '../Context/AuthContext'
import { CartData } from '../Context/CartContext'


const Dashboard = () => {
  let {addToCart}=useContext(CartData)
  const { search,additional} = useOutletContext()
  let {setCartCount}=useContext(Auth)
  const [books, setBooks] = useState([])

  useEffect(() =>{
    axios.get("http://localhost:5000/bookapi/book")
      .then((res) => {
        setBooks(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  },[])

  const filteredBooks = books.filter((book) => {
    const query = (search || "").toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  })

// function cartdata(item) {
//   axios.get("http://localhost:5000/cartapi/cart")
//     .then(res => {
//       toast.success("Book added to cart")
//       const exists = res.data.payload.some(cart => cart._id === item._id)
//       if (exists) {
//         return
//       }
//       axios.post("http://localhost:5000/cartapi/cart", item)
//         .then(() => {
//           setCartCount(prev => prev + 1)
//         })
//     })
//     .catch(err => console.log(err))
// }
     
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {additional && <Additional/>}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      
      {filteredBooks.length > 0 ? (
        filteredBooks.map((item) => (
          <div key={item.id} className="flex flex-col">
            
            <div className="bg-gray-100 rounded-md p-3 flex justify-center">
            <img
              src={
                item.imageUrl?.includes("https")
                  ? item.imageUrl
                  : `http://localhost:5000/uploads/${item.imageUrl}`
              }
              alt={item.title}
              className="h-56 object-contain hover:scale-105 transition"
            />


            </div>

            <div className="mt-3 text-sm">
              <h3 className="font-medium text-blue-700 hover:underline cursor-pointer line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-xs mt-1">
                {item.author}
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                ₹ {item.price}
              </p>

              <p className="text-xs text-gray-500">
                ⭐ {item.rating}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-2 w-full border border-blue-600 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))
      ) : (
        <h2 className="col-span-full text-center text-gray-500">
          No Books Found
        </h2>
      )}

    </div>
  </div>
)


}

export default Dashboard
