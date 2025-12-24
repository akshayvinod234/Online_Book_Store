import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import book from "../../public/booklogo.png";
import { toast } from "react-toastify";
import { Auth } from "../Context/AuthContext";

const UserLogin = () => {
  let {Login}=useContext(Auth);
  const { setShow } = useOutletContext()

  let [users, setUsers] = useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/loginapi/login")
      .then((res) => setUsers(res.data.payload))
      .catch(console.log);
  }, []);

  function handleChange(e) {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  let navigate = useNavigate();


let login=async()=>{
  const matchedUser = users.find(
    (u) =>
      u.email === user.email &&
      u.password === user.password
  );
  if (matchedUser) {
    Login(matchedUser);
    toast.success("Login Successful");
    setShow(true);
    navigate("/");
  } else {
    toast.error("Invalid Credentials");
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border rounded-md p-6 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <img src={book} className="w-32 mx-auto mb-2" />
          <h2 className="text-xl font-semibold mb-6">Sign In</h2>

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded-sm"
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            className="w-full px-3 py-2 mb-4 border rounded-sm"
          />

          <button className="w-full bg-teal-800 text-white py-2 rounded-sm">
            Sign In
          </button>

          <p className="text-sm mt-4">
            New user?{" "}
            <Link to="/usersignup" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
