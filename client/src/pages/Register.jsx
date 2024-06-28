import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Art from '../assets/Art.png';
import styles from "./Register.module.css"
const Register = () => {
  const authState = useSelector(state => state.auth);

  if (authState.isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.main}>
        <div className={styles.right}>
            <img src={Art} alt="" className="art" />
            <h1>Welcome aborad my friend</h1>
            <h3>Just a couple of clicls and we start</h3>
        </div>
        <div className={styles.left}>
        <RegisterForm />  
        </div>
    </div>

  );
};

export default Register;
