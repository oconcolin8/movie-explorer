import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {/* NavBar sits outside Routes so it appears on every page */}
      <NavBar user={user} />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/movie/:id" element={<MovieDetailPage user={user} />} />
      </Routes>
    </div>
  )
}

export default App