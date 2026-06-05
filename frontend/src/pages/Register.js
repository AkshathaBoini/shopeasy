import React, { useState } from 'react';
import { registerUser } from '../api';

function Register({ onRegister, onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, email, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        onRegister(data.user);
      } else {
        setError(data.message || 'Registration failed');
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
          Create account
        </h2>
        <p style={{ color: '#8b949e', marginBottom: '30px' }}>
          Join ShopEasy today
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

        {[
          { label: 'Full Name', value: name, setter: setName, type: 'text', placeholder: 'Enter your name' },
          { label: 'Email', value: email, setter: setEmail, type: 'email', placeholder: 'Enter your email' },
          { label: 'Password', value: password, setter: setPassword, type: 'password', placeholder: 'Min 6 characters' },
          { label: 'Confirm Password', value: confirm, setter: setConfirm, type: 'password', placeholder: 'Repeat password' }
        ].map((field, i) => (
          <div key={i} style={{ marginBottom: '18px' }}>
            <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              style={{
                width: '100%', padding: '12px', borderRadius: '6px',
                border: '1px solid #21262d', backgroundColor: '#0d1117',
                color: '#e6edf3', fontSize: '0.95rem', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        ))}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%', backgroundColor: loading ? '#8b949e' : '#4a90d9',
            color: 'white', border: 'none', padding: '13px',
            borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '700', fontSize: '1rem', marginBottom: '15px'
          }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ color: '#8b949e', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <span onClick={onLoginClick}
            style={{ color: '#4a90d9', cursor: 'pointer', fontWeight: '600' }}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;