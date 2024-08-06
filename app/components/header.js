'use client'
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { useUser } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the correct import path for your firebase setup
import { Container } from '@mui/material';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user in context
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
    <List>
      {['Home', 'Inventory', 'Sign Up'].map((text) => (
        <Link href={text === 'Home' ? '/' : `/${text.replace(' ', '').toLowerCase()}`} passHref key={text}>
          <ListItem button>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      ))}
    </List>
    </Box>
  );

  return (
    <Container>
      <AppBar position="static" sx={{ bgcolor: 'black', borderRadius: 5, mt: { xs: 1 } }}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, color: "#ccd300", fontFamily: 'Poppins, Arial, sans-serif' }}>
            Pantry Tracker
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ textTransform: 'capitalize', fontFamily: 'Poppins, Arial, sans-serif' }}>Home</Button>
            </Link>
            <Link href="/inventory" passHref>
              <Button color="inherit" sx={{ textTransform: 'capitalize', fontFamily: 'Poppins, Arial, sans-serif' }}>Inventory</Button>
            </Link>
            {!user ? (
              <Link href="/signup" passHref>
                <Button color="inherit" sx={{ textTransform: 'capitalize', fontFamily: 'Poppins, Arial, sans-serif' }}>Sign Up</Button>
              </Link>
            ) : (
              <Link href='/'>
              <Button onClick={handleSignOut} color="inherit" sx={{ textTransform: 'capitalize', fontFamily: 'Poppins, Arial, sans-serif' }}>Sign Out</Button>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </Container>
  );
};

export default Header;
