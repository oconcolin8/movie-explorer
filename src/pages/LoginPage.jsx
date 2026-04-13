import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../services/firebase';

function LoginPage() {
  // Track which mode we are in — login or signup
  const [isSignup, setIsSignup] = useState(false);

  // Form field state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error and success message state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isSignup) {
        // Create a new account
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Account created successfully!');
      } else {
        // Log in to existing account
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Logged in successfully!');
      }

      // Wait a moment so user sees the success message then redirect
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      /*
        Firebase returns error codes like "auth/user-not-found"
        We translate these into friendly messages for the user
      */
      if (err.code === 'auth/user-not-found') {
        setError('No account found with that email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with that email already exists');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else {
        setError('Something went wrong. Please try again');
      }
    }
  };

  return (
    <div>
      <h1>{isSignup ? 'Create Account' : 'Log In'}</h1>

      <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {/* Only show confirm password field in signup mode */}
        {isSignup && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </>
        )}

        {/* Show error or success messages */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">
          {isSignup ? 'Create Account' : 'Log In'}
        </button>

      </form>

      {/* Toggle between login and signup mode */}
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => {
          setIsSignup(!isSignup);
          setError('');
          setSuccess('');
        }}>
          {isSignup ? 'Log In' : 'Sign Up'}
        </button>
      </p>

    </div>
  );
}

export default LoginPage