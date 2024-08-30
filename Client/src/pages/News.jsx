// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=crime&from=2024-08-1&to=2024-08-30&sortBy=popularity&apiKey=${apiKey}&language=en&pageSize=100&page=1`
        );
        setNews(response.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Crime News</h1>
      {error && <p className="text-red-500">Error loading news: {error}</p>}
      {news.length > 0 ? (
        <ul>
          {news.map((article, index) => (
            <li key={index} className="mb-4">
              <h2 className="text-xl font-semibold">{article.title || 'No Title'}</h2>
              {article.description && <p>{article.description}</p>}
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title || 'No Image'} className="w-full h-auto mt-2 mb-2" />
              )}
              <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <p className="text-gray-500 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No crime news available at the moment.</p>
      )}
    </div>
  );
};

export default News;
