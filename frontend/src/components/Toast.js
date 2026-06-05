import React, { useEffect } from 'react';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: '#1f6feb',
      color: 'white',
      padding: '14px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(31,111,235,0.4)',
      zIndex: 9999,
      fontSize: '0.95rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideIn 0.3s ease'
    }}>
      ✅ {message}
    </div>
  );
}

export default Toast;