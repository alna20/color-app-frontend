import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllColorsDisplay from './AllColorsDisplay';
import ColorPalette from './ColorPalette';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [savedColor, setSavedColor] = useState('');
  const [allColors, setAllColors] = useState({});

  const submitColor = async () => {
    try {
      await axios.post('http://localhost:3001/api/colors/submit-color', { color });
      const savedColorResponse = await axios.get('http://localhost:3001/api/colors/saved-color');
      setSavedColor(savedColorResponse.data.color);
      fetchAllColors();
    } catch (error) {
      console.error('Error submitting color:', error);
    }
  };

  const fetchAllColors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/colors/all-colors');
      setAllColors(response.data.colorFrequency);
    } catch (error) {
      console.error('Error fetching all colors:', error);
    }
  };

  useEffect(() => {
    fetchAllColors();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Color Submission Form</h2>
      <div style={styles.form}>
        <label style={styles.label}>Favorite Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={styles.input}
        />
        <button onClick={submitColor} style={styles.button}>
          Submit Color
        </button>

        {savedColor && (
          <div>
            <div style={styles.savedColor}>
              <strong>Saved Color:</strong> {savedColor}
            </div>

            {/* Pass allColors as a prop to ColorPalette component */}
            <ColorPalette colorFrequency={allColors} />
          </div>
        )}
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
};

export default ColorForm;
