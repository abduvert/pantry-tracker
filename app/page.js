'use client'
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material"

//landing page
const Landing = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push('/signup');
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center', // Ensures all text is centered
        px: 3, // Adds padding on smaller screens
      }}
    >
      <Box>
        <Typography
          variant={{ xs: 'h4', sm: 'h3', md: 'h2',lg:'h1'}}
          component="h2"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Welcome to Pantry Planner
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Plan and save your items with Pantry Planner by simply managing your stores separately
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You can add, update, delete, and search your items. There are more exciting features coming up soon.
        </Typography>
        <Button
          variant="contained"
          onClick={handleRoute}
          sx={{
            my: 2,
            borderRadius: '10px',
            backgroundColor: 'black',
            color: '#ccd300',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
        >
          Create Pantry
        </Button>
      </Box>
    </Container>
  );
};

export default Landing;
