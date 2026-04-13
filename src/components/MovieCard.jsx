import { useNavigate } from 'react-router-dom';
import { addToWatchlist } from '../services/firestore';
import { useState } from 'react';

function MovieCard({ movie, user }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleAddToWatchlist = async () => {
    await addToWatchlist(user, movie);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <p>{movie.vote_average}</p>

      <button onClick={() => navigate(`/movie/${movie.id}`)}>
        View Details
      </button>

      {/* Only show watchlist button if user is logged in */}
      {user ? (
        <div>
          <button onClick={handleAddToWatchlist}>
            Add to Watchlist
          </button>
          {saved && <p style={{ color: 'green' }}>Added to watchlist!</p>}
        </div>
      ) : (
        <p>Log in to save movies</p>
      )}
    </div>
  );
}

export default MovieCard