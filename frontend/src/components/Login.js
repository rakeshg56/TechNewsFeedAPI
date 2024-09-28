import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import '../styles/Login.css'; // Import the CSS file

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // API call to your backend for login
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Assuming the response contains the JWT token
      const { token } = response.data;

      // Call loginUser to save token
      loginUser(token);

      // Navigate to news page after successful login
      navigate('/news');
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError('Login failed. Please check your email and password and try again.'); // Set error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;
