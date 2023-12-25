// frontend/src/components/AllColorsDisplay.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

const AllColorsDisplay = ({ allColors }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div style={{ ...styles.allColorsContainer, ...fadeIn }}>
      <h3 style={styles.heading}>All Saved Colors</h3>
      <div style={styles.colorGrid}>
        {allColors.map((color, index) => (
          <animated.div key={index} style={{ ...styles.colorSquare, backgroundColor: color }}>
            <span style={styles.colorText}>{color}</span>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
};

const styles = {
  allColorsContainer: {
    marginTop: '20px',
  },
  heading: {
    color: '#333',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '10px',
  },
  colorSquare: {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  colorText: {
    textAlign: 'center',
  },
};

export default AllColorsDisplay;
