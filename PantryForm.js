// src/components/PantryForm.js
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PantryForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && itemQuantity) {
      onAddItem({ name: itemName, quantity: Number(itemQuantity) });
      setItemName('');
      setItemQuantity('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="Item Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        margin="normal"
        fullWidth
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
      >
        Add Item
      </Button>
    </Box>
  );
};

export default PantryForm;
