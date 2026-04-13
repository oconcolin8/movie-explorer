import SearchForm from '../components/SearchForm'
import MovieCard from '../components/MovieCard'

/*
  movies and setMovies come from App.jsx now.
  HomePage no longer owns the movies state —
  it just displays it and updates it via setMovies.
*/
function HomePage({ user, movies, setMovies }) {

  const handleSearchResults = (results) => {
    setMovies(results);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearchResults} />
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage