const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./config/database');
const app = require('./app');
const User = require('./models/User');
const Password = require('./models/Password');
const cors = require('cors');

dotenv.config();

let server;

// Test connection and sync models
async function initializeDatabase() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database');
      process.exit(1);
    }

    // First sync the models without associations
    await sequelize.sync({ force: false });
    console.log('Initial database sync completed');

    // Then set up associations
    User.hasMany(Password, { 
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
    Password.belongsTo(User, { 
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    
    // Sync again to update associations
    await sequelize.sync({ alter: true });
    console.log('Database associations synced successfully');
    
    // Start server after database is ready
    startServer();
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
}

function startServer() {
  const PORT = process.env.PORT || 5001;
  let currentPort = PORT;
  
  const startServerOnPort = (port) => {
    server = app.listen(port)
      .on('listening', () => {
        console.log(`Server is running on port ${port}`);
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, trying ${port + 1}`);
          startServerOnPort(port + 1);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      });
  };

  startServerOnPort(currentPort);
}

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
  console.log('Starting graceful shutdown...');
  
  try {
    // Close server first
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve);
      });
      console.log('Server closed');
    }

    // Close database connection
    await sequelize.close();
    console.log('Database connection closed');

    console.log('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown();
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  gracefulShutdown();
});

// Initialize database and start server
initializeDatabase();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app']
    : 'http://localhost:5173',
  credentials: true
})); 