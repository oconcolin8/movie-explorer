import { useEffect, useState } from "react";
import { getMovieDetails, searchMovies, getMovieCredits, getMovieReviews } from "./services/tmdb";
import SearchForm from "./components/SearchForm";
import MovieCard from "./components/MovieCard";


function App() {
  const[movies, setMovies] = useState([]);

  const handleSearchResults = (results) => {
    setMovies(results);
    // console.log(results[0]);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearchResults} />

      <ul>
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default App
