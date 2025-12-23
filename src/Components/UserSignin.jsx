import React, { useState } from "react";
import axios from "axios";
import book from "../../public/booklogo.png";
import {toast} from "react-toastify"

const UserSignin = () => {
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpwd:""
  });

  function signup(e) {
    e.preventDefault(); 
    if(user.username.trim() && user.password.trim() ){
      if(user.password !== user.confirmpwd){
        toast.error("Passwords do not match")
        return;
      }
    axios.post("http://localhost:5000/loginapi/login", user)
      .then(() => {
        toast.success("Account created successfully")
        setUser({
    username: "",
    email:"",
    password: "",
    confirmpwd:""
  })
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    toast.error("Please fill all the fields")
  }
}

  function handleChange(e) {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border rounded-md p-6 shadow-sm">
        <img  src={book} alt="Book Store" className="w-32 mx-auto mb-1 cursor-pointer"/>
        <h2 className="text-xl font-semibold mb-6">Create Account</h2>
        <form onSubmit={signup}>
          <label className="block text-sm font-medium mb-1">
            UserName
          </label>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded-sm outline-none focus:border-teal-700"
            required
          />
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            className="w-full px-3 py-2 mb-4 border rounded-sm outline-none focus:border-teal-700"
            required
          />
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            className="w-full px-3 py-2 mb-6 border rounded-sm outline-none focus:border-teal-700"
            required
          />
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            name="confirmpwd"
            value={user.confirmpwd}
            onChange={handleChange}
            type="password"
            className="w-full px-3 py-2 mb-6 border rounded-sm outline-none focus:border-teal-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-sm hover:bg-teal-900 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignin
