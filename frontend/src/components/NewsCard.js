import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewsCard.css';

const NewsCard = ({ article }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }

      if (bookmarked) {
        await axios.post('http://localhost:5000/api/auth/unbookmark', { url: article.url }, {
          headers: { 'x-auth-token': token },
        });
      } else {
        await axios.post('http://localhost:5000/api/auth/bookmark', { article }, {
          headers: { 'x-auth-token': token },
        });
      }

      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error handling bookmark:', error.response?.data || error.message);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      }).catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <div className="news-card">
      <div className="news-card-content">
        <img src={article.urlToImage} alt={article.title} className="news-card-image" />
        <div className="news-card-details">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
      <div className="news-card-actions">
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? 'Liked' : 'Like'}
        </button>
        <button className="share-button" onClick={handleShare}>
          Share
        </button>
        <button className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmark}>
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
