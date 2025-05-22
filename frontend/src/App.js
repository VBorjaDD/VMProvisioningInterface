import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Dialog } from '@mui/material';
import VMFormModal from './VMFormModal';
import VMList from './VMList';

export default function App() {
  const [vms, setVMs] = useState([]);
  const [editingVM, setEditingVM] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchVMs = () => {
    axios.get('http://localhost:8000/vms')
      .then(res => setVMs(res.data))
      .catch(err => console.error(err));
  };

  const deleteVM = (id) => {
    if (!window.confirm('Are you sure you want to delete this VM?')) return;
    axios.delete(`http://localhost:8000/vms/${id}`)
      .then(fetchVMs)
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchVMs();
  }, []);

  const handleOpen = () => {
    setEditingVM(null);
    setOpen(true);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4">VM Provisioning Interface</Typography>
        <Button variant="contained" onClick={handleOpen}>Create VM</Button>
      </Box>

      <VMList vms={vms} setEditingVM={setEditingVM} setOpen={setOpen} deleteVM={deleteVM} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <VMFormModal
          fetchVMs={fetchVMs}
          editingVM={editingVM}
          setEditingVM={setEditingVM}
          closeModal={() => setOpen(false)}
        />
      </Dialog>
    </Container>
  );
}