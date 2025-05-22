import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialEmptyForm = {
  name: '',
  cpu: '',
  ram: '',
  disk: '',
  network: 'office',
  users: [],
  packages: [],
};

const VMForm = ({ fetchVMs, editingVM, setEditingVM }) => {
  const [formData, setFormData] = useState(initialEmptyForm);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [availablePackages, setAvailablePackages] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Fetch available users and packages from the backend
    axios.get('http://localhost:8000/mock/ad-users')
      .then(response => setAvailableUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('http://localhost:8000/mock/packages')
      .then(response => setAvailablePackages(response.data))
      .catch(error => console.error('Error fetching packages:', error));

    // If editing, populate the form
    if (editingVM) {
      setFormData(editingVM);
    }
  }, [editingVM]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (e) => {
    const options = e.target.options;
    const selectedUsers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedUsers.push({ username: options[i].value, is_sudoer: false });
      }
    }
    setFormData({ ...formData, users: selectedUsers });
  };

  const handlePackageChange = (e) => {
    const options = e.target.options;
    const selectedPackages = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedPackages.push(options[i].value);
      }
    }
    setFormData({ ...formData, packages: selectedPackages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const url = isEdit
      ? `http://localhost:8000/vms/${formData.id}`
      : 'http://localhost:8000/vms';
    const method = isEdit ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => {
        setIsError(false);
        setMessage(isEdit ? 'VM updated!' : 'VM created!');
        setFormData(initialEmptyForm);
        setEditingVM(null);
        fetchVMs();
      })
      .catch(error => {
        console.error('Error saving VM:', error);
        setIsError(true);
        setMessage('Error saving VM.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? 'Edit VM' : 'Create VM'}</h2>
      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
      )}
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>CPU:</label>
        <input type="number" name="cpu" value={formData.cpu} onChange={handleChange} required />
      </div>
      <div>
        <label>RAM (MB):</label>
        <input type="number" name="ram" value={formData.ram} onChange={handleChange} required />
      </div>
      <div>
        <label>Disk (GB):</label>
        <input type="number" name="disk" value={formData.disk} onChange={handleChange} required />
      </div>
      <div>
        <label>Network:</label>
        <select name="network" value={formData.network} onChange={handleChange}>
          <option value="office">Office</option>
          <option value="machine">Machine</option>
          <option value="test">Test</option>
        </select>
      </div>
      <div>
        <label>Users:</label>
        <select multiple value={formData.users.map(user => user.username)} onChange={handleUserChange}>
          {availableUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Packages:</label>
        <select multiple value={formData.packages} onChange={handlePackageChange}>
          {availablePackages.map(pkg => (
            <option key={pkg} value={pkg}>{pkg}</option>
          ))}
        </select>
      </div>
      <button type="submit">Save VM</button>
    </form>
  );
};

export default VMForm;
