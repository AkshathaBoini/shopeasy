import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { useNavigate } from 'react-router-dom';

function Products({ onAddToCart, selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];
  const [category, setCategory] = useState(selectedCategory || 'All');

useEffect(() => {
  setCategory(selectedCategory || 'All');
}, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(category, search, sortBy);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [category, search, sortBy]);

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h2 style={{ color: '#e6edf3', fontSize: '2rem', marginBottom: '30px' }}>
          {category === 'All' ? 'All Products' : category}
        </h2>

        <div style={{
          display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap',
          backgroundColor: '#161b22', padding: '20px', borderRadius: '10px',
          border: '1px solid #21262d'
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '10px 15px', borderRadius: '6px',
              border: '1px solid #21262d', backgroundColor: '#0d1117',
              color: '#e6edf3', fontSize: '0.9rem', outline: 'none',
              minWidth: '200px'
            }}
          />

          <select
            value={category}
            onChange={e => {
  setCategory(e.target.value);
  setSelectedCategory(e.target.value);
}}
            style={{
              padding: '10px 15px', borderRadius: '6px',
              border: '1px solid #21262d', backgroundColor: '#0d1117',
              color: '#e6edf3', fontSize: '0.9rem', cursor: 'pointer'
            }}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '10px 15px', borderRadius: '6px',
              border: '1px solid #21262d', backgroundColor: '#0d1117',
              color: '#e6edf3', fontSize: '0.9rem', cursor: 'pointer'
            }}>
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8b949e' }}>
            <p style={{ fontSize: '2rem', marginBottom: '15px' }}>⏳</p>
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            <p style={{ color: '#8b949e', marginBottom: '20px', fontSize: '0.9rem' }}>
              Showing {products.length} products
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px'
            }}>
              {products.map(product => (
                <div key={product._id}
  onClick={() => navigate(`/product/${product._id}`)}
  style={{
    backgroundColor: '#161b22', borderRadius: '10px',
    padding: '20px', border: '1px solid #21262d',
    transition: 'transform 0.3s, border-color 0.3s',
    cursor: 'pointer'
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
                  <div style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '15px' }}>
                    {product.image}
                  </div>

                  <span style={{
                    backgroundColor: 'rgba(74,144,217,0.1)', color: '#4a90d9',
                    padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem',
                    border: '1px solid rgba(74,144,217,0.2)'
                  }}>
                    {product.category}
                  </span>

                  <h3 style={{ color: '#e6edf3', fontSize: '1rem', margin: '12px 0 8px', fontWeight: '600' }}>
                    {product.name}
                  </h3>

                  <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '12px' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#4a90d9', fontWeight: '700', fontSize: '1.2rem' }}>
                      ${product.price}
                    </span>
                    <span style={{ color: '#f0a500', fontSize: '0.85rem' }}>
                      ⭐ {product.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    style={{
                      width: '100%', backgroundColor: '#4a90d9',
                      color: 'white', border: 'none',
                      padding: '10px', borderRadius: '6px',
                      cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem'
                    }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#8b949e' }}>
                <p style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</p>
                <p style={{ fontSize: '1.1rem' }}>No products found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;