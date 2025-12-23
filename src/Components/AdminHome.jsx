import React, { useState } from 'react'
import AdminDashboard from './AdminDashboard'
import AdminNavbar from './AdminNavbar'

const AdminHome = () => {
    const [search, setSearch] = useState("")
  return (
    <div>
      <AdminNavbar setSearch={setSearch} />
      <AdminDashboard search={search}/>
    </div>
  )
}

export default AdminHome
