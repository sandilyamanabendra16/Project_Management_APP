import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../redux/actions/taskActions';
import { addPeople } from '../redux/actions/userActions';
import { logout } from '../redux/actions/authActions';


const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const [people, setPeople] = useState('');

  // useEffect(() => {
  //   dispatch(fetchTasks());
  // }, [dispatch]);

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    setPeople(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = authState.authData?.user?._id;
    if (id) {
      dispatch(addPeople(id, people));
    } else {
      console.error('User ID is null');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={people} onChange={handleChange} />
        <button type="submit">Add People</button>
        {/* {userState.duplicateError && <p style={{ color: 'red' }}>Person is already shared with this user</p>}  // Display error message */}
      </form>
      <TaskForm />
      <TaskList />
      <div> 
        <button onClick={()=>dispatch(logout())}> Log out</button>
      </div>
    </div>
  );
};

export default Dashboard;
