import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

function NavBar({ user, onGoHome }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 flex-wrap gap-2">
      {/* Clicking the brand clears search results and goes home */}
      <span className="navbar-brand mb-0" style={{ cursor: 'pointer' }} onClick={() => { onGoHome(); navigate('/'); }}>
        Movie Explorer
      </span>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        {/* Show different buttons depending on whether the user is logged in */}
        {user ? (
          <>
            <span className="text-light small">{user.email}</span>
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/watchlist')}>My Watchlist</button>
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/watched')}>My Watched</button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/login')}>Log In</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar
