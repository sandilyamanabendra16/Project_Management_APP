import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Settings = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', newPassword: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await api.getUser();
      setUser({ ...data, password: '', newPassword: '' });
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateUser(user);
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="settings-form-container">
      <form id="settings-form" onSubmit={handleSubmit}>
        <h1>Settings</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Old Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={user.newPassword} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
