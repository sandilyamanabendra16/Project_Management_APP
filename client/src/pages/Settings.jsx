import React, { useState, useEffect } from 'react';
import { CiMail } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import styles from './Settings.module.css';
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions/userActions';
import { logout, resetUserAlreadyExists } from '../redux/actions/authActions';


const Settings = () => {
const authState = useSelector(state => state.auth);
  const [user, setUser] = useState({ name:authState.authData?.user?.name, email: authState.authData?.user?.email, oldPassword: '', newPassword: '' });
  const dispatch = useDispatch();

  const {name, email, oldPassword, newPassword}=user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
console.log(authState.authData?.user?.password);
  
const handleSubmit = async (e) => {
    e.preventDefault();
    const id = authState.authData?.user?._id;
    try {
        await dispatch(updateUser(id, user))
        dispatch(logout());
      } catch (error) {
        console.error('Update failed', error);
      }
  };

  console.log(authState)
  useEffect(() => {
    if (authState.wrongoldpassword) {
     alert('Invalid old Password');
    dispatch(resetUserAlreadyExists());
    }
  }, [authState.wrongoldpassword, dispatch]);
  return (
    <div className={styles.main}>
        <h1> Settings </h1>
        <form onSubmit={handleSubmit}>
      <div className={styles.email}>
      <IoPersonOutline />
        <input type="text" 
        name="name" value={name} 
        onChange={handleChange} 
        placeholder='Name' />
      </div>
      <div className={styles.email}>
      <CiMail />
        <input type="email" 
        name="email" 
        value={email} 
        onChange={handleChange} 
        placeholder='Email' />
      </div>
      <div className={styles.email}> 
      <AiFillLock color='gray'/>
        <input type="password" 
        name="oldPassword" value={oldPassword} 
        onChange={handleChange} 
        placeholder='Old Password' />
      <LuEye color='gray'/>
      </div>
      <div className={styles.email}>
      <AiFillLock color='gray'/>
        <input type="password" 
        name="newPassword" 
        value={newPassword} 
        onChange={handleChange} 
        placeholder='New Password' />
      <LuEye color='gray'/>
      </div>
      <button type="submit" className={styles.button}>Update</button>
    </form>
      {/* <form id="settings-form" onSubmit={handleSubmit}>
        <h1>Settings</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Old Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={user.newPassword} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form> */}
    </div>
  );
};

export default Settings;
