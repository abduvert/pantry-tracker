'use client';

import { Card, Typography, Button, Container, Stack } from '@mui/material';
import React from 'react';
import { auth, provider, signInWithPopup } from '../../firebase'; // Adjust the path as needed
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 13+
import GoogleIcon from '@mui/icons-material/Google'; 
import { useUser } from '../context/UserContext';

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user); // Store user in context
      router.push('/inventory'); // Redirect after successful sign-in
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        px: { xs: 2, sm: 4 }, // Responsive padding
        py: { xs: 4, sm: 6 }, // Responsive padding
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
          maxWidth: '400px',
          borderRadius: '12px',
          p: { xs: 2, sm: 4 }, // Responsive padding
          boxShadow: '1px 1px 1px 0px black',
        }}
      >
        <Stack spacing={2} padding={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Sign In
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Sign up with us to manage your inventory
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{
              borderRadius: '10px',
              backgroundColor: 'black',
              color: '#ccd300',
              '&:hover': { 
                backgroundColor: 'black',
              },
              width: '100%', // Full-width button
            }}
            onClick={handleSignIn}
          >
            Sign Up with Google
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default SignUp;
