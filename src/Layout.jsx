// Layout.js
import React from 'react';
import Sidebar from './Components/SideBar/Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-lg-2 col-sm-12">
        <Sidebar/>
        </div>
        {/* Main Content Section */}
        <div className="col-lg-10 col-sm-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
