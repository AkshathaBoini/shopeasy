const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./src/models/Product');

const products = [
  // Electronics (10 products)
  { name: "Wireless Headphones", description: "High quality wireless headphones with noise cancellation", price: 79.99, category: "Electronics", image: "🎧", rating: 4.5, stock: 50 },
  { name: "Smart Watch", description: "Feature-rich smartwatch with health tracking", price: 199.99, category: "Electronics", image: "⌚", rating: 4.3, stock: 30 },
  { name: "Laptop Stand", description: "Ergonomic aluminum laptop stand", price: 49.99, category: "Electronics", image: "💻", rating: 4.7, stock: 100 },
  { name: "Bluetooth Speaker", description: "Portable waterproof bluetooth speaker", price: 59.99, category: "Electronics", image: "🔊", rating: 4.4, stock: 45 },
  { name: "Wireless Keyboard", description: "Compact wireless mechanical keyboard", price: 89.99, category: "Electronics", image: "⌨️", rating: 4.6, stock: 60 },
  { name: "USB-C Hub", description: "7-in-1 USB-C hub with HDMI and SD card", price: 39.99, category: "Electronics", image: "🔌", rating: 4.2, stock: 80 },
  { name: "Wireless Mouse", description: "Ergonomic wireless mouse with long battery life", price: 34.99, category: "Electronics", image: "🖱️", rating: 4.4, stock: 70 },
  { name: "Webcam HD", description: "1080p HD webcam with built-in microphone", price: 69.99, category: "Electronics", image: "📷", rating: 4.3, stock: 40 },
  { name: "Power Bank", description: "20000mAh fast charging portable power bank", price: 44.99, category: "Electronics", image: "🔋", rating: 4.5, stock: 90 },
  { name: "Smart LED Bulb", description: "WiFi enabled color changing smart bulb", price: 19.99, category: "Electronics", image: "💡", rating: 4.1, stock: 150 },

  // Clothing (10 products)
  { name: "Running Shoes", description: "Lightweight comfortable running shoes", price: 89.99, category: "Clothing", image: "👟", rating: 4.6, stock: 40 },
  { name: "Casual T-Shirt", description: "100% cotton comfortable casual t-shirt", price: 24.99, category: "Clothing", image: "👕", rating: 4.2, stock: 120 },
  { name: "Winter Jacket", description: "Warm insulated winter jacket", price: 129.99, category: "Clothing", image: "🧥", rating: 4.5, stock: 25 },
  { name: "Sunglasses", description: "UV protected stylish sunglasses", price: 34.99, category: "Clothing", image: "🕶️", rating: 4.1, stock: 70 },
  { name: "Sports Cap", description: "Adjustable sports cap with UV protection", price: 19.99, category: "Clothing", image: "🧢", rating: 4.0, stock: 90 },
  { name: "Backpack", description: "Waterproof laptop backpack 30L capacity", price: 59.99, category: "Clothing", image: "🎒", rating: 4.4, stock: 35 },
  { name: "Yoga Pants", description: "Flexible high waist yoga pants for women", price: 44.99, category: "Clothing", image: "👖", rating: 4.5, stock: 60 },
  { name: "Hoodie", description: "Soft fleece hoodie for all seasons", price: 54.99, category: "Clothing", image: "🧣", rating: 4.3, stock: 80 },
  { name: "Sneakers", description: "Stylish everyday casual sneakers", price: 74.99, category: "Clothing", image: "👞", rating: 4.4, stock: 50 },
  { name: "Scarf", description: "Warm woolen scarf in multiple colors", price: 19.99, category: "Clothing", image: "🧤", rating: 4.0, stock: 100 },

  // Books (8 products)
  { name: "JavaScript Bible", description: "Complete guide to modern JavaScript", price: 39.99, category: "Books", image: "📘", rating: 4.8, stock: 200 },
  { name: "System Design", description: "System design interview preparation book", price: 44.99, category: "Books", image: "📗", rating: 4.9, stock: 150 },
  { name: "Clean Code", description: "Writing clean maintainable code by Robert Martin", price: 34.99, category: "Books", image: "📕", rating: 4.7, stock: 180 },
  { name: "Python Crash Course", description: "Beginner friendly Python programming guide", price: 29.99, category: "Books", image: "📙", rating: 4.6, stock: 160 },
  { name: "The Pragmatic Programmer", description: "Career guide for software developers", price: 49.99, category: "Books", image: "📒", rating: 4.8, stock: 120 },
  { name: "React Up and Running", description: "Build modern web apps with React", price: 37.99, category: "Books", image: "📓", rating: 4.5, stock: 140 },
  { name: "Database Design", description: "Complete guide to database design and SQL", price: 42.99, category: "Books", image: "📔", rating: 4.4, stock: 110 },
  { name: "Node.js in Action", description: "Server side JavaScript with Node.js", price: 39.99, category: "Books", image: "📃", rating: 4.3, stock: 130 },

  // Home (8 products)
  { name: "Coffee Maker", description: "Programmable coffee maker with timer", price: 69.99, category: "Home", image: "☕", rating: 4.4, stock: 55 },
  { name: "Desk Lamp", description: "LED desk lamp with adjustable brightness", price: 29.99, category: "Home", image: "🪔", rating: 4.3, stock: 75 },
  { name: "Air Purifier", description: "HEPA air purifier for rooms up to 300 sq ft", price: 89.99, category: "Home", image: "🌬️", rating: 4.5, stock: 40 },
  { name: "Plant Pot Set", description: "Set of 3 ceramic plant pots with drainage", price: 24.99, category: "Home", image: "🪴", rating: 4.2, stock: 100 },
  { name: "Scented Candles", description: "Set of 6 long lasting aromatherapy candles", price: 29.99, category: "Home", image: "🕯️", rating: 4.6, stock: 85 },
  { name: "Wall Clock", description: "Modern minimalist silent wall clock", price: 34.99, category: "Home", image: "🕐", rating: 4.3, stock: 60 },
  { name: "Throw Blanket", description: "Soft cozy throw blanket for sofa or bed", price: 39.99, category: "Home", image: "🛋️", rating: 4.7, stock: 70 },
  { name: "Kitchen Scale", description: "Digital kitchen scale accurate to 1g", price: 19.99, category: "Home", image: "⚖️", rating: 4.4, stock: 95 }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected!');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ 36 products added successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));