// pages/pantry.js
import { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import { db } from '../src/firebase/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Pantry() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "pantryItems"));
      setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (itemName && itemQuantity) {
      await addDoc(collection(db, "pantryItems"), {
        name: itemName,
        quantity: Number(itemQuantity)
      });
      setItemName('');
      setItemQuantity('');
      const querySnapshot = await getDocs(collection(db, "pantryItems"));
      setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const handleUpdateItem = async (id, quantity) => {
    const itemRef = doc(db, "pantryItems", id);
    await updateDoc(itemRef, { quantity });
    const querySnapshot = await getDocs(collection(db, "pantryItems")));
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleRemoveItem = async (id) => {
    await deleteDoc(doc(db, "pantryItems", id));
    const querySnapshot = await getDocs(collection(db, "pantryItems")));
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Items
      </Typography>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Quantity"
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
      >
        Add Item
      </Button>
      <List>
        {items.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} - ${item.quantity}`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleUpdateItem(item.id, item.quantity + 1)}
            >
              Increase Quantity
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
