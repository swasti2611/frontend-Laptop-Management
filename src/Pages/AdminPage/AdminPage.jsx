import React from 'react'


import AdminDashboard from "./../../Components/AdminDashboard/AdminDashboard"
import Sidebar from '../../Components/SideBar/Sidebar'

const AdminPage = () => {
  return (
    <div className="container-fluid">
      {/* Row Section */}
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-lg-2 col-sm-12">
         <Sidebar/>
        </div>
        {/* Admin Dashboard Section */}
        <div className="col-lg-10 col-sm-12"   >
          <AdminDashboard />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
