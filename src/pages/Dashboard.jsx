import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  useTheme,
  useMediaQuery,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  Search as SearchIcon,
  DeleteSweep as DeleteSweepIcon,
  SelectAll as SelectAllIcon,
  ClearAll as ClearAllIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

// Custom toast configuration
const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    borderRadius: '12px',
    background: 'rgba(12, 12, 12, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    color: '#fff',
    fontSize: '0.95rem',
    padding: '12px 16px',
  },
  progressStyle: {
    background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
  },
  icon: false,
};

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [passwords, setPasswords] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPasswords, setSelectedPasswords] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/passwords`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswords(response.data);
    } catch (error) {
      toast.error('Failed to fetch passwords', toastConfig);
    }
  };

  const handleOpen = (password = null) => {
    if (password) {
      setEditingPassword(password);
      setFormData(password);
    } else {
      setEditingPassword(null);
      setFormData({
        title: '',
        username: '',
        password: '',
        url: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPassword(null);
    setFormData({
      title: '',
      username: '',
      password: '',
      url: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingPassword) {
        if (!editingPassword.id) {
          toast.error('Invalid password ID', toastConfig);
          return;
        }
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/passwords/${editingPassword.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Password updated successfully', toastConfig);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/passwords`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Password added successfully', toastConfig);
      }
      handleClose();
      fetchPasswords();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Operation failed', toastConfig);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid password ID', toastConfig);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Password deleted successfully', toastConfig);
      fetchPasswords();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete password', toastConfig);
    }
  };

  const copyToClipboard = (text, title) => {
    navigator.clipboard.writeText(text);
    toast.success(`Password for ${title} copied to clipboard`, toastConfig);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setFormData({ ...formData, password });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectPassword = (passwordId) => {
    setSelectedPasswords(prev => {
      if (prev.includes(passwordId)) {
        return prev.filter(id => id !== passwordId);
      } else {
        return [...prev, passwordId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedPasswords.length === filteredPasswords.length) {
      setSelectedPasswords([]);
    } else {
      setSelectedPasswords(filteredPasswords.map(p => p.id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        selectedPasswords.map(id =>
          axios.delete(`${import.meta.env.VITE_API_URL}/api/passwords/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.success('Selected passwords deleted successfully', toastConfig);
      setSelectedPasswords([]);
      fetchPasswords();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete selected passwords', toastConfig);
    }
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedPasswords([]);
    }
  };

  const filteredPasswords = passwords.filter(password =>
    password.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    password.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    password.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '100%',
        padding: '0 16px',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 4,
          background: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          height: { xs: 'calc(100vh - 120px)', sm: 'calc(100vh - 140px)' },
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '1200px' },
          mx: 'auto',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          mt: { xs: 6, sm: 3 },
        }}
      >
        {passwords.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexShrink: 0,
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <TextField
                size="small"
                placeholder="Search passwords..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  flex: 1,
                  maxWidth: '400px',
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
                         inset 0 6px 20px rgba(0,0,0,0.95),
                         inset 0 -2px 8px rgba(255,255,255,0.05)`
                      : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 15, 15, 0.8)'
                        : 'rgba(255, 255, 255, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -2px 8px rgba(255,255,255,0.06)`
                        : 'inset 0 3px 6px rgba(0,0,0,0.12)',
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ 
                        color: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.5)'
                          : 'rgba(0, 0, 0, 0.4)',
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Tooltip title={selectionMode ? "Exit Selection Mode" : "Enter Selection Mode"}>
                <IconButton
                  onClick={toggleSelectionMode}
                  sx={{
                    color: selectionMode ? theme.palette.primary.main : theme.palette.text.secondary,
                    '&:hover': {
                      background: theme.palette.primary.main + '20',
                    },
                  }}
                >
                  {selectionMode ? <ClearAllIcon /> : <SelectAllIcon />}
                </IconButton>
              </Tooltip>
              {selectionMode && (
                <>
                  <Button
                    size="small"
                    onClick={handleSelectAll}
                    sx={{
                      color: theme.palette.text.secondary,
                      textTransform: 'none',
                      '&:hover': {
                        background: theme.palette.primary.main + '10',
                      },
                    }}
                  >
                    {selectedPasswords.length === filteredPasswords.length ? 'Unselect All' : 'Select All'}
                  </Button>
                  {selectedPasswords.length > 0 && (
                    <Tooltip title="Delete Selected">
                      <IconButton
                        onClick={handleDeleteSelected}
                        sx={{
                          color: theme.palette.error.main,
                          '&:hover': {
                            background: theme.palette.error.main + '20',
                          },
                        }}
                      >
                        <DeleteSweepIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              sx={{
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
                    ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                    : 'linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 25px rgba(59, 130, 246, 0.6)'
                    : '0 0 25px rgba(14, 165, 233, 0.6)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 15px rgba(59, 130, 246, 0.4)'
                    : '0 0 15px rgba(14, 165, 233, 0.4)',
                },
              }}
            >
              Add Password
            </Button>
          </Box>
        )}

        {passwords.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontWeight: 'bold',
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              }}
            >
              No Passwords Yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3,
                maxWidth: '500px',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Start by adding your first password. Click the button below to get started.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              sx={{
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
                    ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                    : 'linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 25px rgba(59, 130, 246, 0.6)'
                    : '0 0 25px rgba(14, 165, 233, 0.6)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 15px rgba(59, 130, 246, 0.4)'
                    : '0 0 15px rgba(14, 165, 233, 0.4)',
                },
              }}
            >
              Add Your First Password
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 1.5,
                p: 0,
                overflowY: 'auto',
                flex: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              {filteredPasswords.map((password, index) => (
                <motion.div
                  key={password.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ListItem
                    sx={{
                      mb: 0,
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(12, 12, 12, 0.7)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -8px 24px rgba(0,0,0,0.98),
                           inset 0 2px 5px rgba(255,255,255,0.06),
                           inset 0 -1px 2px rgba(255,255,255,0.05)`
                        : `inset 3px 3px 6px rgba(0,0,0,0.12),
                           inset -3px -3px 6px rgba(0,0,0,0.12),
                           inset 0 4px 8px rgba(0,0,0,0.1)`,
                      border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.03)'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(15, 15, 15, 0.8)'
                          : 'rgba(255, 255, 255, 1)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? `inset 8px 8px 16px rgba(0,0,0,0.98),
                             inset -8px -8px 16px rgba(0,0,0,0.98),
                             inset 0 12px 24px rgba(0,0,0,1),
                             inset 0 -12px 24px rgba(0,0,0,1),
                             inset 0 2px 6px rgba(255,255,255,0.08),
                             inset 0 -1px 3px rgba(255,255,255,0.06)`
                          : `inset 4px 4px 8px rgba(0,0,0,0.15),
                             inset -4px -4px 8px rgba(0,0,0,0.15),
                             inset 0 6px 12px rgba(0,0,0,0.12)`,
                      },
                      transition: 'all 0.3s ease',
                      height: '100%',
                      minHeight: '140px',
                      maxHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      padding: '20px',
                      overflow: 'hidden',
                      '&::before': theme.palette.mode === 'dark' ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                      } : {},
                      '&::after': theme.palette.mode === 'dark' ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.9), transparent)',
                      } : {},
                    }}
                  >
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: 1 }}>
                          {selectionMode && (
                            <Checkbox
                              size="small"
                              checked={selectedPasswords.includes(password.id)}
                              onChange={() => handleSelectPassword(password.id)}
                              sx={{
                                color: theme.palette.mode === 'dark' ? '#3B82F6' : '#0EA5E9',
                                '&.Mui-checked': {
                                  color: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
                                },
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: 600, 
                              color: theme.palette.mode === 'dark' ? '#fff' : '#1e293b',
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              textShadow: theme.palette.mode === 'dark' 
                                ? '0 1px 2px rgba(0,0,0,0.9)'
                                : 'none',
                            }}
                          >
                            {password.title}
                          </Typography>
                    </Box>
                        <Box 
                      sx={{
                        display: 'flex',
                            gap: 0.5, 
                            flexShrink: 0, 
                            ml: 1,
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(0, 0, 0, 0.6)' 
                              : 'rgba(0, 0, 0, 0.05)',
                            padding: '4px',
                            borderRadius: 2,
                            boxShadow: theme.palette.mode === 'dark'
                              ? `inset 2px 2px 4px rgba(0,0,0,0.9),
                                 inset -2px -2px 4px rgba(0,0,0,0.9),
                                 inset 0 3px 8px rgba(0,0,0,0.95)`
                              : 'inset 0 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Tooltip title="Copy Password">
                        <IconButton
                              size="small"
                              onClick={() => copyToClipboard(password.password, password.title)}
                          sx={{ 
                                color: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
                                padding: '4px',
                            '&:hover': {
                                  background: theme.palette.mode === 'dark'
                                    ? 'rgba(96, 165, 250, 0.15)'
                                    : 'rgba(56, 189, 248, 0.15)',
                              transform: 'scale(1.1)',
                            },
                                transition: 'all 0.2s ease',
                          }}
                        >
                              <CopyIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                              size="small"
                          onClick={() => handleOpen(password)}
                          sx={{ 
                                color: theme.palette.mode === 'dark' ? '#4ADE80' : '#22C55E',
                                padding: '4px',
                            '&:hover': {
                                  background: theme.palette.mode === 'dark'
                                    ? 'rgba(74, 222, 128, 0.15)'
                                    : 'rgba(34, 197, 94, 0.15)',
                              transform: 'scale(1.1)',
                            },
                                transition: 'all 0.2s ease',
                          }}
                        >
                              <EditIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                              size="small"
                          onClick={() => {
                            if (password.id) {
                              handleDelete(password.id);
                            } else {
                                  toast.error('Invalid password ID', toastConfig);
                            }
                          }}
                          sx={{ 
                                color: theme.palette.mode === 'dark' ? '#F87171' : '#EF4444',
                                padding: '4px',
                            '&:hover': {
                                  background: theme.palette.mode === 'dark'
                                    ? 'rgba(248, 113, 113, 0.15)'
                                    : 'rgba(239, 68, 68, 0.15)',
                              transform: 'scale(1.1)',
                            },
                                transition: 'all 0.2s ease',
                          }}
                        >
                              <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      </Tooltip>
                        </Box>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ 
                          display: 'block', 
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {password.username}
                      </Typography>
                      <Typography
                        component="a"
                        href={password.url.startsWith('http') ? password.url : `https://${password.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        sx={{ 
                          display: 'block', 
                          color: theme.palette.mode === 'dark' ? '#60A5FA' : '#0EA5E9',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          textDecoration: 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            color: theme.palette.mode === 'dark' ? '#93C5FD' : '#38BDF8',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {password.url}
                      </Typography>
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </AnimatePresence>
        )}
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? 'rgba(12, 12, 12, 0.7)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            maxWidth: { xs: '90%', sm: '500px' },
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.03)'
              : '1px solid rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
          }}>
            {editingPassword ? 'Edit Password' : 'Add New Password'}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
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
                         inset 0 6px 20px rgba(0,0,0,0.95),
                         inset 0 -2px 8px rgba(255,255,255,0.05)`
                      : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 15, 15, 0.8)'
                        : 'rgba(255, 255, 255, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -2px 8px rgba(255,255,255,0.06)`
                        : 'inset 0 3px 6px rgba(0,0,0,0.12)',
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
                label="Username"
                name="username"
                value={formData.username}
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
                         inset 0 6px 20px rgba(0,0,0,0.95),
                         inset 0 -2px 8px rgba(255,255,255,0.05)`
                      : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 15, 15, 0.8)'
                        : 'rgba(255, 255, 255, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -2px 8px rgba(255,255,255,0.06)`
                        : 'inset 0 3px 6px rgba(0,0,0,0.12)',
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
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
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
                         inset 0 6px 20px rgba(0,0,0,0.95),
                         inset 0 -2px 8px rgba(255,255,255,0.05)`
                      : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 15, 15, 0.8)'
                        : 'rgba(255, 255, 255, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -2px 8px rgba(255,255,255,0.06)`
                        : 'inset 0 3px 6px rgba(0,0,0,0.12)',
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
                label="URL"
                name="url"
                value={formData.url}
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
                         inset 0 6px 20px rgba(0,0,0,0.95),
                         inset 0 -2px 8px rgba(255,255,255,0.05)`
                      : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 15, 15, 0.8)'
                        : 'rgba(255, 255, 255, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `inset 6px 6px 12px rgba(0,0,0,0.95),
                           inset -6px -6px 12px rgba(0,0,0,0.95),
                           inset 0 8px 24px rgba(0,0,0,0.98),
                           inset 0 -2px 8px rgba(255,255,255,0.06)`
                        : 'inset 0 3px 6px rgba(0,0,0,0.12)',
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={generatePassword}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                color: theme.palette.mode === 'dark' ? '#60A5FA' : 'inherit',
              }}
            >
              Generate Password
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 20px rgba(59, 130, 246, 0.5)'
                  : '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: 'white',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                    : 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 25px rgba(59, 130, 246, 0.6)'
                    : '0 3px 5px 2px rgba(33, 203, 243, .4)',
                },
              }}
            >
              {editingPassword ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </motion.div>
  );
};

export default Dashboard; 