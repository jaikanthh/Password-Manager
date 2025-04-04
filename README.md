# Password Manager

A secure and modern password manager built with React and Node.js, featuring a beautiful dark/light mode interface and robust security features.

## Features

- 🔐 Secure password storage with encryption
- 🌓 Beautiful dark/light mode interface
- 🎨 Modern, neumorphic design
- 🔍 Search and filter passwords
- 🔄 Generate strong passwords
- 📋 One-click password copying
- ✨ Smooth animations and transitions
- 📱 Responsive design for all devices
- ⚡ Fast and efficient performance
- 🔒 JWT authentication

## Preview

Here's a sneak peek of the Password Manager interface:

![Screenshot 1](https://raw.githubusercontent.com/jaikanthh/Password-Manager/main/Docs/Screenshot%202025-04-04%20at%207.05.47%E2%80%AFPM.png)

![Screenshot 2](https://raw.githubusercontent.com/jaikanthh/Password-Manager/main/Docs/Screenshot%202025-04-04%20at%207.11.14%E2%80%AFPM.png)


## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v8.0.0 or higher)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (recommended for database management)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd password-manager
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   ```

3. **Database Setup**
   
   a. Create a new MySQL database:
   ```sql
   CREATE DATABASE password_manager;
   ```

   b. Create a user and grant privileges (optional but recommended):
   ```sql
   CREATE USER 'password_manager_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON password_manager.* TO 'password_manager_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory with the following variables:
   ```env
   PORT=5001
   DB_HOST=localhost
   DB_USER=password_manager_user
   DB_PASSWORD=your_password
   DB_NAME=password_manager
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the application**
   ```bash
   # Start backend server (from server directory)
   npm start

   # In a new terminal, start frontend (from root directory)
   npm run dev
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
password-manager/
├── src/                    # Frontend source files
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── context/           # React context providers
├── server/                # Backend source files
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── config/          # Database configuration
│   └── middleware/       # Custom middleware
└── public/               # Static files
```

## Security Features

- Passwords are encrypted before storage
- JWT-based authentication
- Secure password hashing
- HTTPS-only cookies
- XSS protection
- CSRF protection
- SQL injection prevention
- Prepared statements for database queries

## Development

To run the application in development mode:

```bash
# Start backend in development mode
cd server
npm run dev

# Start frontend in development mode
cd ..
npm run dev
```

## Troubleshooting

1. **Database Connection Issues**
   - Ensure MySQL service is running
   - Verify database credentials in `.env` file
   - Check if database and user exist with correct privileges

2. **Port Conflicts**
   - The backend server will attempt to use port 5001 first
   - If port 5001 is in use, it will automatically switch to port 50011
   - Frontend runs on port 5173
   - Update PORT in `.env` if you want to use a different port

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
