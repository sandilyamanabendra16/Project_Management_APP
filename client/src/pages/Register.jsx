import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const authState = useSelector(state => state.auth);

  if (authState.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
