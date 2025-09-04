import { Box } from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, darkMode, setDarkMode }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        left: 0,
        right: 0,
      }}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '100%',
          p: { xs: 2, sm: 3 },
          mt: { xs: 8, sm: 10 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 