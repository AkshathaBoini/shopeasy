import React, { useState, useEffect } from 'react';

function Admin({ user, onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'Electronics', image: '', rating: '', stock: ''
  });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const url = editProduct
      ? `http://localhost:5000/api/products/${editProduct._id}`
      : 'http://localhost:5000/api/products';
    const method = editProduct ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          rating: parseFloat(form.rating),
          stock: parseInt(form.stock)
        })
      });
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: '', description: '', price: '', category: 'Electronics', image: '', rating: '', stock: '' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      rating: product.rating,
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#f85149' }}>
          <p style={{ fontSize: '3rem' }}>🚫</p>
          <p style={{ fontSize: '1.2rem' }}>Access Denied — Admins Only</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <button onClick={onBack} style={{
              backgroundColor: 'transparent', color: '#4a90d9',
              border: '1px solid #4a90d9', padding: '8px 20px',
              borderRadius: '6px', cursor: 'pointer', marginBottom: '15px', fontSize: '0.9rem'
            }}>← Back</button>
            <h2 style={{ color: '#e6edf3', fontSize: '2rem', margin: 0 }}>Admin Panel</h2>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditProduct(null); setForm({ name: '', description: '', price: '', category: 'Electronics', image: '', rating: '', stock: '' }); }}
            style={{
              backgroundColor: '#4a90d9', color: 'white', border: 'none',
              padding: '12px 25px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.95rem'
            }}>
            + Add Product
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{
            backgroundColor: '#161b22', borderRadius: '12px',
            border: '1px solid #21262d', padding: '30px', marginBottom: '30px'
          }}>
            <h3 style={{ color: '#e6edf3', marginBottom: '20px' }}>
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {[
                { key: 'name', label: 'Product Name', type: 'text' },
                { key: 'price', label: 'Price ($)', type: 'number' },
                { key: 'image', label: 'Image (emoji)', type: 'text' },
                { key: 'rating', label: 'Rating (0-5)', type: 'number' },
                { key: 'stock', label: 'Stock', type: 'number' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '6px',
                      border: '1px solid #21262d', backgroundColor: '#0d1117',
                      color: '#e6edf3', fontSize: '0.9rem', boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '6px',
                    border: '1px solid #21262d', backgroundColor: '#0d1117',
                    color: '#e6edf3', fontSize: '0.9rem'
                  }}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginTop: '15px' }}>
              <label style={{ color: '#8b949e', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%', padding: '10px', borderRadius: '6px',
                  border: '1px solid #21262d', backgroundColor: '#0d1117',
                  color: '#e6edf3', fontSize: '0.9rem', boxSizing: 'border-box', resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleSubmit} style={{
                backgroundColor: '#4a90d9', color: 'white', border: 'none',
                padding: '10px 30px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
              }}>
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button onClick={() => { setShowForm(false); setEditProduct(null); }} style={{
                backgroundColor: 'transparent', color: '#8b949e',
                border: '1px solid #21262d', padding: '10px 30px',
                borderRadius: '6px', cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8b949e' }}>
            <p>⏳ Loading products...</p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #21262d', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #21262d' }}>
                  {['Image', 'Name', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                    <th key={h} style={{ color: '#8b949e', padding: '15px', textAlign: 'left', fontSize: '0.85rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #21262d' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1c2128'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '15px', fontSize: '1.5rem' }}>{product.image}</td>
                    <td style={{ padding: '15px', color: '#e6edf3', fontSize: '0.9rem' }}>{product.name}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        backgroundColor: 'rgba(74,144,217,0.1)', color: '#4a90d9',
                        padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem'
                      }}>{product.category}</span>
                    </td>
                    <td style={{ padding: '15px', color: '#4a90d9', fontWeight: '600' }}>${product.price}</td>
                    <td style={{ padding: '15px', color: '#e6edf3' }}>{product.stock}</td>
                    <td style={{ padding: '15px', color: '#f0a500' }}>⭐ {product.rating}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(product)} style={{
                          backgroundColor: 'rgba(74,144,217,0.1)', color: '#4a90d9',
                          border: '1px solid rgba(74,144,217,0.2)', padding: '6px 14px',
                          borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
                        }}>Edit</button>
                        <button onClick={() => handleDelete(product._id)} style={{
                          backgroundColor: 'rgba(248,81,73,0.1)', color: '#f85149',
                          border: '1px solid rgba(248,81,73,0.2)', padding: '6px 14px',
                          borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
                        }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;