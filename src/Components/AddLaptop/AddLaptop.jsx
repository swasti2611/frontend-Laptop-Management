import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLaptop = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    status: "available", // Default status
    purchaseDate: "",
    image: null, // Store the image file here
  });
  const [error, setError] = useState(null); // To store errors if any
  const navigate = useNavigate(); // For redirecting after success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Create FormData instance
    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("serialNumber", formData.serialNumber);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("purchaseDate", formData.purchaseDate);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post("https://laptop-management-3xzx.onrender.com/api/addLaptop", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Important for image upload
        },
      });

      console.log("response*****", response);

      if (response.data.success) {
        alert("Laptop added successfully!");
        navigate("/adminboard");
      } else {
        setError(response.data.message || "Error adding laptop");
      }
    } catch (err) {
      console.error("Error adding laptop:", err);
      setError(err.response?.data?.message || "Error adding laptop");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ width: "600px", position: 'absolute', marginLeft: '800px', marginTop: "40px" }}>
      <div className="col-12 shadow-lg rounded">
        <h2 className="text-center mb-4">Add Laptop</h2>
        <form onSubmit={handleSubmit}>
          {/* Brand */}
          <div className="form-group mb-3">
            <label htmlFor="brand" className="form-label">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="form-control"
              placeholder="Enter laptop brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* Model */}
          <div className="form-group mb-3">
            <label htmlFor="model" className="form-label">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              placeholder="Enter laptop model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          {/* Serial Number */}
          <div className="form-group mb-3">
            <label htmlFor="serialNumber" className="form-label">Serial Number</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              className="form-control"
              placeholder="Enter laptop serial number"
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="form-group mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Purchase Date */}
          <div className="form-group mb-3">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              className="form-control"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-group mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Add Laptop
          </button>

          {/* Error Message */}
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddLaptop;
