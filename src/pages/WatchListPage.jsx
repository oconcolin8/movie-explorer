import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, removeFromWatchlist } from '../services/firestore';
import MovieGrid from '../components/MovieGrid';

function WatchlistPage({ user }) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user is logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWatchlist = async () => {
      const movies = await getWatchlist(user);
      setWatchlist(movies);
      setLoading(false);
    };

    fetchWatchlist();
  }, [user]);

  if (loading) {
    return (
      <div className="container-fluid py-3">
        <p className="text-secondary">Loading your watchlist...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3">
      <h1 className="mb-3">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-secondary">Your watchlist is empty. Search for movies to add some!</p>
      ) : (
        <MovieGrid
          movies={watchlist}
          user={user}
          onRemove={async (movieId) => {
            // Remove from state immediately so the UI updates right away, then delete from Firestore
            setWatchlist(prev => prev.filter(m => m.id !== movieId));
            await removeFromWatchlist(user, movieId);
          }}
        />
      )}
    </div>
  );
}

export default WatchlistPage
