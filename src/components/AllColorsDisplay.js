import React from 'react';

const AllColorsDisplay = ({ colors }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Explore Global Color Preferences</h2>
      <div style={styles.colorList}>
        {colors.map(({ colorName, colorFrequency }) => (
          <div key={colorName} style={getCircleStyle(colorName)}>
            <div style={getDynamicTextStyle(colorName)}>{colorName.toUpperCase()}</div>
            <div style={getDynamicVoteStyle(colorName)}>{colorFrequency} {colorFrequency === 1 ? 'Vote' : 'Votes'}</div>
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

const getDynamicTextStyle = (colorName) => {
  const textColor = isColorLight(colorName) ? '#333' : '#fff';
  return {
    ...styles.colorText,
    color: textColor,
  };
};

const getDynamicVoteStyle = (colorName) => {
  const isLight = isColorLight(colorName);
  return {
    ...styles.colorFrequency,
    color: isLight ? '#333' : '#fff',
  };
};

const isColorLight = (color) => {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128;
};

const styles = {
  container: {
    marginTop: '20px',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  colorList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorItem: {
    width: '120px',
    height: '120px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  colorText: {
    fontSize: '18px',
    marginBottom: '5px',
    textAlign: 'center',
  },
  colorFrequency: {
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default AllColorsDisplay;
