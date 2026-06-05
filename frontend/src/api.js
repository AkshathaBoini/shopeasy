const BASE_URL = 'https://shopeasy-backend-e8oi.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// Auth APIs
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

// Product APIs
export const getProducts = async (category, search, sortBy) => {
  let url = `${BASE_URL}/products?`;
  if (category && category !== 'All') url += `category=${category}&`;
  if (search) url += `search=${search}&`;
  if (sortBy) url += `sortBy=${sortBy}`;
  
  const res = await fetch(url);
  return res.json();
};

// Order APIs
export const createOrder = async (items, totalAmount, shippingAddress) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ items, totalAmount, shippingAddress })
  });
  return res.json();
};

export const getMyOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/my-orders`, {
    headers: headers()
  });
  return res.json();
};