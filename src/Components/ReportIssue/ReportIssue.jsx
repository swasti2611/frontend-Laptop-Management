import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../Context/SearchContext";

const ReportIssue = () => {
  const { reportId, setReportId } = useContext(SearchContext); // Get laptopId from context
  const [formData, setFormData] = useState({
    laptopId: reportId || "", // Set laptopId from context or empty string
    description: "",
    priority: "medium",
    status: "open",
  });

  const navigate = useNavigate();

  // Update formData when reportId from context changes
  useEffect(() => {
    if (reportId) {
      setFormData(prevData => ({ ...prevData, laptopId: reportId }));
    }
  }, [reportId]); // Runs when reportId in context changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage

      if (!token) {
        alert("Please log in to report an issue");
        return;
      }

      // Send request to report the issue
      const response = await axios.post(
        'https://laptop-management-3xzx.onrender.com/api/reportissue', // Your backend endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );

      // On success, show an alert and redirect
      alert("Report submitted successfully");
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("Error reporting issue");
    }
  };

  return (
    <div className="container mt-5" style={{ marginLeft: "485px" }}>
      <h2 className="text-center mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        {/* Laptop Selection - Now automatically filled from context */}
        <div className="form-group mb-3">
          <label htmlFor="laptopId" className="form-label">Laptop</label>
          <input
            type="text"
            id="laptopId"
            name="laptopId"
            className="form-control"
            value={formData.laptopId}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* Issue Description */}
        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">Issue Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Describe the issue in detail"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Priority Level */}
        <div className="form-group mb-3">
          <label htmlFor="priority" className="form-label">Priority Level</label>
          <select
            id="priority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Issue Status */}
        <div className="form-group mb-3">
          <label htmlFor="status" className="form-label">Issue Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
