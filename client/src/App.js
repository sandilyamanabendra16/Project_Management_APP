import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { getUser } from './redux/actions/userActions';
import { initializeAuth } from './redux/actions/authActions';
import Settings from './pages/Settings';
import TaskPage from './pages/TaskPage';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  // const {user}= useSelector((state)=>state.authReducer.authData)

  // useEffect(() => {
  //   dispatch(getUser(user._id));
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(initializeAuth());
  // }, [dispatch]);

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
