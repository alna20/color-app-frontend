import React from 'react';

const AllColorsDisplay = ({ colors }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Global Favorite Color Board</h3>
      <div style={styles.colorList}>
        {colors.map(({ colorName, colorFrequency }) => (
          <div key={colorName} style={getCircleStyle(colorName)}>
            <div style={styles.colorText}>
              {colorName.toUpperCase()} - {colorFrequency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCircleStyle = (colorName) => ({
  ...styles.colorItem,
  backgroundColor: colorName,
  border: colorName.toLowerCase() === 'white' ? '2px solid black' : 'none',
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
