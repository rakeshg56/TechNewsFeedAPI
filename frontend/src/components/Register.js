import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [error, setError] = useState(''); // State to manage error message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // API call to your backend for registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phonenumber,
      });

      console.log(response.data); // Log the response for debugging

      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setError('Registration failed. Please try again.'); // Set error message
    }
  };

  const registerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('https://thumbs.dreamstime.com/z/registration-illustration-tablet-computer-blue-background-50146963.jpg')", // Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px', // Space between form elements
    width: '300px', // Fixed width for the form
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for form
    padding: '20px',
    borderRadius: '10px', // Rounded corners for the form
  };

  const inputStyle = {
    width: '100%', // Full width of the form
    padding: '10px', // Padding for better appearance
    boxSizing: 'border-box', // Ensure padding doesn't affect width
    margin: '5px 0', // Add margin between inputs
  };

  return (
    <div style={registerStyle}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle} // Apply consistent input style
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={{ ...inputStyle, backgroundColor: '#007bff', color: '#fff' }}>
          Register
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Register;
