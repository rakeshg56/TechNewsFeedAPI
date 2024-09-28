// src/components/NewsList.js
import React from 'react';
import '../styles/NewsList.css';

const NewsList = ({ articles }) => {
  return (
    <ul className="news-list">
      {articles.map((article, index) => (
        <li key={index} className="news-item">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
