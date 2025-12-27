import React, { useContext } from "react"
import { CartData } from "../Context/CartContext"

const UserOrder = () => {
  const { order } = useContext(CartData)

  if (!order || order.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        📦 No orders found
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Orders
      </h1>

      <div className="space-y-6">
        {order.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-5"
          >
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Book Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-28 h-40 object-contain border rounded"
              />

              {/* Book Details */}
              <div className="flex-1 text-sm">
                <h2 className="text-lg font-semibold text-blue-700">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  by <span className="font-medium">{item.author}</span>
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-600">
                  <p><strong>Genre:</strong> {item.genre}</p>
                  <p><strong>Pages:</strong> {item.pages}</p>
                  <p><strong>Published:</strong> {item.publishedYear}</p>
                  <p><strong>Rating:</strong> ⭐ {item.rating}</p>
                </div>

                <p className="mt-4 text-green-600 font-medium">
                  ✔ Order Placed
                </p>
              </div>

              {/* Price */}
              <div className="text-right text-lg font-semibold text-gray-800">
                ₹ {item.price}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOrder
