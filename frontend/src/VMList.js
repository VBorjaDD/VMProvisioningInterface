import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Stack
} from '@mui/material';

const VMList = ({ vms, setEditingVM, setOpen, deleteVM }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Config</strong></TableCell>
            <TableCell><strong>Network</strong></TableCell>
            <TableCell><strong>Users</strong></TableCell>
            <TableCell><strong>Packages</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vms.map(vm => (
            <TableRow key={vm.id} hover>
              <TableCell>{vm.name}</TableCell>
              <TableCell>CPU: {vm.cpu}, RAM: {vm.ram}MB, Disk: {vm.disk}GB</TableCell>
              <TableCell>{vm.network}</TableCell>
              <TableCell>{vm.users.map(u => u.username).join(', ')}</TableCell>
              <TableCell>{vm.packages.join(', ')}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" size="small" onClick={() => { setEditingVM(vm); setOpen(true); }}>Edit</Button>
                  <Button variant="contained" color="error" size="small" onClick={() => deleteVM(vm.id)}>Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VMList;