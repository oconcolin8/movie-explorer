import { useNavigate } from 'react-router-dom';
import { addToWatchlist, addToWatched } from '../services/firestore';
import { useState } from 'react';

function MovieCard({ movie, user, onRemove, showAddButtons }) {
  const navigate = useNavigate();

  // saved/watched control the 3-second confirmation message after clicking an add button
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleAddToWatchlist = async () => {
    await addToWatchlist(user, movie);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddToWatched = async () => {
    await addToWatched(user, movie);
    setWatched(true);
    setTimeout(() => setWatched(false), 3000);
  };

  return (
    <div className="card h-100 bg-dark text-white border-secondary">
      <img
        className="card-img-top"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.svg'}
        alt={movie.title}
        onError={(e) => { e.target.src = '/no-poster.svg'; }}
      />
      <div className="card-body d-flex flex-column gap-2">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-secondary mb-0">{movie.release_date}</p>
        <p className="card-text text-secondary">&#9733; {movie.vote_average}</p>

        <button className="btn btn-outline-light btn-sm" onClick={() => navigate(`/movie/${movie.id}`)}>
          View Details
        </button>

        {user ? (
          <>
            {/* Add buttons only shown on the search results page (showAddButtons=true) */}
            {showAddButtons && (
              <>
                <button className="btn btn-outline-primary btn-sm" onClick={handleAddToWatchlist}>
                  Add to Watchlist
                </button>
                {saved && <span className="text-success small">Added to watchlist!</span>}

                <button className="btn btn-outline-success btn-sm" onClick={handleAddToWatched}>
                  Mark as Watched
                </button>
                {watched && <span className="text-success small">Marked as watched!</span>}
              </>
            )}

            {/* Remove button only shown on list pages (onRemove prop is passed in) */}
            {onRemove && (
              <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(movie.id)}>
                Remove
              </button>
            )}
          </>
        ) : (
          // Guest users see a prompt instead of save buttons
          showAddButtons && <p className="text-secondary small mb-0">Log in to save movies</p>
        )}
      </div>
    </div>
  );
}

export default MovieCard
