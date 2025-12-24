// import React, { use, useContext, useEffect, useState } from 'react'
// import { Auth } from '../Context/AuthContext';
// import axios from 'axios';

// const Account = () => {
//   let {user,logout}=useContext(Auth);
//   let [data,setData]=useState([]);
//   useEffect(()=>{
//     axios.get(`http://localhost:5000/loginapi/login/${user._id}`)
//     .then((res)=>setData(res.data.payload))
//     .catch((err)=>console.log(err))
//   },[])
//   console.log(data)
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white border rounded-md p-6 shadow-sm">
//         <h2 className="text-2xl font-semibold mb-4">My Account</h2>
//         {user ? (
//           <div>
//             <p className="mb-2"><strong>Username:</strong> {user.username}</p>
//             <p className="mb-2"><strong>Email:</strong> {user.email}</p>
//             <button onClick={logout}>Logout</button>
//           </div>
//         ) : (
//           <p>No user information available.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Account

import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Account = () => {
  const { user, logout } = useContext(Auth);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/loginapi/login/${user._id}`)
        .then((res) => setData(res.data.payload))
        .catch((err) => console.log(err));
    }
  }, [user]);
  console.log(user)
  let navigate=useNavigate()
function updateProfile(){
  navigate(`/update-profile/${user._id}`)
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-semibold">My Account</h2>
          <p className="text-sm opacity-90">
            Manage your profile, orders and settings
          </p>
        </div>

        {user ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Profile Card */}
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Avatar"
                className="w-24 h-24 rounded-full border mb-3"
              />
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>

              <button
                onClick={logout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            {/* Account Details */}
            <div className="md:col-span-2 border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                Account Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Username:</span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Account ID:</span>{" "}
                  {user._id}
                </p>
              </div>

              {/* Address Section */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p className="text-sm text-gray-600">
                  {data?.address || "No address added yet"}
                </p>
                <button onClick={updateProfile} className="mt-3 text-sm text-teal-700 hover:underline">
                  + Add / Edit Profile Details
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-teal-700">
                  {data?.orders || 0}
                </p>
                <p className="text-sm text-gray-500">Orders</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-teal-700">
                  {data?.cartItems || 0}
                </p>
                <p className="text-sm text-gray-500">Cart Items</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-teal-700">
                  {data?.wishlist || 0}
                </p>
                <p className="text-sm text-gray-500">Wishlist</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600">
            No user information available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
