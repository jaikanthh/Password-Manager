const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false,
    sslmode: 'require'
  } : false,
});

// Test connection function
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as test');
    client.release();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

module.exports = { pool, testConnection };