import React from 'react';
import products from '../data/products';

function Home({ onShopNow, onAddToCart, onProductsClick, onCategoryClick }) {
  const featured = products.slice(0, 4);

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px' }}>
          Welcome to ShopEasy
        </h1>
        <p style={{ color: '#a8c7fa', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
          Discover amazing products at unbeatable prices. Shop electronics, clothing, books and more!
        </p>
        <button 
          onClick={onShopNow}
          style={{
            backgroundColor: '#4a90d9',
            color: 'white',
            padding: '14px 40px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          Shop Now →
        </button>
      </div>

      {/* Categories */}
      <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#e6edf3', fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>
          Shop by Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { name: 'Electronics', icon: '⚡' },
            { name: 'Clothing', icon: '👗' },
            { name: 'Books', icon: '📚' },
            { name: 'Home', icon: '🏠' }
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => onCategoryClick(cat.name)}
              style={{
                backgroundColor: '#161b22',
                border: '1px solid #21262d',
                borderRadius: '10px',
                padding: '25px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#21262d'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{cat.icon}</div>
              <p style={{ color: '#e6edf3', fontWeight: '600' }}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '20px 20px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#e6edf3', fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>
          Featured Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {featured.map(product => (
            <div key={product.id} style={{
              backgroundColor: '#161b22',
              border: '1px solid #21262d',
              borderRadius: '10px',
              padding: '20px',
              transition: 'transform 0.3s, border-color 0.3s'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#4a90d9';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#21262d';
              }}
            >
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '15px' }}>
                {product.image}
              </div>
              <h3 style={{ color: '#e6edf3', fontSize: '0.95rem', marginBottom: '8px' }}>
                {product.name}
              </h3>
              <p style={{ color: '#4a90d9', fontWeight: '700', fontSize: '1.1rem', marginBottom: '12px' }}>
                ${product.price}
              </p>
              <button
                onClick={() => onAddToCart(product)}
                style={{
                  width: '100%',
                  backgroundColor: '#4a90d9',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;