// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the SearchContext
export const SearchContext = createContext();

// Create a provider to wrap the components
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
const[assignId,setAssignedId]=useState(null)
const [reportId,setReportId]=useState(null)
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery,assignId,setAssignedId ,reportId,setReportId}}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use search context
export const useSearch = () => {
  return useContext(SearchContext);
};
