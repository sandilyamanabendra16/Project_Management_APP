import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetUserAlreadyExists, signUp } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import styles from "./RegisterForm.module.css";
import { CiMail } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
import { LuEye } from "react-icons/lu";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('password');
  
  const { name, email, password, cpassword } = formData;

  useEffect(() => {
    if (auth.userAlreadyExists) {
      alert('Person Already Exists');
      dispatch(resetUserAlreadyExists());
    }
  }, [auth.userAlreadyExists, dispatch]);

  useEffect(() => {
    if (auth.isAuthenticated) {

        dispatch(logout());
        navigate('/login');
   // 2 seconds delay before navigating to login page
    }
  }, [auth.isAuthenticated, dispatch, navigate]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Fill All fields');
    } else {
      if (password === cpassword) {
        dispatch(signUp(formData));
      } else {
        alert("Password and Confirm Password doesn't match");
      }
    }
  };
  
  const togglePasswordVisibility = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={styles.main}>
      <h1> Register</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.email}>
          <input 
            type="text" 
            name="name" 
            value={name} 
            onChange={onChange} 
            placeholder='Name' 
          />
        </div>
        <div className={styles.email}>
          <CiMail />
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={onChange} 
            placeholder='Email' 
          />
        </div>
        <div className={styles.email}>
          <AiFillLock color='gray' />
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            placeholder='Password' 
          />
          <LuEye color='gray' onClick={togglePasswordVisibility}/>
        </div>
        <div className={styles.email}>
          <AiFillLock color='gray' />
          <input 
            type="password" 
            name="cpassword" 
            value={cpassword} 
            onChange={onChange} 
            placeholder='Confirm Password' 
          />
          <LuEye color='gray' />
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <div className={styles.reg}>
        <div> Have an account?</div>
        <button onClick={() => navigate('/login')}> Log in</button>
      </div>
      
    </div>
  );
};

export default RegisterForm;
