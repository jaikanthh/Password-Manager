const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check if the origin matches our allowed patterns
    const allowedOrigins = [
      'http://localhost:5173',
      'https://password-manager-six-psi.vercel.app',
      'https://cipherrsafee.vercel.app',
      'https://ciphersafee.vercel.app',
      'https://*.vercel.app' // Allow Vercel preview deployments
    ];
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        return origin.includes(allowed.replace('*', ''));
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

// Apply CORS configuration
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Password Manager API is running on Vercel',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      passwords: '/api/passwords',
      users: '/api/users'
    }
  });
});

// Import and use routes
const authRoutes = require('../backend/routes/auth');
const passwordRoutes = require('../backend/routes/passwords');
const userRoutes = require('../backend/routes/users');

app.use('/auth', authRoutes);
app.use('/passwords', passwordRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export for Vercel
module.exports = app; 