import axios from 'axios';

export const fetchNews = async (category) => {
  const apiKey = ''; // Replace with your NewsAPI key

  // URL for top headlines in the "technology" category
  let url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKey}`;

  // If the selected category is not the default "technology", search for the term in all articles
  if (category !== 'technology') {
    url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
  }

  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
