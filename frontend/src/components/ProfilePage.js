import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '', phonenumber: '', bookmarks: [] });
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error.response?.data || error.message);
      // Optionally redirect to login if there's an error fetching profile data
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="profile-page">
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <h1>{user.name}'s Profile</h1>
      <h2>Details</h2>
      <p>Mobile Number: {user.phonenumber}</p>
      <p>Email: {user.email}</p>
      <h2>Bookmarks</h2>
      <ul>
        {user.bookmarks.length > 0 ? (
          user.bookmarks.map((bookmark, index) => (
            <li key={index}>
              {bookmark.title} - <a href={bookmark.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </li>
          ))
        ) : (
          <p>No bookmarks available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProfilePage;
