import { useState } from 'react';

function SearchForm({ onSearch }) {
  // query tracks what the user has typed; error holds the current validation message
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the page from refreshing on submit

    // Validate before calling the API
    if (query.trim() === '') {
      return setError('Please type a Movie');
    }
    if (query.length > 100) {
      return setError('Search must be less than 100 characters');
    }

    setError('');
    onSearch(query); // pass the query up to the parent (HomePage) to trigger the search
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2 align-items-end">
        <div className="col-12 col-md">
          <label className="form-label">Search Movies</label>
          <input
            className={`form-control ${error ? 'is-invalid' : ''}`}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setError(''); }} // clear error as user types
            placeholder="Search Movies"
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="col-12 col-md-auto">
          <button className="btn btn-primary w-100" type="submit">Search</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm
