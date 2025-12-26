import React from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentSuccefull = () => {
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
