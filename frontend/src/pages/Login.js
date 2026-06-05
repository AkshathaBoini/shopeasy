import React, { useState } from 'react';
import { loginUser } from '../api';

function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: '#0d1117', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#161b22', padding: '40px',
        borderRadius: '12px', border: '1px solid #21262d',
        width: '100%', maxWidth: '400px'
      }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '8px', fontSize: '1.8rem', fontWeight: '700' }}>
          Welcome back
        </h2>
        <p style={{ color: '#8b949e', marginBottom: '30px' }}>
          Sign in to your ShopEasy account
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(248,81,73,0.1)', border: '1px solid #f85149',
            color: '#f85149', padding: '12px', borderRadius: '6px',
            marginBottom: '20px', fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%', padding: '12px', borderRadius: '6px',
              border: '1px solid #21262d', backgroundColor: '#0d1117',
              color: '#e6edf3', fontSize: '0.95rem', outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', padding: '12px', borderRadius: '6px',
              border: '1px solid #21262d', backgroundColor: '#0d1117',
              color: '#e6edf3', fontSize: '0.95rem', outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', backgroundColor: loading ? '#8b949e' : '#4a90d9',
            color: 'white', border: 'none', padding: '13px',
            borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '700', fontSize: '1rem', marginBottom: '15px'
          }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={{ color: '#8b949e', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <span onClick={onRegisterClick}
            style={{ color: '#4a90d9', cursor: 'pointer', fontWeight: '600' }}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;