import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';

function CocktailDetails() {
    const [cocktailData, setCocktailData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetails, setShowDetails] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSearchButtonClick = async () => {
      try {
        setIsLoading(true);
        setError(null); // Clear any previous errors
  
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  
        if (searchTerm) {
          const response = await axios.get(apiUrl);
  
          if (response.data.drinks === null) {
            // If no drinks were found, set an error message and clear the data
            setError("No drinks found for the given search term.");
            setCocktailData([]);
          } else {
            const initialDetailsState = {};
            response.data.drinks.forEach((cocktail) => {
              initialDetailsState[cocktail.idDrink] = false;
            });
  
            setCocktailData(response.data.drinks);
            setShowDetails(initialDetailsState);
          }
        }
  
        setIsLoading(false);
      } catch (error) {
        setError("Please check your input or try again...");
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };
  

  const toggleDetails = (idDrink) => {
    setShowDetails({
      ...showDetails,
      [idDrink]: !showDetails[idDrink],
    });
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
        <Button variant="primary" onClick={handleSearchButtonClick}>Search</Button>
      </div>
      {isLoading && (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="container-grid">
        {cocktailData.map((cocktail) => (
          <div key={cocktail.idDrink} className="container-item">
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="text-center">{cocktail.strDrink}</Card.Title>
                <Card.Text className="description">
                  {showDetails[cocktail.idDrink]
                    ? cocktail.strInstructions
                    : `${cocktail.strInstructions.substring(0, 100)}...`}
                </Card.Text>
                <Button
                  onClick={() => toggleDetails(cocktail.idDrink)}
                  className={`see-more-button ${showDetails[cocktail.idDrink] ? 'see-less' : 'see-more'}`}
                >
                  {showDetails[cocktail.idDrink] ? 'See Less' : 'See More'}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CocktailDetails;
