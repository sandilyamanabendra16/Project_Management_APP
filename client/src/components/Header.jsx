import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <h1>Project Management App</h1>
      <ul>
        {!authState.isAuthenticated ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a onClick={onLogout} href="#!">Logout</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
