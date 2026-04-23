import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../services/tmdb';

function HomePage({ user, movies, setMovies }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = async (q, p) => {
    const { results, totalPages: tp } = await searchMovies(q, p);
    setMovies(results);
    setTotalPages(tp);
  };

  const handleSearch = async (q) => {
    setQuery(q);
    setPage(1);
    await fetchPage(q, 1);
  };

  const handlePageChange = async (p) => {
    setPage(p);
    await fetchPage(query, p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid py-3">
      <SearchForm onSearch={handleSearch} />
      <MovieGrid
        movies={movies}
        user={user}
        showAddButtons={true}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default HomePage
