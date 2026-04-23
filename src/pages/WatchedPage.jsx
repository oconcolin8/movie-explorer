import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatched, removeFromWatched } from '../services/firestore';
import MovieGrid from '../components/MovieGrid';

function WatchedPage({ user }) {
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user is logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWatched = async () => {
      const movies = await getWatched(user);
      setWatched(movies);
      setLoading(false);
    };

    fetchWatched();
  }, [user]);

  if (loading) {
    return (
      <div className="container-fluid py-3">
        <p className="text-secondary">Loading your watched movies...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3">
      <h1 className="mb-3">Movies I've Watched</h1>

      {watched.length === 0 ? (
        <p className="text-secondary">No watched movies yet. Mark movies as watched to see them here!</p>
      ) : (
        <MovieGrid
          movies={watched}
          user={user}
          onRemove={async (movieId) => {
            // Remove from state immediately so the UI updates right away, then delete from Firestore
            setWatched(prev => prev.filter(m => m.id !== movieId));
            await removeFromWatched(user, movieId);
          }}
        />
      )}
    </div>
  );
}

export default WatchedPage
