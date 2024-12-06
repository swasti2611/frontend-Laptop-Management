import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateLaptop = () => {
  const navigate=useNavigate()
  const { laptopId } = useParams(); // Retrieve the laptopId from the URL
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    serialNumber: '',
    status: '',
    purchaseDate: '',
    image: '', // Optional field for the image
  });

  useEffect(() => {
    // Fetch existing laptop details by ID
    const fetchLaptopDetails = async () => {
      try {
        const response = await fetch(`https://laptop-management-3xzx.onrender.com/api/laptops/${laptopId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const laptop = await response.json();
          setFormData({
            brand: laptop.brand || '',
            model: laptop.model || '',
            serialNumber: laptop.serialNumber || '',
            status: laptop.status || '',
            purchaseDate: laptop.purchaseDate || '',
            image: laptop.image || '',
          });
        } else {
          console.error('Failed to fetch laptop details');
        }
      } catch (error) {
        console.error('Error fetching laptop:', error);
      }
    };

    fetchLaptopDetails();
  }, [laptopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLaptop = { ...formData };

    try {
      const response = await fetch(`https://laptop-management-3xzx.onrender.com/api/updateLaptop/${laptopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedLaptop),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Laptop updated successfully:', result);
        navigate("/adminboard")
        alert('Laptop updated successfully!');
        
      } else {
        console.error('Error updating laptop:', result.message);
        alert(`Error: ${result.message}`);
        
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="container" style={{ width: '600px', position: 'absolute', marginLeft: '800px', marginTop: '90px' }}>
      <h3>Update Laptop</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Serial Number</label>
          <input
            type="text"
            className="form-control"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Purchase Date</label>
          <input
            type="date"
            className="form-control"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image (Optional)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Laptop
        </button>
      </form>
    </div>
  );
};

export default UpdateLaptop;
