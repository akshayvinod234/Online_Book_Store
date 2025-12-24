import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLogin from './Components/AdminLogin'
import AdminHome from './Components/AdminHome'
import UserSignin from './Components/UserSignin'
import UserHome from './Components/UserHome'
import UserLogin from './Components/UserLogin'
import Dashboard from './Components/Dashboard'
import Cart from './Components/Cart'
import "./App.css"
import {ToastContainer} from "react-toastify"
import AdminDashboard from './Components/AdminDashboard'
import UpdateBook from './Components/UpdateBook'
import AddBooks from './Components/AddBooks'
import Account from './Components/Account'
import UpadateProfile from './Components/UpadateProfile'

const App = () => {
     let routes=createBrowserRouter([

      {
        path:"/adminlogin",
        element:<AdminLogin/>
      },
      {
        path:"/admin",
        element:<AdminHome/>,
      },
      {
        path:"/updatebook/:id",
        element:<UpdateBook/>
      },
      {
        path:"/addbooks",
        element:<AddBooks/>
      },
      {
        path:"/",
        element:<UserHome/>,
        children:[
          {
            path:"",
            element:<Dashboard/>
          },
          {
            path:"cart",
            element:<Cart/>
          },  
          {
            path:"userlogin",
            element:<UserLogin/>
         },
          {
           path:"usersignup",
           element:<UserSignin/>
         },
          {
           path:"account",
           element:<Account/>
         },
          {
           path:"update-profile/:id",
           element:<UpadateProfile/>
         }
        ]
      }])
  return (
    <>
    <RouterProvider router={routes}/>
    <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable/>
    </>
  )
}

export default App
