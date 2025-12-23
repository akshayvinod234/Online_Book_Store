import React, { useContext } from "react"
import book from "../../public/booklogo.png"
import { Link } from "react-router-dom"
import { Auth } from "../Context/AuthContext";

const Navbar = ({ setSearch, cartCount ,show,setAdditional}) => {
      let {user}=useContext(Auth);
  function handleShow(e){
    setSearch(e.target.value)
    if(e.target.value===""){
      setAdditional(true)
      return;
    }
    setAdditional(false)
  }
  console.log(cartCount )
  return (
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
            onChange={handleShow}
            placeholder="Enter keyword title, author, or ISBN"
            className="w-full px-3 py-1 text-xs border border-gray-300 rounded-l-md outline-none focus:border-blue-500"
          />
          <button className="px-3 bg-teal-800 text-white text-xs rounded-r-md">
            🔍
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-2 text-xs">
        { !user && (<Link className="px-2 py-0.5 border rounded hover:bg-gray-100" to="/userlogin">
            Sign in
          </Link>)}

          {user && (<Link to="/account" className="px-2 py-0.5 border rounded hover:bg-gray-100">
            My Account
          </Link>)}

          {/* 🛒 Basket with Count */}
          <Link
            to="/cart"
            className="relative px-2 py-0.5 border rounded hover:bg-gray-100"
          >
            Basket 🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link className="px-2 py-0.5 border rounded hover:bg-gray-100">
            Help
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
