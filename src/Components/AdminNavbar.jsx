import React from 'react'
import book from "../../public/booklogo.png"
import { Link } from "react-router-dom"

const AdminNavbar = ({ setSearch }) => {
  return (
    <div>
      <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center px-5 py-1.5 gap-4">
        
        <img
          src={book}
          alt="Book Store"
          className="w-20 cursor-pointer"
        />

        <div className="flex flex-1 max-w-3xl">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter keyword title, author, or ISBN"
            className="w-full px-3 py-1 text-xs border border-gray-300 rounded-l-md outline-none focus:border-blue-500"
          />
          <button className="px-3 bg-teal-800 text-white text-xs rounded-r-md">
            🔍
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/addbooks"
            className="relative px-2 py-0.5 border rounded hover:bg-gray-100"
          >
            Add Books

            
          </Link>
          <Link className="px-2 py-0.5 border rounded hover:bg-gray-100">
            Help
          </Link>

        </div>
      </div>
    </nav>
    </div>
  )
}

export default AdminNavbar
