import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api';

function Orders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

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
          ← Back
        </button>

        <h2 style={{ color: '#e6edf3', fontSize: '2rem', marginBottom: '30px' }}>
          My Orders
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8b949e' }}>
            <p style={{ fontSize: '2rem' }}>⏳</p>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px', color: '#8b949e',
            backgroundColor: '#161b22', borderRadius: '12px',
            border: '1px solid #21262d'
          }}>
            <p style={{ fontSize: '3rem', marginBottom: '15px' }}>📦</p>
            <p style={{ fontSize: '1.1rem' }}>No orders yet</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order, index) => (
              <div key={order._id} style={{
                backgroundColor: '#161b22', borderRadius: '12px',
                border: '1px solid #21262d', padding: '25px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ color: '#e6edf3', fontSize: '1rem', fontWeight: '600' }}>
                    Order #{orders.length - index}
                  </h3>
                  <span style={{
                    backgroundColor: 'rgba(63,185,80,0.1)', color: '#3fb950',
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem',
                    border: '1px solid rgba(63,185,80,0.2)'
                  }}>
                    {order.status || 'Delivered'}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #21262d', paddingTop: '15px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{item.image}</span>
                        <div>
                          <p style={{ color: '#e6edf3', fontSize: '0.9rem', margin: 0 }}>{item.name}</p>
                          <p style={{ color: '#8b949e', fontSize: '0.8rem', margin: 0 }}>Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span style={{ color: '#4a90d9', fontWeight: '600' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid #21262d', paddingTop: '15px', marginTop: '5px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                  <span style={{ color: '#e6edf3', fontWeight: '700', fontSize: '1.1rem' }}>
                    Total: ${order.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;