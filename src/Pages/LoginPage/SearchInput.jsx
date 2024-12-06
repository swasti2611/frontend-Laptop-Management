// SearchInput.js
import React from 'react';
import { useSearch } from "../../Context/SearchContext"// Import the custom hook
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // Use context to access search query and setter

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query in context
  };

  return (
    <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
      <span className="input-group-text">
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search by name or email"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange} // Handle input changes
      />
    </div>
  );
};

export default SearchInput;
