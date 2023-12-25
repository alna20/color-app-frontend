import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllColorsDisplay from './AllColorsDisplay';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [savedColor, setSavedColor] = useState('');

  // State to store all saved colors
  const [colorFrequency, setColorFrequency] = useState({});

  // Function to submit color
  const submitColor = async () => {
    try {
      // Make a POST request to the backend API
      await axios.post('http://localhost:3001/api/colors/submit-color', { color });

      // Retrieve the saved color
      const savedColorResponse = await axios.get('http://localhost:3001/api/colors/saved-color');
      setSavedColor(savedColorResponse.data.color);

      // Fetch all saved colors after submitting a new color
      fetchAllColors();
    } catch (error) {
      console.error('Error submitting color:', error);
    }
  };

  // Function to fetch all saved colors
  const fetchAllColors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/colors/all-colors');
      setColorFrequency(response.data.colorFrequency);
    } catch (error) {
      console.error('Error fetching all colors:', error);
    }
  };

  // Fetch all saved colors when the component mounts
  useEffect(() => {
    fetchAllColors(); // Fetch colors when the component mounts
  
    const intervalId = setInterval(() => {
      fetchAllColors(); // Fetch colors every 100 milliseconds
    }, 100);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Color Friends</h2>
      <h4 style={{marginTop: -15}}>Find out how many people have the same favorite color as you!</h4>
      <div style={styles.form}>
        <label style={styles.label}>Add Favorite Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={styles.input}
        />
        <button onClick={submitColor} style={styles.button}>
          Find Out!
        </button>

        {savedColor && (
          <div style={styles.savedColor}>
            <strong>Your favorite color is:</strong> {savedColor}
          </div>
        )}

        <div style={styles.allColorsSection}>
          <AllColorsDisplay colorFrequency={colorFrequency} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    color: '#333',
  },
  form: {
    maxWidth: '300px',
    margin: 'auto',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  savedColor: {
    marginTop: '20px',
    color: '#333',
  },
  allColorsSection: {
    marginTop: '30px',
  },
};

export default ColorForm;
