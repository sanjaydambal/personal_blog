import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/articles');
      setArticles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    // Fetch articles when the component mounts
    fetchArticles();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/articles', { title, description });

      // Fetch articles again after adding a new one
      await fetchArticles();
      
      // Optionally: add logic to display a success message or redirect to the articles page
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">My Articles</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div className="mt-5">
        <h2>Articles:</h2>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
