import React from "react"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import book from "../../public/booklogo.png"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-sm text-gray-700 border-t">

      {/* Back to top */}
      <div className="text-center py-4">
        <a href="#" className="text-blue-600 hover:underline">
          Back to top
        </a>
      </div>

      {/* Main links */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Shop With Us */}
        <div>
          <h3 className="font-semibold mb-3">Shop With Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Advanced Search</li>
            <li className="hover:underline cursor-pointer">Browse Collections</li>
            <li className="hover:underline cursor-pointer"><Link to="/account">My Account</Link></li>
            <li className="hover:underline cursor-pointer">My Orders</li>
            <li className="hover:underline cursor-pointer"><Link to="/cart">View Basket</Link></li>
          </ul>
        </div>

        {/* Sell With Us */}
        <div>
          <h3 className="font-semibold mb-3">Sell With Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Start Selling</li>
            <li className="hover:underline cursor-pointer">Join Our Affiliate Program</li>
            <li className="hover:underline cursor-pointer">Book Buyback</li>
            <li className="hover:underline cursor-pointer">Refer a Seller</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-semibold mb-3">About Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">About BookHub</li>
            <li className="hover:underline cursor-pointer">Media</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Forums</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Your Ads Privacy Choices</li>
            <li className="hover:underline cursor-pointer">Designated Agent</li>
            <li className="hover:underline cursor-pointer">Accessibility</li>
          </ul>
        </div>

        {/* Find Help */}
        <div>
          <h3 className="font-semibold mb-3">Find Help</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Help</li>
            <li className="hover:underline cursor-pointer">Customer Support</li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="font-semibold mb-3">Follow BookHub</h3>
          <div className="flex gap-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-blue-600" />
            <FaXTwitter className="cursor-pointer hover:text-black" />
            <FaInstagram className="cursor-pointer hover:text-pink-600" />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-8">
        <img 
          src={book}
          alt="BookHub"
          className="h-18 w-20"
        />
      </div>

      {/* Country links */}
      <div className="text-center text-sm text-gray-600 space-x-4 px-6">
        <span className="hover:underline cursor-pointer">BookHub.co</span>
        <span className="hover:underline cursor-pointer">BookHub.de</span>
        <span className="hover:underline cursor-pointer">BookHub.fr</span>
        <span className="hover:underline cursor-pointer">BookHub.it</span>
        
      </div>

      {/* Legal */}
      <div className="text-center text-xs text-gray-500 py-6 px-6">
        <p className="mb-2">
          By using the Web site, you agree to the{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Terms and Conditions
          </span>
          .
        </p>
        <p>
          © 1996–2025 BookHub Inc. All Rights Reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
