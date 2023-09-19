import React from 'react';
import Header from './components/header';
import CocktailDetails from './components/CocktailDetails'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Header /> 
    
      <div className="details">
        <CocktailDetails />
      </div>
    </div>
  );
}

export default App;
