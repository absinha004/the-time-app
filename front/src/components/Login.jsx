import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple login handler (replace with real auth)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    // For prototyping, log in any non-empty user/pass combo
    setError('');
    // Redirect to start test page after login
    navigate('/start-test');
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          fontSize: '18px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
