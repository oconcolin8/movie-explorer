import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import MovieCard from '../components/MovieCard'

function HomePage() {
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
            <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
    )

}

export default HomePage