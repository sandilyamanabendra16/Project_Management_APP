import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Project Management App</h1>
      <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to manage your tasks.</p>
    </div>
  );
};

export default Home;
