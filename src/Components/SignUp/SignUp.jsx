import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate hook
import axios from 'axios'; // Import axios for making API requests

const SignUp = () => {
  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Department: '',
    Role: 'user', // Default role
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://laptop-management-3xzx.onrender.com/api/addEmp', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        
        // Clear the form after successful signup
        setFormData({
          Name: '',
          LastName: '',
          Email: '',
          Password: '',
          ConfirmPassword: '',
          Department: '',
          Role: 'user',
        });

        // Redirect the user to the login page after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 1000);  // Redirect after 2 seconds to show the success message first
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      const errorResponse = error.response?.data?.message || 'Something went wrong';
      setErrorMessage(errorResponse);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ width: "600px", position: 'absolute', left: '35%', top: '15%' }}>
      <div className="col-12 shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Sign Up</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group mb-3">
            <label htmlFor="Name" className="form-label">First Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              className="form-control"
              placeholder="Enter your first name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group mb-3">
            <label htmlFor="LastName" className="form-label">Last Name</label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              className="form-control"
              placeholder="Enter your last name"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="Email" className="form-label">Email Address</label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-3">
            <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Department */}
          <div className="form-group mb-3">
            <label htmlFor="Department" className="form-label">Department</label>
            <input
              type="text"
              id="Department"
              name="Department"
              className="form-control"
              placeholder="Enter your department"
              value={formData.Department}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="form-group mb-3">
            <label htmlFor="Role" className="form-label">Role</label>
            <select
              id="Role"
              name="Role"
              className="form-control"
              value={formData.Role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-primary">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
