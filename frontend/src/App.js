// src/App.js
/*
import React from 'react';
import NewsContainer from './components/NewsContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Real-Time Tech News</h1>
      <NewsContainer />
    </div>
  );
}

export default App;
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NewsContainer from './components/NewsContainer';
import ProfilePage from './components/ProfilePage';
// Simulated authentication status
const isAuthenticated = localStorage.getItem('authToken');

function App() {
  const [auth, setAuth] = useState(isAuthenticated);

  // Simulate login and store auth token
  const loginUser = (token) => {
    localStorage.setItem('authToken', token);
    setAuth(token);
  };

  // Simulate logout
  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setAuth(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register />} />
          
          {auth ? (
    <>
      <Route path="/news" element={<NewsContainer logoutUser={logoutUser} />} />
      <Route path="/profile" element={<ProfilePage />} /> {/* Add route to ProfilePage */}
    </>
  ) : (
    <>
      <Route path="/news" element={<Navigate to="/login" />} />
      <Route path="/profile" element={<Navigate to="/login" />} /> {/* Redirect to login if not authenticated */}
    </>
  )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
