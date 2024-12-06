import React, { useState, useEffect, useContext } from "react";
import SearchInput from "../../Pages/LoginPage/SearchInput";
import "../../Style/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {SearchContext} from "../../Context/SearchContext"
const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const [assignedLaptops, setAssignedLaptops] = useState([]); // State to store assigned laptops
const {reportId,setReportId}=useContext(SearchContext)
let navigate=useNavigate()
  // Fetch the user's name from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUserName(user.name);
      fetchAssignedLaptops(user.id); // Fetch assigned laptops after getting the user
    }
  }, []);
  useEffect(()=>{
    console.log(assignedLaptops);
    
  })
  function handleReport(id){
setReportId(id)
navigate("/reportissue")

  }

  // Function to fetch assigned laptops
  const fetchAssignedLaptops = async (employeeId) => {
    try {
      // Get the token from localStorage or wherever it's stored
      const token = localStorage.getItem("token");
  
      const response = await axios.get(`https://laptop-management-3xzx.onrender.com/api/assignments/${employeeId}`, {
        headers: {
          "Authorization": `Bearer ${token}` // Pass the token in the header
        }
      });
  
      if (response.data.success) {
       
        
        setAssignedLaptops(response.data.data); // Set the assigned laptops to state
      }
    } catch (error) {
      console.error("Error fetching assigned laptops:", error);
    }
  };

  return (
    <div>
      <div className="container" style={{ margin: "30px 100px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Home</h1>
          <SearchInput />
        </div>
      </div>

      {/* Welcome Section */}
      <div
        style={{
          minWidth: "173vh",
          position: "relative",
          width: "100%",
          height: "220px",
          backgroundColor: "white",
          marginLeft: "70px",
          borderRadius: "10px",
        }}
      >
        <img
          src="https://i.pinimg.com/736x/10/f2/c7/10f2c780c7afe32ca9678d852e302843.jpg"
          style={{
            position: "absolute",
            width: "304px",
            height: "221px",
            objectFit: "cover",
            left: "71%",
            padding: "10px",
          }}
        />
        <h1
          style={{
            position: "absolute",
            color: "linear-gradient(45deg, #3a3a52, #2b2d42)",
            left: "6%",
            top: "18%",
            fontWeight: "500",
            fontSize: "45px",
          }}
        >
          Welcome Back {userName}!
        </h1>
        <h3
          style={{
            position: "absolute",
            color: "gray",
            left: "6%",
            top: "58%",
            fontWeight: "200",
            fontSize: "20px",
          }}
        >
          You have a task assigned to finish today
        </h3>
      </div>

      {/* Assigned Laptops Section */}
<div className="container" style={{ marginTop: "30px" }}>
  <div className="row">
  {/* Request Section */}
  
        <div className="col-lg-12">
          <div
            style={{
              width: "700px",
              height: "200px",
              backgroundColor: "white",
              position: "absolute",
              left: "70%",
              top: "70px",
            }}
          >
            <div className="row">
              <div className="col-lg-6" >
                <div className="container" style={{ marginTop: "20px", marginLeft:'30px' }}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card bg-primary order-card shadow">
                        <div className="card-block">
                          <h6 className="m-b-20">Request for new laptop</h6>
                          <div>
                            Click here{" "}
                            <i className="fa-regular fa-hand-point-down"></i>
                          </div>
                          <button
                            type="button"
                            className="btn bg-info"
                            style={{ marginTop: "20px", marginLeft: "30px" }}
                          >
                            <Link to="/request-laptop">Get New Laptop</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
   <div className="col-lg-12 col-xl-12">
   <div className="row">
   {assignedLaptops.length > 0 ? (
      assignedLaptops.map((laptop) => (
        <div className="col-lg-" key={laptop.assignmentId} >
          <div
            className="card shadow-0 border rounded-3"
            style={{ width: "755px", marginTop:"10px", padding:'30px',}}
          >
            <div className="card-body" >
              <div className="row">

                <div className="col-md-12 col-lg-3 col-xl-3">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img
                      src="https://i.pinimg.com/736x/d0/70/07/d070075c1d5b8d094d43a36ea431d44c.jpg"
                      alt="Product"
                      style={{
                        width: "200px",
                        height: "160px",
                        objectFit: "cover",
                        padding: "10px",
                      borderRadius:'20px'
                      }}
                    />
                  </div>
                </div>
                <div className=" col-lg-9 col-xl-9 " >
                <div className="row">
                  <div className="col-6">
                  <div className="container" style={{marginLeft:"93px" }}>
                  <div className="mt-1 mb-0 text-muted medium" style={{fontSize:'20px'}}>
                    <span>Brand</span>
                    <span className="text-primary"> : </span>
                    <span>{laptop.brand}</span>
                  </div>
                  <div className="mb-2 text-muted medium" style={{fontSize:'20px'}}>
                    <span>Model</span>
                    <span className="text-primary"> : </span>
                    <span>{laptop.model}</span>
                  </div>
                  <div className="mb-2 text-muted medium" style={{fontSize:'20px'}}>
                    <span>Serial Number</span>
                    <span className="text-primary"> : </span>
                    <span>{laptop.serialNumber}</span>
                  </div>
                  <div className="mb-2 text-muted medium" style={{fontSize:'20px'}}>
                    <span>Condition</span>
                    <span className="text-primary"> : </span>
                    <span>{laptop.condition}</span>
                  </div>
                  </div>
                  </div>
                  <div className="col-6">
                  <button
                  onClick={()=>handleReport(laptop._id)}
                            type="button"
                            className="btn bg-info"
                            style={{ marginTop: "30px", marginLeft: "40px",width:'200px' }}
                          >
                          Report an issue
                            {/* <Link to="/request-laptop">report an issue</Link> */}
                          </button>
                  </div>
                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No laptops assigned yet.</p>
    )}
   </div>
   </div>
  </div>
</div>


    
 
  );
};

export default UserDashboard;
