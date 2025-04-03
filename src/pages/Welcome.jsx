import { Box, Button, Container, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { useTheme } from '@mui/material/styles';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';

const Welcome = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 10,
          background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
          padding: '4px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
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
            {darkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        variant="h2"
        component={motion.h1}
        whileHover={{ scale: 1.05 }}
        sx={{
          fontFamily: 'monospace',
          letterSpacing: '-1px',
          background: 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.75rem', sm: '3rem', md: '4rem' },
          fontWeight: 'bold',
          mb: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {'<Chipher Safe/>'}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: 'text.secondary',
          maxWidth: '600px',
          fontSize: { xs: '0.875rem', sm: '1.25rem' },
          mb: { xs: 3, sm: 4 },
        }}
      >
        Your Digital Fortress for Password Security
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: { xs: 1.5, sm: 3 },
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(0, 0, 0, 0.2)'
            : '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 80px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: { xs: '100%', sm: '95%', md: '1200px' },
          position: 'relative',
          transform: 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 0, 0, 0.3)'
              : '0 30px 80px rgba(0, 0, 0, 0.3), 0 0 100px rgba(0, 0, 0, 0.2)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -1,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06), rgba(255,255,255,0.12))'
              : 'none',
            borderRadius: 'inherit',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 1.5, sm: 3 },
            width: '100%',
            maxWidth: { xs: '100%', sm: 1000 },
            mb: { xs: 1.5, sm: 3 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(20, 20, 20, 0.7)'
                : 'rgba(255, 255, 255, 0.6)',
              borderRadius: 4,
              position: 'relative',
              boxShadow: theme.palette.mode === 'dark'
                ? 'inset 0 2px 10px rgba(0,0,0,0.9), inset 0 4px 20px rgba(0,0,0,0.8), inset 0 8px 24px rgba(0,0,0,0.7)'
                : 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 4px 12px rgba(0,0,0,0.08), inset 0 8px 16px rgba(0,0,0,0.04)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(25, 25, 25, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 3px 15px rgba(0,0,0,0.95), inset 0 6px 25px rgba(0,0,0,0.85), inset 0 9px 30px rgba(0,0,0,0.75)'
                  : 'inset 0 3px 6px rgba(0,0,0,0.15), inset 0 6px 16px rgba(0,0,0,0.12), inset 0 12px 24px rgba(0,0,0,0.06)',
                '& .title-underline::after': {
                  width: '100%',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 4,
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 1px 2px rgba(0,0,0,0.9)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.4)',
                pointerEvents: 'none',
              },
              '&::after': theme.palette.mode === 'dark' ? {
                content: '""',
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
                borderRadius: 3,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              } : {},
            }}
          >
            <LockIcon sx={{ 
              fontSize: 40, 
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4', 
              mb: 2,
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 2px 2px rgba(255,255,255,0.1))'
                : 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }} />
            <Typography 
              variant="h6" 
              gutterBottom
              className="title-underline"
              sx={{
                position: 'relative',
                fontWeight: 500,
                color: theme.palette.text.primary,
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: '2px',
                  backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4',
                  transition: 'width 0.3s ease',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 1px 2px rgba(255,255,255,0.1)'
                    : '0 1px 2px rgba(0,0,0,0.1)',
                },
              }}
            >
              Secure Storage
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
              }}
            >
              Your passwords are encrypted and stored safely
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(20, 20, 20, 0.7)'
                : 'rgba(255, 255, 255, 0.6)',
              borderRadius: 4,
              position: 'relative',
              boxShadow: theme.palette.mode === 'dark'
                ? 'inset 0 2px 10px rgba(0,0,0,0.9), inset 0 4px 20px rgba(0,0,0,0.8), inset 0 8px 24px rgba(0,0,0,0.7)'
                : 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 4px 12px rgba(0,0,0,0.08), inset 0 8px 16px rgba(0,0,0,0.04)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(25, 25, 25, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 3px 15px rgba(0,0,0,0.95), inset 0 6px 25px rgba(0,0,0,0.85), inset 0 9px 30px rgba(0,0,0,0.75)'
                  : 'inset 0 3px 6px rgba(0,0,0,0.15), inset 0 6px 16px rgba(0,0,0,0.12), inset 0 12px 24px rgba(0,0,0,0.06)',
                '& .title-underline::after': {
                  width: '100%',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 4,
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 1px 2px rgba(0,0,0,0.9)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.4)',
                pointerEvents: 'none',
              },
              '&::after': theme.palette.mode === 'dark' ? {
                content: '""',
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
                borderRadius: 3,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              } : {},
            }}
          >
            <SecurityIcon sx={{ 
              fontSize: 40, 
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4', 
              mb: 2,
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 2px 2px rgba(255,255,255,0.1))'
                : 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }} />
            <Typography 
              variant="h6" 
              gutterBottom
              className="title-underline"
              sx={{
                position: 'relative',
                fontWeight: 500,
                color: theme.palette.text.primary,
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: '2px',
                  backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4',
                  transition: 'width 0.3s ease',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 1px 2px rgba(255,255,255,0.1)'
                    : '0 1px 2px rgba(0,0,0,0.1)',
                },
              }}
            >
              End-to-End Encryption
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
              }}
            >
              Your data is protected with advanced encryption
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(20, 20, 20, 0.7)'
                : 'rgba(255, 255, 255, 0.6)',
              borderRadius: 4,
              position: 'relative',
              boxShadow: theme.palette.mode === 'dark'
                ? 'inset 0 2px 10px rgba(0,0,0,0.9), inset 0 4px 20px rgba(0,0,0,0.8), inset 0 8px 24px rgba(0,0,0,0.7)'
                : 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 4px 12px rgba(0,0,0,0.08), inset 0 8px 16px rgba(0,0,0,0.04)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(25, 25, 25, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 3px 15px rgba(0,0,0,0.95), inset 0 6px 25px rgba(0,0,0,0.85), inset 0 9px 30px rgba(0,0,0,0.75)'
                  : 'inset 0 3px 6px rgba(0,0,0,0.15), inset 0 6px 16px rgba(0,0,0,0.12), inset 0 12px 24px rgba(0,0,0,0.06)',
                '& .title-underline::after': {
                  width: '100%',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 4,
                boxShadow: theme.palette.mode === 'dark'
                  ? 'inset 0 1px 2px rgba(0,0,0,0.9)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.4)',
                pointerEvents: 'none',
              },
              '&::after': theme.palette.mode === 'dark' ? {
                content: '""',
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
                borderRadius: 3,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
              } : {},
            }}
          >
            <SpeedIcon sx={{ 
              fontSize: 40, 
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4', 
              mb: 2,
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 2px 2px rgba(255,255,255,0.1))'
                : 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }} />
            <Typography 
              variant="h6" 
              gutterBottom
              className="title-underline"
              sx={{
                position: 'relative',
                fontWeight: 500,
                color: theme.palette.text.primary,
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: '2px',
                  backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#00bcd4',
                  transition: 'width 0.3s ease',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 1px 2px rgba(255,255,255,0.1)'
                    : '0 1px 2px rgba(0,0,0,0.1)',
                },
              }}
            >
              Easy Access
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 1px rgba(0,0,0,0.5)'
                  : '0 1px 1px rgba(255,255,255,0.5)',
              }}
            >
              Quick and convenient password management
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'white',
              borderRadius: 2,
              textTransform: 'none',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 20px rgba(59, 130, 246, 0.5)'
                : '0 0 20px rgba(14, 165, 233, 0.5)',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)'
                  : 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.3)'
                  : '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(99, 102, 241, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/signup')}
            sx={{
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: 2,
              textTransform: 'none',
              borderColor: theme.palette.mode === 'dark' ? '#3B82F6' : '#0EA5E9',
              color: theme.palette.mode === 'dark' ? '#3B82F6' : '#0EA5E9',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
                color: theme.palette.mode === 'dark' ? '#60A5FA' : '#38BDF8',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(14, 165, 233, 0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Welcome; 