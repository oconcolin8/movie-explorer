import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import LoginPage from './pages/LoginPage'
import WatchlistPage from './pages/WatchlistPage'
import WatchedPage from './pages/WatchedPage'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'

function App() {
  // user is null when logged out, or a Firebase user object when logged in
  const [user, setUser] = useState(null);
  // movies is lifted here so search results survive navigating to a detail page and back
  const [movies, setMovies] = useState([]);

  // Listen for login/logout events from Firebase and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // stop listening when the app unmounts
  }, []);

  return (
    <div data-bs-theme="dark">
      {/* onGoHome clears search results when the user clicks the navbar brand */}
      <NavBar user={user} onGoHome={() => setMovies([])} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage user={user} movies={movies} setMovies={setMovies} />} />
        <Route path="/movie/:id" element={<MovieDetailPage user={user} />} />
        <Route path="/watchlist" element={<WatchlistPage user={user} />} />
        <Route path="/watched" element={<WatchedPage user={user} />} />
      </Routes>
    </div>
  )
}

export default App
