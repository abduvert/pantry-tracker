
'use client'
import { useRouter } from "next/navigation";

import { Container, Typography, Button } from "@mui/material"


//landing page
const Landing = () => {
  const router = useRouter();

  const handleRoute = ()=>{
    router.push('/signup');
  }

  return (
    <Container
    sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
      flexDirection:'column'
    }}
    >
      <Typography variant="h2" sx={{fontWeight:'bold'}}>
        Welcome to Pantry Planner
      </Typography>
      <Typography variant="h7">
        Plan and save your items with Pantry Planner by simply mamaging your stores seperately
      </Typography>
      <Typography variant="p">
        You can add,update, delete and search your items. There are more exciting features coming up soon
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleRoute} 
        sx={{ 
          my: 4, 
          borderRadius:'10px',
          backgroundColor: 'black', 
          color: '#ccd300',
          '&:hover': { 
            backgroundColor: 'black',
          },
        }}
      >
        Create Pantry
      </Button>
    </Container>
  );
};

export default Landing;
