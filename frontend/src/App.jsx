import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    console.log('Initial darkMode from localStorage:', savedMode);
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    console.log('App component - darkMode changed:', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleThemeChange = (newMode) => {
    console.log('Theme change requested:', newMode);
    setDarkMode(newMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#4ade80' : '#00bcd4',
      },
      secondary: {
        main: darkMode ? '#ff4081' : '#2196f3',
      },
      background: {
        default: darkMode
          ? '#000000'
          : '#ffffff',
        paper: darkMode ? 'rgba(30, 30, 30, 0.95)' : '#f5f5f5',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode
          ? 'rgba(255, 255, 255, 0.85)'
          : 'rgba(0, 0, 0, 0.7)',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: darkMode
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(245, 245, 245, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: darkMode
              ? '0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05), 0 0 30px rgba(255, 255, 255, 0.025)'
              : '0 8px 32px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: darkMode
                ? '0 0 15px rgba(255, 255, 255, 0.15), 0 0 25px rgba(255, 255, 255, 0.1), 0 0 35px rgba(255, 255, 255, 0.05)'
                : '0 8px 32px rgba(0, 0, 0, 0.25)',
            },
            transition: 'box-shadow 0.3s ease-in-out',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -1,
              background: darkMode 
                ? 'linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06), rgba(255,255,255,0.12))'
                : 'none',
              borderRadius: 'inherit',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
          },
        },
      },
    },
  });
  

  const getGradientBackground = () => {
    if (darkMode) {
      return 'linear-gradient(135deg, #000000 0%, #000000 100%)';
    }
    return 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
      <Router>
        <Layout darkMode={darkMode} setDarkMode={handleThemeChange}>
          <Routes>
            <Route path="/" element={<Welcome darkMode={darkMode} setDarkMode={handleThemeChange} />} />
            <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={handleThemeChange} />} />
            <Route path="/signup" element={<Signup darkMode={darkMode} setDarkMode={handleThemeChange} />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard darkMode={darkMode} setDarkMode={handleThemeChange} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile darkMode={darkMode} setDarkMode={handleThemeChange} />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
