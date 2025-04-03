import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          width: '100%',
          maxWidth: '400px',
          mx: 'auto',
          mt: { xs: 2, sm: 3 },
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          component={motion.h1}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          sx={{
            textAlign: 'center',
            fontFamily: 'monospace',
            letterSpacing: '-1px',
            background: 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {'<Welcome Back/>'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Sign in to access your secure vault
        </Typography>

        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(12, 12, 12, 0.7)'
                : 'rgba(255, 255, 255, 0.95)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.03)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: theme.palette.mode === 'dark'
                ? `inset 4px 4px 8px rgba(0,0,0,0.9),
                   inset -4px -4px 8px rgba(0,0,0,0.9),
                   inset 0 6px 16px rgba(0,0,0,0.95),
                   inset 0 -4px 8px rgba(0,0,0,0.95),
                   inset 0 2px 4px rgba(255,255,255,0.05)`
                : `inset 2px 2px 4px rgba(0,0,0,0.1),
                   inset -2px -2px 4px rgba(0,0,0,0.1),
                   inset 0 3px 6px rgba(0,0,0,0.08)`,
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(15, 15, 15, 0.8)'
                  : 'rgba(255, 255, 255, 1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? `inset 5px 5px 10px rgba(0,0,0,0.95),
                     inset -5px -5px 10px rgba(0,0,0,0.95),
                     inset 0 8px 20px rgba(0,0,0,0.98),
                     inset 0 -4px 8px rgba(0,0,0,0.98),
                     inset 0 2px 4px rgba(255,255,255,0.06)`
                  : `inset 3px 3px 6px rgba(0,0,0,0.12),
                     inset -3px -3px 6px rgba(0,0,0,0.12),
                     inset 0 4px 8px rgba(0,0,0,0.1)`,
              },
              '& fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)',
              padding: '0 8px',
              marginTop: '4px',
              '&.Mui-focused, &.MuiFormLabel-filled': {
                transform: 'translate(14px, -20px) scale(0.75)',
                marginTop: 0,
              }
            },
            '& .MuiOutlinedInput-input': {
              color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              padding: '16px 14px',
            },
          }}
        />

        <TextField
          required
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(12, 12, 12, 0.7)'
                : 'rgba(255, 255, 255, 0.95)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.03)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: theme.palette.mode === 'dark'
                ? `inset 4px 4px 8px rgba(0,0,0,0.9),
                   inset -4px -4px 8px rgba(0,0,0,0.9),
                   inset 0 6px 16px rgba(0,0,0,0.95),
                   inset 0 -4px 8px rgba(0,0,0,0.95),
                   inset 0 2px 4px rgba(255,255,255,0.05)`
                : `inset 2px 2px 4px rgba(0,0,0,0.1),
                   inset -2px -2px 4px rgba(0,0,0,0.1),
                   inset 0 3px 6px rgba(0,0,0,0.08)`,
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(15, 15, 15, 0.8)'
                  : 'rgba(255, 255, 255, 1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? `inset 5px 5px 10px rgba(0,0,0,0.95),
                     inset -5px -5px 10px rgba(0,0,0,0.95),
                     inset 0 8px 20px rgba(0,0,0,0.98),
                     inset 0 -4px 8px rgba(0,0,0,0.98),
                     inset 0 2px 4px rgba(255,255,255,0.06)`
                  : `inset 3px 3px 6px rgba(0,0,0,0.12),
                     inset -3px -3px 6px rgba(0,0,0,0.12),
                     inset 0 4px 8px rgba(0,0,0,0.1)`,
              },
              '& fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)',
              padding: '0 8px',
              marginTop: '4px',
              '&.Mui-focused, &.MuiFormLabel-filled': {
                transform: 'translate(14px, -20px) scale(0.75)',
                marginTop: 0,
              }
            },
            '& .MuiOutlinedInput-input': {
              color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              padding: '16px 14px',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            color: 'white',
            fontSize: '1.1rem',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
              : 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 0 20px rgba(59, 130, 246, 0.5)'
              : '0 0 20px rgba(14, 165, 233, 0.5)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)'
                : 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.3)'
                : '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(99, 102, 241, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 2,
          }}
        >
          Don't have an account?{' '}
          <Button
            onClick={() => navigate('/signup')}
            sx={{
              textTransform: 'none',
              color: theme.palette.mode === 'dark' ? '#3B82F6' : '#0EA5E9',
              '&:hover': {
                background: 'none',
                color: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
              },
            }}
          >
            Sign Up
          </Button>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Login; 