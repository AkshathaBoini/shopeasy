import React from 'react';

function Cart({ cart, onUpdateQuantity, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{
        backgroundColor: '#0d1117', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <p style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</p>
        <h2 style={{ color: '#e6edf3', marginBottom: '10px' }}>Your cart is empty</h2>
        <p style={{ color: '#8b949e' }}>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <h2 style={{ color: '#e6edf3', fontSize: '2rem', marginBottom: '30px' }}>
          Shopping Cart ({cart.length} items)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>

          {/* Cart Items */}
          <div>
            {cart.map(item => (
              <div key={item._id} style={{
                backgroundColor: '#161b22', borderRadius: '10px',
                padding: '20px', marginBottom: '15px',
                border: '1px solid #21262d',
                display: 'flex', gap: '20px', alignItems: 'center'
              }}>
                <div style={{ fontSize: '3rem' }}>{item.image}</div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#e6edf3', marginBottom: '5px', fontSize: '1rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '10px' }}>
                    {item.category}
                  </p>
                  <p style={{ color: '#4a90d9', fontWeight: '700', fontSize: '1.1rem' }}>
                    ${item.price}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                    style={{
                      width: '30px', height: '30px', borderRadius: '6px',
                      border: '1px solid #21262d', backgroundColor: '#0d1117',
                      color: '#e6edf3', cursor: 'pointer', fontSize: '1rem'
                    }}>
                    -
                  </button>
                  <span style={{ color: '#e6edf3', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    style={{
                      width: '30px', height: '30px', borderRadius: '6px',
                      border: '1px solid #21262d', backgroundColor: '#0d1117',
                      color: '#e6edf3', cursor: 'pointer', fontSize: '1rem'
                    }}>
                    +
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#e6edf3', fontWeight: '700', marginBottom: '8px' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(item._id)}
                    style={{
                      backgroundColor: 'transparent', border: 'none',
                      color: '#f85149', cursor: 'pointer', fontSize: '0.85rem'
                    }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              backgroundColor: '#161b22', borderRadius: '10px',
              padding: '25px', border: '1px solid #21262d',
              position: 'sticky', top: '80px'
            }}>
              <h3 style={{ color: '#e6edf3', marginBottom: '20px', fontSize: '1.2rem' }}>
                Order Summary
              </h3>

              {cart.map(item => (
                <div key={item._id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>
                    {item.name} x{item.quantity}
                  </span>
                  <span style={{ color: '#e6edf3', fontSize: '0.85rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div style={{
                borderTop: '1px solid #21262d',
                marginTop: '15px', paddingTop: '15px',
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span style={{ color: '#e6edf3', fontWeight: '700' }}>Total</span>
                <span style={{ color: '#4a90d9', fontWeight: '700', fontSize: '1.2rem' }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                style={{
                  width: '100%', backgroundColor: '#4a90d9',
                  color: 'white', border: 'none',
                  padding: '14px', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: '700',
                  fontSize: '1rem', marginTop: '20px'
                }}>
                Proceed to Checkout →
              </button>

              <p style={{ color: '#8b949e', fontSize: '0.8rem', textAlign: 'center', marginTop: '15px' }}>
                🔒 Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;