import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllColorsDisplay from './AllColorsDisplay';
import { API_URL_GET, API_URL_POST, calculateColorFrequency, isColorInArray } from './utils';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [savedColor, setSavedColor] = useState('');
  const [colorData, setColorData] = useState([]);

  const fetchAllColors = async () => {
    try {
      const response = await axios.get(API_URL_GET);
      setColorData(calculateColorFrequency(response.data));
    } catch (error) {
      console.error('Error fetching all colors:', error);
    }
  };

  const submitColor = async () => {
    try {
      const isColorValid = isColorInArray(color);
      
      if (isColorValid) {
        await axios.post(API_URL_POST, { color });
        setSavedColor(color);
        await fetchAllColors();
        setColor('');
      } else {
        setColor('');
        alert("You're exotic! Try a common color.");
      }
    } catch (error) {
      console.error('Error submitting color:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllColors();
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Color Connections</h1>
      <p style={styles.subHeading}>
        Discover how many others have the same favorite color as you!
      </p>
      <div style={styles.formContainer}>
        <label style={styles.label}>What's Your Favorite Color?</label>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={styles.input}
            placeholder="Enter your favorite color..."
          />
          <button
            onClick={submitColor}
            style={{ ...styles.button, ...(color && styles.buttonHover) }}
          >
            Find Out!
          </button>
        </div>

        {savedColor && (
          <div style={styles.savedColor}>
            <strong>Your vibrant choice:</strong> {savedColor}
          </div>
        )}
        <AllColorsDisplay colors={colorData} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%', // Set the form container to 100% width
    maxWidth: '800px', // Add a maximum width if needed
    margin: 'auto', // Center the form container
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#555',
    fontSize: '1.2rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '5px 0 0 5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  savedColor: {
    marginTop: '20px',
    color: '#333',
    fontSize: '1.2rem',
  },
};

export default ColorForm;
