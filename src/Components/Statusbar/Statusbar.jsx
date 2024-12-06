import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../Style/Statusbar.css';

const Statusbar = () => {
  // Step 2: Set up state to store laptop counts
  const [availableLaptops, setAvailableLaptops] = useState(0);
  const [assignedLaptops, setAssignedLaptops] = useState(0);
  const [maintenanceLaptops, setMaintenanceLaptops] = useState(0);

  // Step 3: Fetch laptop count by status when the component loads
  useEffect(() => {
    const fetchLaptopCountByStatus = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://laptop-management-3xzx.onrender.com/api/laptopCountByStatus', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const { availableLaptops, assignedLaptops, maintenanceLaptops } = response.data;
        
        // Step 4: Update state with fetched laptop counts
        setAvailableLaptops(availableLaptops);
        setAssignedLaptops(assignedLaptops);
        setMaintenanceLaptops(maintenanceLaptops);
        
      } catch (error) {
        console.error('Error fetching laptop count:', error);
      }
    };

    fetchLaptopCountByStatus();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Step 5: Render the UI with the updated laptop counts
  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row">
        {/* Available Laptops */}
        <div className="col-md-6 mb-4">
          <div className="card-counter success">
            <i className="fa fa-database"></i>
            <span className="count-numbers">{availableLaptops}</span>
            <span className="count-name text-muted medium">Available laptops</span>
          </div>
        </div>

        {/* Assigned Laptops */}
        <div className="col-md-6 mb-4">
          <div className="card-counter danger">
            <i className="fa fa-ticket"></i>
            <span className="count-numbers">{assignedLaptops}</span>
            <span className="count-name text-muted medium">Assigned laptops</span>
          </div>
        </div>

        {/* Laptops under Maintenance */}
        <div className="col-md-6 mb-4">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{maintenanceLaptops}</span>
            <span className="count-name text-muted medium">Laptops under maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statusbar;
