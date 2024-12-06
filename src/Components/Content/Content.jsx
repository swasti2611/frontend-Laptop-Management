import React, { useContext, useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {SearchContext} from "../../Context/SearchContext"
const Content = () => {
  const [laptops, setLaptops] = useState([]); // State to hold the laptop data
  const [employeeEmail, setEmployeeEmail] = useState(''); // State to hold the employee's email for assignment
   const {assignId,setAssignedId}=useContext(SearchContext)
   let navigate=useNavigate();
  // Fetch all laptops when the component mounts
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await fetch('https://laptop-management-3xzx.onrender.com/api/getAllLaptops', {
          method: 'GET', // HTTP method
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json', // Ensure proper content type for JSON requests
          },
        });

        const data = await response.json(); // Parse the JSON response

        if (response.status === 200) {
          setLaptops(data.allLaptops); // Update the state with fetched laptops
        } else {
          console.error('Failed to fetch laptops');
        }
      } catch (error) {
        console.error('Error fetching laptops:', error);
      }
    };

    fetchLaptops();
  }, []);

  // Function to handle laptop assignment
  const assignLaptop = async (laptopId) => {
    setAssignedId(laptopId)

    navigate("/assignLaptop")

    // try {
    //   const token = localStorage.getItem('token'); // Get the token from localStorage
    //   const response = await fetch('https://laptop-management-3xzx.onrender.com/api/assignLaptop', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ laptopId, employeeEmail }), // Sending laptopId and employeeEmail to the backend
    //   });

    //   const data = await response.json();
    //   if (response.status === 200) {
    //     alert('Laptop assigned successfully');
    //   } else {
    //     alert('Failed to assign laptop');
    //   }
    // } catch (error) {
    //   console.error('Error assigning laptop:', error);
    // }
  };

  // Function to handle laptop deletion
  const deleteLaptop = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch(`https://laptop-management-3xzx.onrender.com/api/deleteLaptop/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        // Remove the deleted laptop from the state
        setLaptops(laptops.filter((laptop) => laptop._id !== id));
        console.log('Laptop deleted successfully:', data);
      } else {
        console.error('Failed to delete laptop:', data.message);
      }
    } catch (error) {
      console.error('Error deleting laptop:', error);
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="row">
        <div className="col-lg-12">
          <div className="card bg-primary order-card shadow">
            <div className="card-block">
              <div className="row">
                <div className="col-lg-6">
                  <h6 className="m-b-20">Request for new laptop</h6>
                  <div>
                    Click here
                    <i className="fa-regular fa-hand-point-right"></i>
                  </div>
                </div>
                <div className="col-lg-6">
                  <button
                    type="button"
                    className="btn bg-info"
                    style={{
                      marginTop: '20px',
                      marginLeft: '30px',
                      width: '300px',
                      height: '50px',
                    }}
                  >
                    <Link to="/addLaptop">Get New Laptop</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          {laptops.length > 0 ? (
            laptops.map((laptop) => (
              <div className="row justify-content-center" key={laptop._id}>
                <div className="col-md-12 col-xl-11">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 mb-4">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                              alt="Product"
                              style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6 ml-4">
                          <div className="mt-1 mb-0 text-muted medium ml-3">
                            <span>Brand</span>
                            <span className="text-primary"> : </span>
                            <span>{laptop.brand}</span>

                            <div>
                              <span>Model</span>
                              <span className="text-primary"> : </span>
                              <span>{laptop.model}</span>
                            </div>
                          </div>
                          <div className="mb-2 text-muted medium ml-3">
                            <span>Serial Number</span>
                            <span className="text-primary"> : </span>
                            <span>{laptop.serialNumber}</span>
                          </div>
                          <div className="mb-2 text-muted medium ml-3">
                            <span>Condition</span>
                            <span className="text-primary"> : </span>
                            <span>{laptop.condition}</span>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div className="d-flex flex-column mt-4">
                            <button className="btn btn-outline-primary btn-sm ml-3" type="button">
                              <Link to={`/updateLaptop/${laptop._id}`}>Update Laptop</Link>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm mt-2 ml-3"
                              type="button"
                              onClick={() => deleteLaptop(laptop._id)} // Delete button click handler
                            >
                              Remove Laptop
                            </button>
                            {/* Add input for email and assign laptop */}
                            
                            <button
                              className="btn btn-outline-success btn-sm mt-2 ml-3"
                              type="button"
                              onClick={() => assignLaptop(laptop._id)} // Assign button click handler
                            >
                              Assign Laptop
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
            <div>Loading laptops...</div> // Display while the data is being fetched
          )}
        </div>
      </section>
    </div>
  );
};

export default Content;
