import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchButtonClick = () => {
    // Perform the search and store the results in a state
    // You can define the search logic here

    // After performing the search, navigate to the results page
    navigate(`/results/${searchTerm}`);
  };

  return (
    <div>
      <h1>Welcome to TheCocktailDB</h1>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Enter cocktail name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearchButtonClick}>Search</button>
      </div>
    </div>
  );
}

export default SearchPage;
