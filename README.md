# 🛍️ ShopEasy - Full Stack E-Commerce Platform

A fully functional e-commerce web application built with React, Node.js, Express, and MongoDB.

## 🚀 Live Demo
**[https://shopeasy-topaz.vercel.app](https://shopeasy-topaz.vercel.app)**

## 🔑 Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopeasy.com | admin123 |
| User | Register a new account | - |

## ✨ Features
- 🛒 Product catalog with category filter, search and sort
- 📦 Product detail pages with stock availability
- 🛍️ Shopping cart with quantity management
- 🔐 User authentication (Register/Login with JWT)
- 📋 Order history for logged in users
- ⚙️ Admin panel to add, edit and delete products

## 🛠️ Tech Stack
**Frontend:**
- React.js
- React Router DOM
- CSS-in-JS styling

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

**Deployment:**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 🏃 Run Locally

**Backend:**
```bash
cd backend
npm install
# Add .env file with MONGODB_URI, JWT_SECRET, PORT
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure
```
shopeasy/
├── frontend/          # React application
│   └── src/
│       ├── pages/     # Home, Products, Cart, Orders, Admin
│       ├── components/# Navbar, Toast
│       └── api.js     # API calls
└── backend/           # Node.js REST API
    └── src/
        ├── models/    # User, Product, Order
        ├── routes/    # Auth, Products, Orders
        └── middleware/# JWT Authentication
```
