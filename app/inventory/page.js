'use client';
import { useState, useEffect } from "react";
import { firestore } from '../../firebase';
import { Box, Modal, Stack, TextField, Typography, Button, IconButton, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { collection, query, getDocs, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [threshold, setThreshold] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useUser();

  // Check and protect this route
  useEffect(() => {
    if (!user) {
      router.push('/signup');
    } else {
      updateInventory();
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Delete inventory item
  const deleteItem = async (name) => {
    setLoading(true);
    const docRef = doc(collection(firestore, user.email), name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) await deleteDoc(docRef);
      else await setDoc(docRef, { ...docSnap.data(), quantity: quantity - 1 });
      setSnackbarMessage('Item quantity decreased');
      updateInventory();
    } else {
      setSnackbarMessage('No more items');
    }
    setLoading(false);
    setSnackbarOpen(true);
  }

  // Add inventory item
  const addItem = async (name) => {
    setLoading(true);
    const docRef = doc(collection(firestore, user.email), name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { ...docSnap.data(), quantity: quantity + 1 });
      setSnackbarMessage('Item quantity increased');
    } else {
      await setDoc(docRef, { category, price: parseFloat(price), threshold: parseFloat(threshold), quantity: 1 });
      setSnackbarMessage('Item added');
    }
    setLoading(false);
    setSnackbarOpen(true);
    updateInventory();
  }

  // Update inventory
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, user.email));
    const docs = await getDocs(snapshot);

    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });

    setInventory(inventoryList);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <TextField
          label="Search"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {Array.from(new Set(inventory.map(item => item.category))).map((cat, index) => (
              <MenuItem key={index} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          onClick={handleOpen} 
          sx={{ 
            mb: 4, 
            backgroundColor: 'black', 
            color: '#ccd300',
            '&:hover': { 
              backgroundColor: 'black',
            },
          }}
        >
          Add Item
        </Button>
        </Box>
        
        <Modal open={open} onClose={handleClose}>
          <Box 
            position="absolute"
            bgcolor='white'
            top="50%" 
            left="50%"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%,-50%)",
              width: { xs: '90%', sm: '400px' }
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <TextField
                label="Price (in dollars)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Threshold Quantity"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
              <Button 
                variant="contained" 
                onClick={() => addItem(itemName)} 
                disabled={loading}
                sx={{ 
                  backgroundColor: 'black', 
                  color: '#ccd300',
                  '&:hover': { 
                    backgroundColor: 'black',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add'}
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Typography variant="h3" sx={{ mb: 2 }}>Pantry Items</Typography>

        <TableContainer component={Paper} sx={{
          color: 'grey',
          maxHeight: { xs: '400px', sm: 'auto' }
        }}>
          <Table stickyHeader sx={{ color: 'grey' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Threshold</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory
                .filter(item => 
                  (selectedCategory === '' || item.category === selectedCategory) &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <TableRow 
                  key={item.name}
                  sx={{
                    border: item.quantity <= item.threshold ? '2px solid red' : '1px solid #ccc',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton 
                          color="primary" 
                          onClick={() => addItem(item.name)} 
                          sx={{ 
                            backgroundColor: 'black', 
                            color: '#ccd300',
                            '&:hover': { 
                              backgroundColor: 'black',
                            },
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          color="secondary" 
                          onClick={() => deleteItem(item.name)} 
                          sx={{ 
                            backgroundColor: 'black', 
                            color: '#ccd300',
                            '&:hover': { 
                              backgroundColor: 'black',
                            },
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Container>
    );
}
