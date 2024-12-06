import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const RequestLaptop = () => {
    const [formData, setFormData] = useState({
        employeeName: "",
        department: "",
        reason: "",
        specifications: "",
        priority: "",
        submissionDate: "",
      });
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Add your submission logic here, like sending data to an API
      };
  return (
    <div>
       <div className="container mt-5"  style={{marginLeft:"485px"}}>
      <h2 className="text-center mb-4">Request a New Laptop</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        {/* Employee Name */}
        <div className="form-group mb-3">
          <label htmlFor="employeeName" className="form-label">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            className="form-control"
            placeholder="Enter your name"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div className="form-group mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reason for Request */}
        <div className="form-group mb-3">
          <label htmlFor="reason" className="form-label">Reason for Request</label>
          <textarea
            id="reason"
            name="reason"
            className="form-control"
            placeholder="Explain why you need a new laptop"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Preferred Specifications */}
        <div className="form-group mb-3">
          <label htmlFor="specifications" className="form-label">Preferred Specifications (Optional)</label>
          <textarea
            id="specifications"
            name="specifications"
            className="form-control"
            placeholder="Mention any specific requirements (e.g., RAM, storage, OS)"
            rows="3"
            value={formData.specifications}
            onChange={handleChange}
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
            <option value="" disabled>Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submission Date */}
        <div className="form-group mb-3">
          <label htmlFor="submissionDate" className="form-label">Submission Date</label>
          <input
            type="date"
            id="submissionDate"
            name="submissionDate"
            className="form-control"
            value={formData.submissionDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit Request
        </button>
      </form>
    </div>
    </div>
  )
}

export default RequestLaptop
