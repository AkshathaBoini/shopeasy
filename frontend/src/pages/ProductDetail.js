import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ onAddToCart, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://shopeasy-backend-e8oi.onrender.com/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading) return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#8b949e', fontSize: '1.2rem' }}>⏳ Loading product...</p>
    </div>
  );

  if (!product) return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#8b949e', fontSize: '1.2rem' }}>Product not found</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            backgroundColor: 'transparent', color: '#4a90d9',
            border: '1px solid #4a90d9', padding: '8px 20px',
            borderRadius: '6px', cursor: 'pointer', marginBottom: '30px',
            fontSize: '0.9rem'
          }}>
          ← Back to Products
        </button>

        {/* Product Card */}
        <div style={{
          backgroundColor: '#161b22', borderRadius: '12px',
          border: '1px solid #21262d', padding: '40px',
          display: 'flex', gap: '40px', flexWrap: 'wrap'
        }}>

          {/* Left - Image */}
          <div style={{
            flex: '0 0 200px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', backgroundColor: '#0d1117',
            borderRadius: '10px', padding: '30px', fontSize: '8rem'
          }}>
            {product.image}
          </div>

          {/* Right - Details */}
          <div style={{ flex: 1, minWidth: '250px' }}>

            <span style={{
              backgroundColor: 'rgba(74,144,217,0.1)', color: '#4a90d9',
              padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem',
              border: '1px solid rgba(74,144,217,0.2)'
            }}>
              {product.category}
            </span>

            <h1 style={{ color: '#e6edf3', fontSize: '1.8rem', margin: '15px 0 10px', fontWeight: '700' }}>
              {product.name}
            </h1>

            <p style={{ color: '#8b949e', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <span style={{ color: '#4a90d9', fontWeight: '700', fontSize: '2rem' }}>
                ${product.price}
              </span>
              <span style={{ color: '#f0a500', fontSize: '1rem' }}>
                ⭐ {product.rating} / 5
              </span>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <span style={{
                color: product.stock > 0 ? '#3fb950' : '#f85149',
                fontSize: '0.9rem', fontWeight: '600'
              }}>
                {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              style={{
                backgroundColor: product.stock > 0 ? '#4a90d9' : '#21262d',
                color: 'white', border: 'none',
                padding: '14px 40px', borderRadius: '8px',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                fontWeight: '600', fontSize: '1rem', width: '100%'
              }}>
              {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;