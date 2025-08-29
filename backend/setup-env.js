const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Supabase...\n');

// Get Supabase host from user
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Supabase database host (e.g., db.xxxxx.supabase.co): ', (host) => {
  const envContent = `# Supabase PostgreSQL Database Connection
DATABASE_URL=postgresql://postgres:5oNl0DOoWlaom6Du@${host}:5432/postgres

# Server Configuration
PORT=5001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Origins (for frontend)
FRONTEND_URL=http://localhost:5173
`;

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    console.log('\n🔑 Your Supabase connection is configured with:');
    console.log(`   Host: ${host}`);
    console.log(`   Password: 5oNl0DOoWlaom6Du`);
    console.log(`   Database: postgres`);
    console.log('\n🚀 You can now start your backend with: npm start');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
  
  rl.close();
}); 