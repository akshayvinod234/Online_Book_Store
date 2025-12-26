


// import React, { useState } from 'react'
// import Navbar from './Navbar'
// import { Outlet } from 'react-router-dom'
// import Footer from './Footer'
   
//    const UserHome = () => {
//     let [search,setSearch]=useState("")
//      return (
//        <div>
//          <Navbar setSearch={setSearch}/>
//          <Outlet context={{ search }}/>
//          <Footer/>
//        </div>
//      )
//    }
   
//    export default UserHome
   
   import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import axios from "axios"
import Footer from "./Footer"

const UserHome = () => {
  // let [show,setShow]=useState(false)
  const [search, setSearch] = useState("")
  // const [cartCount, setCartCount] = useState(0)
  const [additional,setAdditional]=useState(true)
  

  useEffect(() => {
    axios.get("http://localhost:5000/cartapi/cart")
      .then(res => setCartCount(res.data.payload.length))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Navbar setSearch={setSearch}  setAdditional={setAdditional} />
      <Outlet context={{ search,additional}} />
      <Footer />
    </>
  )
}

export default UserHome
