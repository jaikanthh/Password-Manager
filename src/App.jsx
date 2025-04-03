import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: getGradientBackground(),
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
          transition: 'background 0.3s ease-in-out',
        }}
      >
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              py: { xs: 8, sm: 10, md: 12 },
              px: { xs: 1, sm: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '90%', md: '1200px' },
                mx: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<Welcome darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard darkMode={darkMode} />
                    </PrivateRoute>
                  }
                />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
              </Routes>
            </Box>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
