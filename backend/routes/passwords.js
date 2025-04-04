const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Password = require('../models/Password');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all passwords for a user
router.get('/', auth, async (req, res) => {
  try {
    const passwords = await Password.findAll({
      where: { userId: req.userId }
    });
    res.json(passwords);
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ message: 'Error fetching passwords' });
  }
});

// Create a new password
router.post('/', auth, async (req, res) => {
  try {
    const { title, username, password, url } = req.body;
    
    // Validate required fields
    if (!title || !username || !password) {
      return res.status(400).json({ 
        message: 'Title, username, and password are required fields' 
      });
    }
    
    // Add http:// prefix if url is provided but doesn't have a protocol
    let processedUrl = url;
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = `http://${url}`;
    }

    const newPassword = await Password.create({
      title,
      username,
      password,
      url: processedUrl,
      userId: req.userId
    });

    res.status(201).json(newPassword);
  } catch (error) {
    console.error('Error creating password:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update a password
router.put('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid password ID' });
    }

    const { title, username, password, url } = req.body;
    
    // Validate required fields
    if (!title || !username || !password) {
      return res.status(400).json({ 
        message: 'Title, username, and password are required fields' 
      });
    }

    const [updated] = await Password.update(
      { title, username, password, url },
      {
        where: {
          id: id,
          userId: req.userId
        }
      }
    );
    if (updated) {
      const updatedPassword = await Password.findByPk(id);
      res.json(updatedPassword);
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Delete a password
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid password ID' });
    }

    const deleted = await Password.destroy({
      where: {
        id: id,
        userId: req.userId
      }
    });
    if (deleted) {
      res.json({ message: 'Password deleted successfully' });
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ message: 'Error deleting password' });
  }
});

module.exports = router; 