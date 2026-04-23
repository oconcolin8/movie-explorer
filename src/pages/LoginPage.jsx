import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../services/firebase';

function LoginPage() {
  // isSignup toggles the form between login and create account mode
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation before hitting Firebase
    if (!email) { setError('Please enter your email'); return; }
    if (!password) { setError('Please enter your password'); return; }
    if (isSignup && password !== confirmPassword) { setError('Passwords do not match'); return; }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Logged in successfully!');
      }
      // Short delay so the user sees the success message before being redirected
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      // Map Firebase error codes to friendly messages
      if (err.code === 'auth/user-not-found') setError('No account found with that email');
      else if (err.code === 'auth/wrong-password') setError('Incorrect password');
      else if (err.code === 'auth/email-already-in-use') setError('An account with that email already exists');
      else if (err.code === 'auth/weak-password') setError('Password must be at least 6 characters');
      else if (err.code === 'auth/invalid-email') setError('Please enter a valid email address');
      else setError('Something went wrong. Please try again');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-5">
          <div className="card bg-dark border-secondary">
            <div className="card-body p-4">
              <h1 className="card-title h3 mb-4">{isSignup ? 'Create Account' : 'Log In'}</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Confirm password field only shown during signup */}
                {isSignup && (
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <button className="btn btn-primary w-100" type="submit">
                  {isSignup ? 'Create Account' : 'Log In'}
                </button>
              </form>

              {/* Toggle between login and signup modes */}
              <p className="mt-3 mb-0 text-center">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => { setIsSignup(!isSignup); setError(''); setSuccess(''); }}
                >
                  {isSignup ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
