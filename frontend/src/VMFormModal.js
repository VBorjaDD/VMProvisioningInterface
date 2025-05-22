import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, MenuItem, Typography, Grid,
  FormControl, InputLabel, Select, Checkbox, ListItemText
} from '@mui/material';
import axios from 'axios';

const initialForm = {
  id: '',
  name: '',
  cpu: '',
  ram: '',
  disk: '',
  network: 'office',
  users: [],
  packages: []
};

const cpuOptions = [1, 2, 4, 8];
const ramOptions = [1, 2, 4, 8, 16, 32];
const diskOptions = [1, 2, 4, 8, 16, 32, 64, 128, 256, 528, 1024];
const userOptions = ['alice', 'bob', 'carol', 'dave'];
const packageOptions = [
  'nginx', 'httpd', 'vim', 'curl', 'python3', 'git', 'wget',
  'docker', 'nodejs', 'postgresql', 'mysql', 'redis'
];

const generateId = () =>
  `vm-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

const VMFormModal = ({ fetchVMs, editingVM, setEditingVM, closeModal }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingVM) {
      setFormData(editingVM);
    } else {
      setFormData({ ...initialForm, id: generateId() });
    }
  }, [editingVM]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserToggle = (username) => {
    setFormData(prev => {
      const exists = prev.users.find(u => u.username === username);
      const updated = exists
        ? prev.users.filter(u => u.username !== username)
        : [...prev.users, { username, is_sudoer: false }];
      return { ...prev, users: updated };
    });
  };

  const handleSudoToggle = (username) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.username === username ? { ...u, is_sudoer: !u.is_sudoer } : u
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingVM ? 'put' : 'post';
    const url = editingVM
      ? `http://localhost:8000/vms/${formData.id}`
      : 'http://localhost:8000/vms';

    axios[method](url, formData)
      .then(() => {
        fetchVMs();
        setFormData(initialForm);
        setEditingVM(null);
        closeModal();
      })
      .catch(err => console.error("Failed to save:", err));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingVM ? 'Edit VM' : 'Create VM'}
      </Typography>

      <input type="hidden" name="id" value={formData.id} />

      <Grid container spacing={2}>
        <Grid item size={12}>
          <TextField
            fullWidth
            label="VM Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <TextField
            select
            fullWidth
            label="CPU"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            required
          >
            {cpuOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <TextField
            select
            fullWidth
            label="RAM (GB)"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            required
          >
            {ramOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <TextField
            select
            fullWidth
            label="Disk (GB)"
            name="disk"
            value={formData.disk}
            onChange={handleChange}
            required
          >
            {diskOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Network"
            name="network"
            value={formData.network}
            onChange={handleChange}
          >
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="machine">Machine</MenuItem>
            <MenuItem value="test">Test</MenuItem>
          </TextField>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="users-label">Users</InputLabel>
            <Select
              labelId="users-label"
              id="users"
              multiple
              value={formData.users.map(u => u.username)}
              renderValue={(selected) =>
                selected.map(name => {
                  const u = formData.users.find(u => u.username === name);
                  return u?.is_sudoer ? `${name} (sudo)` : name;
                }).join(', ')
              }
            >
              {userOptions.map(username => (
                <MenuItem key={username} value={username}>
                  <Checkbox
                    checked={formData.users.some(u => u.username === username)}
                    onChange={() => handleUserToggle(username)}
                  />
                  <ListItemText
                    primary={username}
                    secondary={
                      formData.users.find(u => u.username === username)?.is_sudoer
                        ? 'sudoer'
                        : ''
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      if (formData.users.find(u => u.username === username)) {
                        handleSudoToggle(username);
                      }
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={12}>
          <FormControl fullWidth>
            <InputLabel id="packages-label">Packages</InputLabel>
            <Select
              labelId="packages-label"
              id="packages"
              multiple
              value={formData.packages}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, packages: e.target.value }))
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {packageOptions.map(pkg => (
                <MenuItem key={pkg} value={pkg}>
                  <Checkbox checked={formData.packages.includes(pkg)} />
                  <ListItemText primary={pkg} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={closeModal} sx={{ mr: 1 }}>Cancel</Button>
          <Button variant="contained" type="submit">
            {editingVM ? 'Update' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VMFormModal;
