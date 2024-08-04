import { GitHub, Instagram, LinkedIn, Work } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        © 2024 Pantry Tracker
      </Typography>
      <Container
      sx={{
        width:"50%",
        display:'flex',
        justifyContent:'center'
      }}
      >
        <IconButton href='https://github.com/abduvert' target='_blank'>
          <GitHub color='#ccd300'></GitHub>
        </IconButton>
        <IconButton href='https://www.linkedin.com/in/abduvert7/' target='_blank'>
          <LinkedIn color='#ccd300'></LinkedIn>
        </IconButton>
        <IconButton href='https://abduvert.vercel.app/' target='_blank'>
          <Work color='#ccd300'></Work>
        </IconButton>
      </Container>
    </Box>
  );
};

export default Footer;
