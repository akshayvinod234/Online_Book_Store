// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const UpadateProfile = () => {
//     let [userDetails,setUserDetails]=useState({
//         username:"",
//         email:"",
//         address:""
//     })
//     useEffect(()=>{
//         axios.get(`http://localhost:5000/loginapi/login/${id}`)
//         .then((res)=>setUserDetails(res.data.payload))
//         .catch((err)=>console.log(err))
//     })

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UpadateProfile


import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { Auth } from "../Context/AuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const UpdateProfile = () => {
  const { user } = useContext(Auth)
  const userId = user?._id

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    address: "",
  })

  const [profileImg, setProfileImg] = useState(null)
  const [preview, setPreview] = useState("")



  // 🔹 Fetch user data
  useEffect(() => {
    if (!userId) return

    axios
      .get(`http://localhost:5000/loginapi/login/${userId}`)
      .then((res) => {
        const { username, email, address, profileimg } = res.data.payload
        setUserDetails({ username, email, address })
        setPreview(profileimg) // existing image
      })
      .catch(console.log)
  }, [userId])

  // 🔹 Handle text inputs
  function handleChange(e) {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 🔹 Handle file input
  function handleFileChange(e) {
    const file = e.target.files[0]
    setProfileImg(file)
    setPreview(URL.createObjectURL(file))
  }
let navigate=useNavigate()
  // 🔹 Update profile
  function handleUpdate(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("profileImg", userDetails.profileImg)
    formData.append("username", userDetails.username)
    formData.append("email", userDetails.email)
    formData.append("address", userDetails.address)

    if (profileImg) {
      formData.append("profileImg", profileImg)
    }

    axios
      .put(`http://localhost:5000/loginapi/login/${userId}`, formData)
      .then(() => {
        toast.success("Profile updated successfully ✅")
        navigate("/account")
      })
      .catch(() => toast.error("Failed to update profile ❌"))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white p-6 rounded-md shadow"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Update Profile
        </h2>

        {/* Image Preview */}
        {preview && (
          <div className="flex justify-center mb-4">
            <img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
             name="profileImg"
             value={userDetails.profileImg}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default UpdateProfile
