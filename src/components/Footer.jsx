import { Box, IconButton, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/jaikanthh', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://linkedin.com/in/jaikanthh', label: 'LinkedIn' },
    { icon: <Instagram />, url: 'https://instagram.com/jaikanthh', label: 'Instagram' },
    { icon: <Email />, url: 'mailto:jaikanthkamisetti@gmail.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 0.5,
        mt: 'auto',
        width: '100vw',
        maxWidth: '100vw',
        left: 0,
        right: 0,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 30, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.25,
          maxWidth: '100%',
          mx: 'auto',
          px: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            mb: 0.25,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((link, index) => (
            <IconButton
              key={index}
              component={Link}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              size="small"
              sx={{
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  color: theme.palette.mode === 'dark'
                    ? '#fff'
                    : '#000',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                padding: '2px',
                '& .MuiSvgIcon-root': {
                  fontSize: '1.25rem',
                },
              }}
            >
              {link.icon}
            </IconButton>
          ))}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          Built and Developed by Jayakanth Kamisetti ©2025
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 