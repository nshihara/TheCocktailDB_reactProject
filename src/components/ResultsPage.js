import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Button } from 'react-bootstrap';
import Popup from './Popup'; // Import the Popup component

function ResultsPage() {
  const { searchTerm } = useParams();
  const [cocktailData, setCocktailData] = useState([]);
  // Rest of your ResultsPage component code...
}
