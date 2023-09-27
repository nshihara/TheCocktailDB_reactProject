import React from 'react';
import coc from './coc.png'; 


function Header() {
  return (
    <header>
      <div className="left">
        <img src={coc} alt="Cocktail" width="60" height="60" />
        <span className="cocktail-text">The Cocktail</span>
      </div>
      <div className="right">
        <nav>
          <ul>
            <a href="/" className="home-button">Home</a>
          
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

