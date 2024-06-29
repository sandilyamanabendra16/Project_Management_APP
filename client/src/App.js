import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import Settings from './pages/Settings';
import TaskPage from './pages/TaskPage';


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/task/:id" element={<TaskPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
