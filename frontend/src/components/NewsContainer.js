import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchNews } from '../api/newsApi'; // Ensure fetchNews can handle queries
import NewsCard from './NewsCard';
import '../styles/NewsContainer.css';

const NewsContainer = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [category, setCategory] = useState('technology'); // State for category dropdown
  const [query, setQuery] = useState('technology'); // State for actual query
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews(query);
      setArticles(news);
    };

    getNews();

    const interval = setInterval(() => {
      getNews();
    }, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [query]);

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchQuery); // Update query with search input
  };

  // Function to navigate to the Profile page
  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="news-container">
      <div className="top-bar">
        {/* Category dropdown on the left */}
        <div className="dropdown-controls">
          <label>
            Choose Category:
            <select value={category} onChange={(e) => {
              setCategory(e.target.value);
              setQuery(e.target.value); // Update the news based on the selected category
            }}>
              <option value="technology">Technology</option>
              <option value="ai">AI</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="blockchain">Blockchain</option>
              <option value="cloud computing">Cloud Computing</option>
              <option value="machine learning">Machine Learning</option>
              <option value="robotics">Robotics</option>
              <option value="5g">5G</option>
              <option value="quantum computing">Quantum Computing</option>
              <option value="data science">Data Science</option>
            </select>
          </label>
        </div>

        {/* Search input in the middle */}
        <div className="search-controls">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search input state
            />
            <br>
            
            </br>
            <br>
            </br>
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Profile button on the right */}
        <div className="profile-button">
          <button className="btn-profile" onClick={goToProfile}>
            Profile
          </button>
        </div>
      </div>

      <div className="news-cards">
        {articles.slice(0, 12).map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsContainer;
