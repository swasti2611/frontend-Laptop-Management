import React, { useContext, useState } from "react";
import axios from "axios";
import { SearchContext } from "../../Context/SearchContext";

const AssignLaptop = () => {
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { assignId } = useContext(SearchContext); // Get assigned laptop ID from context
console.log(assignId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://laptop-management-3xzx.onrender.com/api/assignLaptop",
        { Email, laptopId: assignId }, // Pass laptop ID and email
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to headers
            "Content-Type": "application/json", // Specify content type
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error assigning laptop. Please try again.");
      }
    }
  };

  return (
    <div style={{ marginLeft: "700px", marginTop: "50px" }}>
      <h2>Assign Laptop</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Assign</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignLaptop;
