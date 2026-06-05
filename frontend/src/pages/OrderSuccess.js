import React from 'react';

function OrderSuccess({ onContinueShopping }) {
  return (
    <div style={{
      backgroundColor: '#0d1117', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#161b22', padding: '50px 40px',
        borderRadius: '12px', border: '1px solid #21262d',
        textAlign: 'center', maxWidth: '500px', width: '100%'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>

        <h2 style={{ color: '#3fb950', fontSize: '2rem', marginBottom: '10px', fontWeight: '700' }}>
          Order Placed!
        </h2>

        <p style={{ color: '#8b949e', fontSize: '1rem', lineHeight: 1.7, marginBottom: '30px' }}>
          Thank you for shopping with ShopEasy! Your order has been placed successfully and will be processed shortly.
        </p>

        <div style={{
          backgroundColor: '#0d1117', padding: '20px',
          borderRadius: '8px', marginBottom: '30px',
          border: '1px solid #21262d'
        }}>
          <p style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '8px' }}>
            📦 Estimated delivery: 3-5 business days
          </p>
          <p style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '8px' }}>
            📧 Confirmation sent to your email
          </p>
          <p style={{ color: '#8b949e', fontSize: '0.85rem' }}>
            🔒 Payment processed securely
          </p>
        </div>

        <button
          onClick={onContinueShopping}
          style={{
            backgroundColor: '#1f6feb', color: 'white',
            border: 'none', padding: '14px 40px',
            borderRadius: '8px', cursor: 'pointer',
            fontWeight: '700', fontSize: '1rem', width: '100%'
          }}>
          Continue Shopping →
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;