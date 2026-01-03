import React from 'react';

const ProgressBar = ({ bgGradientColor, progress }) => {
  const containerStyles = {
    height: 5,
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgGradientColor,
    backgroundImage: 'linear-gradient(90deg, #72C2FD 0%, #71F5BF 100%)',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className="progress-bar" style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
