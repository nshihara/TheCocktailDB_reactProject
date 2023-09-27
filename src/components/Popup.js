import React, { useEffect, useState } from "react";

const Popup = ({ cocktail, ingredientDetails, handleClose }) => {
  const [ingredientImages, setIngredientImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ingredient images when ingredientDetails change
    fetchIngredientImages();
  }, [ingredientDetails]);

  const fetchIngredientImages = async () => {
    const images = {};
    setLoading(true);

    for (const ingredient of ingredientDetails) {
      const ingredientName = ingredient.strIngredient.toLowerCase();
      const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`;

      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          images[ingredientName] = imageUrl;
        }
      } catch (error) {
        console.error(`Error fetching image for ${ingredientName}: ${error}`);
      }
    }

    setIngredientImages(images);
    setLoading(false);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {cocktail && (
          <>
            <h2 className="topic">{cocktail.strDrink}</h2>
           
            <div  className="details-i"> <div><strong>Category:</strong></div> <div> {cocktail.strCategory}</div></div>
            <div  className="details-i"><div><strong>Glass:</strong></div> <div> {cocktail.strGlass}</div></div>
            <div  className="details-i"><div><strong >Instructions:</strong></div> <div  className="instructions"> {cocktail.strInstructions}</div></div>
          
            
            <h3>{cocktail.strDrink} Ingredients:</h3>
            {loading ? (
              <div className="loading-spinner-2">
                Loading...
              </div>
            ) : (
              <ul>
                {ingredientDetails.map((ingredient, index) => (
                  <div key={index} className="image-container">
                    <strong>{ingredient.strIngredient}:</strong>{" "}
                    {/* {ingredient.strMeasure} {ingredient.strDescription} */}
                    {ingredientImages[ingredient.strIngredient.toLowerCase()] && (
                      <img
                        src={ingredientImages[ingredient.strIngredient.toLowerCase()]}
                        alt={`${ingredient.strIngredient} Image`}
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                  </div>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
