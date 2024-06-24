import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../redux/actions/taskActions';
import { addEmail } from '../redux/actions/userActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  // const {user}= useSelector(state=>state.auth.userData);
  const [people, setPeople]=useState([]);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  // const id= user._id;
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const handleChange=(e)=>{
    setPeople(e.target.value);
  
  }
  
  console.log(authState.authData);

  const handleSubmit=(e)=>{
    
    e.preventDefault();
    const userId = authState.authData?._id; // Get user ID from authData
    if (userId) {
      dispatch(addEmail(userId, people));
      setPeople('');
    } else {
      console.error('User ID is null');
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <input type='text' onChange={handleChange}/>
      <button onSubmit={handleSubmit}> Add People</button>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
