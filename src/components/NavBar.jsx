import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

/*
  NavBar receives the current user as a prop from App.
  If user is null nobody is logged in.
  If user is an object someone is logged in.
*/
function NavBar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      /*
        signOut tells Firebase to end the current session.
        onAuthStateChanged in App.jsx will automatically fire
        and set user back to null when this completes.
      */
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      
      {/* App name — clicking always takes you home */}
      <span
        onClick={() => navigate('/')}
        style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}
      >
        Movie Explorer
      </span>

      {/* Right side — changes based on whether user is logged in */}
      <div>
        {user ? (
          <>
            {/* Show the user's email so they know they're logged in */}
            <span style={{ marginRight: '1rem' }}>{user.email}</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          /* Nobody logged in — show login link */
          <button onClick={() => navigate('/login')}>Log In</button>
        )}
      </div>

    </nav>
  );
}

export default NavBar