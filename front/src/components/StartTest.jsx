import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartTest() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the first test in the sequence
    navigate('/test/reaction-time');
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      maxWidth: '500px',
      margin: '100px auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>Welcome to your Personalized Attention Test</h1>
      <p>
        You will take a series of tests to measure your attention profile.
        Click the button below to start.
      </p>
      <button onClick={handleStart}
        style={{
          fontSize: '20px',
          padding: '12px 30px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
        Start Test
      </button>
    </div>
  );
}

export default StartTest;
