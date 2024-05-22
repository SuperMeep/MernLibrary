import React, { useState } from "react";

function BookFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
    onFilter(!showAvailableOnly);
  };

  return (
    <div className="searchField">
      <input
        className="searchBar"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <label className="availabilityLabel">
        Available Only
        <input
          className="availability"
          type="checkbox"
          checked={showAvailableOnly}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
}

export default BookFilter;
