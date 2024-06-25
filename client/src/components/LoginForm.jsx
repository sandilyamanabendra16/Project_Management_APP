import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../redux/actions/authActions';
import styles from "./LoginForm.module.css";
import { CiMail } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { resetUserAlreadyExists } from '../redux/actions/authActions';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  const { email, password } = formData;

  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (auth.invalidEmailorPassword) {
      alert('Invalid Email or Password');
      dispatch(resetUserAlreadyExists());
    }
  }, [auth.invalidEmailorPassword, dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    if(!email || !password){
        alert('Fill All fields');
    }
    if(auth.invalidEmailorPassword){
        alert('Invalid Email or Password')
    }else{
    dispatch(logIn(formData));
    }
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [auth.isAuthenticated, navigate]);

  return (
  <div className={styles.main}>
    <h1> Login</h1>
    <form onSubmit={onSubmit}>
      <div className={styles.email}>
        <CiMail />
        <input type="email" name="email" value={email} onChange={onChange} placeholder='Email'/>
      </div>
      <div className={styles.email}>
      <AiFillLock color='gray'/>
        <input type="password" name="password" value={password} onChange={onChange} placeholder='Password' />
        <LuEye color='gray'/>
      </div>
      
      <button type="submit" className={styles.button}>Log in</button>
    </form>
    <div className={styles.reg}>
        <div> Have no account yet?</div>
        <button onClick={()=>navigate('/register')}> Register</button>
    </div>
    </div>
  );
};

export default LoginForm;
