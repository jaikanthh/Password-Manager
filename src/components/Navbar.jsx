import { AppBar, Box, IconButton, Toolbar, Typography, Tooltip, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Password as PasswordIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const publicPages = ['/', '/login', '/signup'];

  if (publicPages.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getGradientStyle = () => {
    return {
      background: darkMode 
        ? 'rgba(30, 30, 30, 0.95)'
        : 'rgba(255, 255, 255, 0.7)',
      boxShadow: darkMode
        ? '0 4px 30px rgba(0, 0, 0, 0.3)'
        : '0 4px 30px rgba(0, 0, 0, 0.1)',
    };
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        ...getGradientStyle(),
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '20px',
        marginTop: '16px',
        width: 'calc(100% - 32px)',
        left: '16px',
        right: '16px'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/dashboard')}
          sx={{
            fontFamily: 'monospace',
            letterSpacing: '-1px',
            cursor: 'pointer',
            background: darkMode
              ? 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)'
              : 'linear-gradient(45deg, #00bcd4 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'left',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            marginRight: 'auto'
          }}
        >
          {'<Chipher Safe/>'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {location.pathname === '/profile' && (
            <Tooltip title="Passwords">
              <IconButton
                onClick={() => navigate('/dashboard')}
                sx={{
                  color: darkMode ? '#90caf9' : '#00bcd4',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: darkMode ? '#42a5f5' : '#2196f3',
                  },
                }}
              >
                <PasswordIcon />
              </IconButton>
            </Tooltip>
          )}
          {location.pathname === '/dashboard' && (
            <Tooltip title="Profile">
              <IconButton
                onClick={() => navigate('/profile')}
                sx={{
                  color: darkMode ? '#90caf9' : '#00bcd4',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: darkMode ? '#42a5f5' : '#2196f3',
                  },
                }}
              >
                <ProfileIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={!darkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                color: darkMode ? '#90caf9' : '#00bcd4',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: darkMode ? '#42a5f5' : '#2196f3',
                },
              }}
            >
              {darkMode ? <DarkIcon /> : <LightIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              sx={{
                color: darkMode ? '#90caf9' : '#00bcd4',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: darkMode ? '#42a5f5' : '#2196f3',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 