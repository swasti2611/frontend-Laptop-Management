import React, { useState } from "react";
import "./../../Style/Login.css"; // Adjust the path as needed
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make the POST request to the backend
      const response = await axios.post("https://laptop-management-3xzx.onrender.com/api/login", formData);

      if (response.data.success) {
        // Store the JWT token and user data in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect based on user role
        if (response.data.user.role === "admin") {
          navigate("/adminboard");
        } else {
          navigate("/"); // Redirect to the home page if not an admin
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ width: "600px", position: "absolute", left: "35%", top: "15%" }}>
      <div className="col-lg-12 shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
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

        {/* Forgot Password & Sign Up Links */}
        <p className="text-center mt-3">
          <a href="#" className="text-secondary">Forgot Password?</a>
        </p>
        <p className="text-center">
          Don't have an account? <Link to="/signup" className="text-primary">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
