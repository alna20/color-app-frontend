import React from 'react';

const ColorPalette = ({ colorFrequency }) => {
  // Extract unique colors and their frequencies
  const colors = Object.keys(colorFrequency);
  
  return (
    <div style={styles.palettesContainer}>
      {/* Six Lines of Color Palettes */}
      {Array.from({ length: 4 }).map((_, lineIndex) => (
        <div key={lineIndex} style={styles.palette}>
          {Array.from({ length: 6 }).map((_, circleIndex) => {
            const colorIndex = lineIndex * 6 + circleIndex;
            const color = colors[colorIndex];
            const frequency = colorFrequency[color] || 0;

            return (
              <div key={circleIndex} style={styles.colorCircle}>
                <div style={styles.colorText}>{frequency}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const styles = {
  palettesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  palette: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  colorCircle: {
    position: 'relative',
    width: '90px', // 50% bigger
    height: '90px', // 50% bigger
    borderRadius: '50%',
    border: '2px solid #ddd', // Light gray border
    backgroundColor: '#f0f0f0', // Light gray background color
  },
  colorText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '16px',
    color: '#333',
  },
};

export default ColorPalette;
