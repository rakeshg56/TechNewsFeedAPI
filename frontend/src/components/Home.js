import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>NewsNow</h1>
      <h3>Stay Informed...  Stay Ahead...</h3>
      <br></br>
      <div className="buttons-container">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
