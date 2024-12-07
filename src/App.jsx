// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
// import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
// import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import UserDashbord from './Components/UserDashboard/UserDashbord';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import AddLaptop from './Components/AddLaptop/AddLaptop';
import ReportIssue from './Components/ReportIssue/ReportIssue';
import RequestLaptop from './Components/RequestLaptop/RequestLaptop';
import UpdateLaptop from './Components/UpdateLaptop/UpdateLaptop';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import Assignlaptop from './Components/AssignLaptop/Assignlaptop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Sidebar */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route
          path="/"
          element={
            <Layout>
              <UserDashbord/>
            </Layout>
          }
        />
        <Route
          path="/request-laptop"
          element={
            <Layout>
             <RequestLaptop/>
            </Layout>
          }
        />
        <Route
          path="/addLaptop"
          element={
            <Layout>
             <AddLaptop/>
            </Layout>
          }
        />
        <Route
          path="/updateLaptop/:laptopId"
          element={
            <Layout>
         <UpdateLaptop/>
            </Layout>
          }
        />
        <Route
          path="/reportissue"
          element={
            <Layout>
            <ReportIssue/>
            </Layout>
          }
        />

<Route
          path="/assignLaptop"
          element={
            <Layout>
           <Assignlaptop/>
            </Layout>
          }
        />
        <Route
          path="/adminboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route
          path="/adminlogin"
          element={
            <Layout>
              <AdminLogin/>
            </Layout>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
