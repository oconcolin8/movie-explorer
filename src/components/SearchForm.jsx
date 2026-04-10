import { useState } from 'react';
import { searchMovies } from "../services/tmdb";

function SearchForm(props) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(query === "") {
        return setError('Please type a Movie');
    }
    if(query.length > 100) {
        return setError('Search must be less than 100 characters');
    }

    setError('');
    const results = await searchMovies(query);
    props.onSearch(results);

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Search Movies</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
            setQuery(e.target.value);
            setError('');
        }}
        placeholder="Search Movies"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Temp. Could change using css later*/}

      <button type="submit">Search</button>

    </form>
  );
}

export default SearchForm