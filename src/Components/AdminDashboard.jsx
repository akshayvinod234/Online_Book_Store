import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'


const AdminDashboard = ({ search }) => {
 
    const [books, setBooks] = useState([])

      useEffect(() => {
    axios.get("http://localhost:5000/bookapi/book")
      .then((res) => {
        setBooks(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
      const filteredBooks = books.filter((book) => {
    const query = (search || "").toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  })
  let navigate = useNavigate();
  function update(id) {
      navigate(`/updatebook/${id}`)
  }

  function remove(id) {
    axios.delete(`http://localhost:5000/bookapi/book/${id}`)
      .then(() => {
        setBooks(prev => prev.filter(item => item._id !== id))
        toast.success("Book removed successfully")
      })
      .catch(err => console.log(err))
    }

  return (
<div className="max-w-7xl mx-auto px-6 py-6">
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

            <div className="mt-3 text-sm ">
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
             <div className="mt-2 flex gap-2">
                <button
                    onClick={() => update(item._id)}
                    className="flex-1 border w-20 gap-4 border-green-600 text-green-600 text-xs py-1.5 rounded 
                            hover:bg-green-600 hover:text-white transition"
                >
                    Update
                </button>

                <button
                    onClick={() => remove(item._id)}
                    className="flex-1 border w-20 gap-4 border-red-600 text-red-600 text-xs py-1.5 rounded 
                            hover:bg-red-600 hover:text-white transition"
                >
                    Remove
                </button>
            </div>
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

export default AdminDashboard
