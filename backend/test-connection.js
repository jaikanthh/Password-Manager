const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('🔍 Testing Supabase connection...\n');

// Parse the DATABASE_URL to show connection details
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('❌ DATABASE_URL not found in .env file');
  process.exit(1);
}

console.log('📋 Connection details:');
console.log(`   URL: ${dbUrl.replace(/:[^:@]*@/, ':****@')}`);

// Try to connect
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function testConnection() {
  try {
    console.log('\n🔄 Attempting to connect...');
    await sequelize.authenticate();
    console.log('✅ Connection successful!');
    console.log('🎉 Your Supabase PostgreSQL database is ready!');
    
    // Test a simple query
    const result = await sequelize.query('SELECT version()');
    console.log('📊 Database version:', result[0][0].version);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('Unknown host')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Make sure your Supabase project is fully created');
      console.log('   2. Check if the hostname is correct in your .env file');
      console.log('   3. Wait a few minutes for the project to be ready');
      console.log('   4. Verify the connection string in Supabase dashboard');
    }
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

testConnection(); 