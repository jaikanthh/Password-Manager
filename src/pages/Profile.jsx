import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(prevState => ({
          ...prevState,
          name: response.data.name,
          email: response.data.email
        }));
      } catch (error) {
        toast.error('Failed to fetch user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords if trying to change password
    if (formData.newPassword || formData.confirmNewPassword) {
      if (!formData.currentPassword) {
        toast.error('Current password is required to set a new password');
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error('New passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters long');
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: formData.name,
        email: formData.email,
        ...(formData.currentPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Profile updated successfully');
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingUserData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          mx: 'auto',
          mt: 8,
          background: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)'
              : 'linear-gradient(45deg, #00bcd4 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            fontFamily: 'monospace',
            letterSpacing: '-1px',
            mb: 3,
          }}
        >
          {'<Edit Profile/>'}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiOutlinedInput-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiOutlinedInput-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              mb: 1,
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 'medium',
            }}
          >
            Change Password (Optional)
          </Typography>

          <TextField
            fullWidth
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
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
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiOutlinedInput-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />
          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
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
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiOutlinedInput-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
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
                '&.Mui-focused, &.MuiFormLabel-filled': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                }
              },
              '& .MuiOutlinedInput-input': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
              color: 'white',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              padding: { xs: '10px 20px', sm: '12px 24px' },
              borderRadius: '100px',
              textTransform: 'none',
              fontWeight: 500,
              border: 'none',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 20px rgba(59, 130, 246, 0.5)'
                : '0 0 20px rgba(14, 165, 233, 0.5)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)'
                  : 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.3)'
                  : '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(99, 102, 241, 0.3)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.2)'
                  : '0 0 20px rgba(14, 165, 233, 0.6), 0 0 40px rgba(99, 102, 241, 0.2)',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Profile; 