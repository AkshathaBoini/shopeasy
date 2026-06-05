import React from 'react';

function Navbar({ cartCount, user, onCartClick, onHomeClick, onProductsClick, onLoginClick, onLogout, onOrdersClick, onAdminClick }) {
  return (
    <nav style={{
      backgroundColor: '#161b22',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      borderBottom: '1px solid #21262d'
    }}>
      <h1 onClick={onHomeClick} style={{
        color: '#4a90d9', fontSize: '1.5rem',
        fontWeight: 'bold', cursor: 'pointer', margin: 0
      }}>
        🛍️ ShopEasy
      </h1>

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>

        <span onClick={onHomeClick}
          style={{ color: '#e6edf3', cursor: 'pointer', fontSize: '0.95rem' }}
          onMouseEnter={e => e.target.style.color = '#4a90d9'}
          onMouseLeave={e => e.target.style.color = '#e6edf3'}>
          Home
        </span>

        <span onClick={onProductsClick}
          style={{ color: '#e6edf3', cursor: 'pointer', fontSize: '0.95rem' }}
          onMouseEnter={e => e.target.style.color = '#4a90d9'}
          onMouseLeave={e => e.target.style.color = '#e6edf3'}>
          Products
        </span>

        <div onClick={onCartClick} style={{
          backgroundColor: '#4a90d9', color: 'white',
          padding: '8px 18px', borderRadius: '20px',
          cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600'
        }}>
          🛒 Cart ({cartCount})
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user.role === 'admin' && (
              <span onClick={onAdminClick}
                style={{ color: '#f0a500', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
                onMouseEnter={e => e.target.style.color = '#e3b341'}
                onMouseLeave={e => e.target.style.color = '#f0a500'}>
                ⚙️ Admin
              </span>
            )}
            <span
              onClick={onOrdersClick}
              style={{ color: '#4a90d9', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#79b8ff'}
              onMouseLeave={e => e.target.style.color = '#4a90d9'}>
              👤 {user.name}
            </span>
            <button onClick={onLogout} style={{
              color: '#f85149', cursor: 'pointer', fontSize: '0.85rem',
              backgroundColor: 'transparent', border: '1px solid #f85149',
              padding: '6px 14px', borderRadius: '6px'
            }}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={onLoginClick} style={{
            color: '#e6edf3', cursor: 'pointer', fontSize: '0.95rem',
            backgroundColor: 'transparent', border: '1px solid #4a90d9',
            padding: '7px 18px', borderRadius: '6px', fontWeight: '500'
          }}>
            Login
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;