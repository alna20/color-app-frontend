import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllColorsDisplay from './AllColorsDisplay';
import { API_URL_GET, API_URL_POST, calculateColorFrequency } from './utils';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [savedColor, setSavedColor] = useState('');
  const [colorData, setColorFrequency] = useState([]);

  const fetchAllColors = async () => {
    try {
      const response = await axios.get(API_URL_GET);
      setColorFrequency(calculateColorFrequency(response.data));
    } catch (error) {
      console.error('Error fetching all colors:', error);
    }
  };

  const submitColor = async () => {
    try {
      console.log('Before axios.post');
      await axios.post(API_URL_POST, { color });
      console.log('After axios.post');
      setSavedColor(color);
      await fetchAllColors();
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
      <h2 style={styles.heading}>Color Friends</h2>
      <h4 style={{ marginTop: -15 }}>
        Find out how many people have the same favorite color as you!
      </h4>
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
        <AllColorsDisplay colors={colorData} />
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
