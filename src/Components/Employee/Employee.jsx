// Employee.js
import React, { useEffect, useState } from 'react';
import { useSearch } from "../../Context/SearchContext"; // Import the custom hook for search context
import SearchInput from "../../Pages/LoginPage/SearchInput" // Import SearchInput component
import '.././../Style/Employee.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { searchQuery } = useSearch(); // Get the search query from context

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://laptop-management-3xzx.onrender.com/api/allEmp', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setEmployees(data.allEmployee);
          setFilteredEmployees(data.allEmployee);
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []); // Run once when component mounts

  useEffect(() => {
    // Filter employees whenever the search query changes
    if (!searchQuery.trim()) {
      setFilteredEmployees(employees); // If no search query, show all employees
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.Email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchQuery, employees]); // Re-run filter whenever searchQuery or employees change

  return (
    <div>
      
      <table className="table align-middle bg-white emp-table" style={{ marginTop: '3em', marginLeft: '20px' }}>
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt="Avatar"
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{employee.Name} {employee.LastName}</p>
                      <p className="text-muted mb-0">{employee.Email}</p>
                    </div>
                  </div>
                </td>
                <td>{employee.Department}</td>
                <td>
                  <span className="badge badge-success rounded-pill d-inline">Active</span>
                </td>
                <td>{employee.Role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
