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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      console.log('Sending registration request with data:', {
        name: formData.name,
        email: formData.email,
        password: formData.password ? '***' : undefined
      });
      
      const response = await axios.post('http://localhost:50011/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      console.log('Registration response:', response.data);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid response from server');
        console.error('Invalid response:', response.data);
      }
    } catch (error) {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        } : 'No response',
        request: error.request ? 'Request was made but no response received' : 'Request setup failed'
      });

      if (error.response) {
        const errorMessage = error.response.data.message || 
                           (error.response.data.errors && error.response.data.errors[0]) || 
                           'Registration failed';
        toast.error(errorMessage);
        console.error('Server error response:', error.response.data);
      } else if (error.request) {
        toast.error('No response from server. Please check if server is running.');
        console.error('No response received:', error.request);
      } else {
        toast.error('Error setting up request: ' + error.message);
        console.error('Request setup error:', error.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '16px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
          width: '100%',
          maxWidth: '400px',
          mx: 'auto',
          mt: { xs: 4, sm: 6 },
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
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: { xs: 0.5, sm: 1 },
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {'<Create Account/>'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Join Chipher Safe to secure your digital life
        </Typography>

        <TextField
          required
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
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

        <TextField
          required
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Create Account
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 2,
          }}
        >
          Already have an account?{' '}
          <Button
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              color: theme.palette.mode === 'dark' ? '#3B82F6' : '#0EA5E9',
              '&:hover': {
                background: 'none',
                color: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
              },
            }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Signup; 