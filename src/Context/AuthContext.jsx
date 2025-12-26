import React, { useState,createContext } from 'react'

export let Auth=createContext()
const AuthContext = ({children}) => {
      let [user , setUser] = useState(()=>{
    return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
   })
     const [cartCount, setCartCount] = useState(0)
   
    let Login = (loginDetails)=>{
        setUser(loginDetails)
        localStorage.setItem('user' ,JSON.stringify(loginDetails) )
    }
    console.log(user);

    let logout = ()=>{
        setUser(null)
        localStorage.removeItem('user')
    }
  return (
    
      <Auth.Provider value={{Login,user,logout,cartCount,setCartCount}}>{children}</Auth.Provider>
    
  )
}

export default AuthContext
