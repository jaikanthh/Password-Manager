const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');
const userRoutes = require('./routes/users');

const app = express();

// Configure CORS - Must be before any routes
app.use(cors({
  origin: ['https://password-manager-f6zlg7wvo-jaikanths-projects-446ace2d.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight request for 10 minutes
}));

// Handle OPTIONS preflight requests
app.options('*', cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Password Manager API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      passwords: '/api/passwords',
      users: '/api/users'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app; 