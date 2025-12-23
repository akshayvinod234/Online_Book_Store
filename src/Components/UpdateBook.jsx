import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const UpdateBook = () => {
  let [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    price: "",
    rating: "",
    pages: "",
    imageUrl: ""
  })

  function handleChange(e) {
    let { name, value } = e.target
    setBook(prev => ({
      ...prev,
      [name]: value
    }))
  }


  let param = useParams()
  
useEffect(() => {
  axios
    .get(`http://localhost:5000/bookapi/book/${param.id}`)
    .then(res => {
      // Safely check if payload is an array or a single object
      const data = Array.isArray(res.data.payload) ? res.data.payload[0] : res.data.payload;
      setBook(data);
    })
    .catch(err => console.log(err));
}, [param.id]);

let navigate = useNavigate()

function edit(e) {
  e.preventDefault();
  
  // Create FormData to handle file uploads
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("author", book.author);
  formData.append("genre", book.genre);
  formData.append("publishedYear", book.publishedYear);
  formData.append("price", book.price);
  formData.append("rating", book.rating);
  formData.append("pages", book.pages);
  
  // Only append image if it's a new file object
  if (book.imageFile) {
    formData.append("imageUrl", book.imageFile);
  }

  axios
    .put(`http://localhost:5000/bookapi/book/${param.id}`, formData)
    .then(() => {
      toast.success("Book updated successfully!");

      navigate("/admin");
    })
    .catch(err => console.log(err));
}

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <form
    onSubmit={edit}
    className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg"
  >
    <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
      Update Book Details
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Genre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Published Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Published Year
        </label>
        <input
          type="number"
          name="publishedYear"
          value={book.publishedYear}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={book.rating}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Pages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pages
        </label>
        <input
          type="number"
          name="pages"
          value={book.pages}
          onChange={handleChange}
          className="input"
        />
      </div>
    </div>

    {/* Image URL */}
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image URL
      </label>
      <input
        type="text"
        name="imageUrl"
        value={book.imageUrl}
        onChange={handleChange}
        className="input"
      />
    </div>

    <button
      type="submit"
      className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      Update Book
    </button>
  </form>
</div>

  )
}

export default UpdateBook
