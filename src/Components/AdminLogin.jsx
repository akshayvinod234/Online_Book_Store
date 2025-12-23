import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
    let [admins,setAdmins]=useState([])
    let [admin,setAdmin]=useState({
        username:"",
        password:""
    })
    useEffect(()=>{
        axios.get("http://localhost:1000/admins")
        .then((res)=>{
            setAdmins(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
console.log(admin)
console.log(admins)

function handleChange(e){
    let{name,value}=e.target
    setAdmin((prev)=>({
        ...prev,
        [name]:value
    
    }))
}

let isPresent=admins.filter((el)=>{
    return el.username===admin.username && el.password===admin.password
})    
console.log(isPresent)
let navigate=useNavigate()
function login(){
      if(isPresent.length>0){
        navigate('/adminhome')
      }
}

  return (
    <div>
    <label htmlFor="">Username</label>
    <input name="username" value={admin.username} onChange={handleChange} type="text" />
    <label htmlFor="">Password</label>
    <input name="password" value={admin.password} onChange={handleChange} type="password" />
    <button onClick={login}>Login</button>
    </div>
  )
}

export default AdminLogin
