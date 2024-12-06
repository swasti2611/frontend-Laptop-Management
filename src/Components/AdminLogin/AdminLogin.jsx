import React, { useState } from "react";
import "./../../Style/Login.css"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Make the POST request for admin login
      const response = await axios.post("https://laptop-management-3xzx.onrender.com/api/login", formData);

      if (response.data.success) {
        // Store the JWT token and user data in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect to the admin dashboard after successful login
        navigate("/adminboard"); // Redirect to admin dashboard
      } else {
        // If the response indicates a non-admin user or invalid credentials
        setError(response.data.message);
        alert("You are not an admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in. Please try again.");
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ width: "1000px", position: "absolute", left: "800px", top: "200px" }}>
      <div className="col-lg-12 shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          {/* Error Message */}
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
