import React from 'react';
import './../../Style/Sidebar.css';
import Employee from '../Employee/Employee';
import Sidebar from '../../Components/SideBar/Sidebar';
import Content from '../Content/Content';
import Statusbar from '../Statusbar/Statusbar';
import SearchInput from '../../Pages/LoginPage/SearchInput';

const AdminDashboard = () => {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: '#eee', width: '100%', marginTop: '' }}
    >
      <div className="row ">
      <div className="container" style={{ margin: "30px 10px" }}>
  <div className="d-flex justify-content-between align-items-center">
    <h1>Dashboard</h1>
    <SearchInput />
  </div>
</div>

        {/* Main Content Section */}
        <div className="col-lg-12 col-sm-12">
          <div className="row">
            {/* Content Section */}
            <div className="col-lg-6 col-sm-12">
             
              <Content />
            </div>

            {/* Employee Section */}
            <div className="col-lg-6 col-sm-12">
              <Statusbar />
              <Employee />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
