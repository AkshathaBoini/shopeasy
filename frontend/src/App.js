import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { createOrder } from './api';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function AppContent() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const showToast = (message) => {
    setToast(message);
  };

  const addToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item._id !== id));
    } else {
      setCart(prev => prev.map(item =>
        item._id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
    showToast('Item removed from cart');
  };

  const handleCheckout = async () => {
  try {
    const orderItems = cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await createOrder(orderItems, totalAmount, 'Default Address');
  } catch (err) {
    console.error('Order save error:', err);
  }
  setCart([]);
  localStorage.removeItem('cart');
  navigate('/order-success');
};

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    navigate('/');
  };

  const handleRegister = (newUser) => {
    setUser(newUser);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUser(null);
    setCart([]);
    navigate('/');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Navbar
  cartCount={cartCount}
  user={user}
  onCartClick={() => navigate('/cart')}
  onHomeClick={() => {
    setSelectedCategory('All');
    navigate('/');
  }}
  onProductsClick={() => {
    setSelectedCategory('All');
    navigate('/products');
  }}
  onLoginClick={() => navigate('/login')}
  onOrdersClick={() => navigate('/orders')}
  onAdminClick={() => navigate('/admin')}
  onLogout={handleLogout}
/>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Routes>
        <Route path="/" element={
          <Home
            onShopNow={() => {
              setSelectedCategory('All');
              navigate('/products');
            }}
            onAddToCart={addToCart}
            onProductsClick={() => {
              setSelectedCategory('All');
              navigate('/products');
            }}
            onCategoryClick={(cat) => {
              console.log('Category clicked:', cat);
              setSelectedCategory(cat);
              navigate('/products');
            }}
          />
        } />
        <Route path="/products" element={
          <Products
            onAddToCart={addToCart}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        } />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        } />
        <Route path="/login" element={
          <Login
            onLogin={handleLogin}
            onRegisterClick={() => navigate('/register')}
          />
        } />
        <Route path="/register" element={
          <Register
            onRegister={handleRegister}
            onLoginClick={() => navigate('/login')}
            onOrdersClick={() => navigate('/orders')}
          />
        } />
        <Route path="/order-success" element={
          <OrderSuccess onContinueShopping={() => {
            setSelectedCategory('All');
            navigate('/products');
          }} />
        } />
        <Route path="/product/:id" element={
  <ProductDetail
    onAddToCart={addToCart}
    onBack={() => navigate('/products')}
  />
} />
<Route path="/orders" element={
  <Orders onBack={() => navigate('/')} />
} />
<Route path="/admin" element={
  <Admin user={user} onBack={() => navigate('/')} />
} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;