
import React, { useState } from 'react';
import './App.css';


function WikipediaSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await fetch(
        `https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.query.search);
    } catch (err) {
      setError('Erreur lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wikipedia-search-bar">
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Rechercher sur Wikipedia..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#ff69b4', color: '#fff', fontWeight: 'bold' }}>
          Rechercher
        </button>
      </form>
      {loading && <div style={{ marginTop: 8 }}>Recherche...</div>}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {results.length > 0 && (
        <ul style={{ marginTop: 8, textAlign: 'left' }}>
          {results.map((item) => (
            <li key={item.pageid} style={{ marginBottom: 4 }}>
              <a
                href={`https://fr.wikipedia.org/?curid=${item.pageid}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff69b4', textDecoration: 'underline' }}
              >
                {item.title}
              </a>
              <div dangerouslySetInnerHTML={{ __html: item.snippet }} style={{ fontSize: '0.9em', color: '#ccc' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <WikipediaSearchBar />
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          Coucou <span className="heart">😊</span> Ca va ?
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Don't Learn React, sleep instead
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
