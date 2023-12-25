import React from 'react';

const AllColorsDisplay = ({ colorFrequency }) => {
  // Convert keys to lowercase
  const lowercaseColorFrequency = Object.fromEntries(
    Object.entries(colorFrequency).map(([key, value]) => [key.toLowerCase(), value])
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Global Favorite Color Board</h3>
      <div style={styles.colorList}>
        {Object.entries(lowercaseColorFrequency).map(([color, frequency]) => (
          <div key={color} style={getCircleStyle(color)}>
            <div style={styles.colorText}>
              {color.toUpperCase()} - {frequency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCircleStyle = (color) => ({
  ...styles.colorItem,
  backgroundColor: color,
  border: color.toLowerCase() === 'white' ? '2px solid black' : 'none',
});

const styles = {
  container: {
    marginTop: '20px',
  },
  heading: {
    color: '#333',
  },
  colorList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  colorItem: {
    width: '100px',
    height: '100px',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '14px',
  },
  colorText: {
    fontSize: '12px',
    textAlign: 'center',
  },
};

export default AllColorsDisplay;
