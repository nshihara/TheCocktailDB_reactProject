import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Button } from 'react-bootstrap';
import Popup from './Popup'; // Import the Popup component

function CocktailDetails() {
  const [cocktailData, setCocktailData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [selectedPopupCocktail, setSelectedPopupCocktail] = useState(null);
  const [ingredientDetails, setIngredientDetails] = useState([]);

  useEffect(() => {
    // Fetch ingredient details for each cocktail on component load
    if (selectedCocktail) {
      fetchIngredientDetails(selectedCocktail);
    }
  }, [selectedCocktail]);

  const handleSearchButtonClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

      if (searchTerm) {
        const response = await axios.get(apiUrl);

        if (response.data.drinks === null) {
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

  const fetchIngredientDetails = async (cocktail) => {
    try {
      const ingredientList = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = cocktail[`strIngredient${i}`];
        if (ingredientName) {
          const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`;
          const response = await axios.get(apiUrl);
          ingredientList.push(response.data.ingredients[0]);
        } else {
          break;
        }
      }
      setIngredientDetails(ingredientList);
    } catch (error) {
      console.error('Error fetching ingredient details:', error);
    }
  };

  const openPopupForCocktail = (cocktail) => {
    setSelectedCocktail(cocktail);
    setSelectedPopupCocktail(cocktail);
    // Fetch the ingredients for the selected cocktail
    fetchIngredientDetails(cocktail);
  };

  const closePopupForCocktail = () => {
    setSelectedPopupCocktail(null);
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
                  {!showDetails[cocktail.idDrink] && (
                    <span
                      className={`see-more-word ${showDetails[cocktail.idDrink] ? 'see-less' : 'see-more'}`}
                      onClick={() => toggleDetails(cocktail.idDrink)}
                    >
                      See More
                    </span>
                  )}
                </Card.Text>
                <Button
                  onClick={() => openPopupForCocktail(cocktail)}
                  className="view-popup-button"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
            {selectedPopupCocktail === cocktail && (
              <Popup
                cocktail={selectedPopupCocktail}
                ingredientDetails={ingredientDetails}
                handleClose={closePopupForCocktail}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CocktailDetails;
