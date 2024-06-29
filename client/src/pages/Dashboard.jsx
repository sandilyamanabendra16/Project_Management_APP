import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../redux/actions/taskActions';
import { logout } from '../redux/actions/authActions';
import { CiSettings } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import { FiLayout } from "react-icons/fi";
import { FiCodesandbox } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import styles from "./Dashboard.module.css"
import Settings from "./Settings";
import Analytics from "./Analytics";

const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const [addemail, setAdduseremail]= useState(false);
  const [taskboard, setTaskboard]=useState(true);
  const [settings, setSettings]=useState(false);
  const [analyt, setAnalyt]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handlesetting=()=>{
    setTaskboard(false);
    setAnalyt(false);
    setSettings(true);
  }
  const handleanalyt=()=>{
    setAnalyt(true);
    setSettings(false);
    setTaskboard(false);
  }
  const handleboard=()=>{
    setAnalyt(false);
    setSettings(false);
    setTaskboard(true)
  }
  

  return (

    <div className={styles.parent}>
      <div className={styles.div1}>
      <div>
      <div>
        <h3>  <FiCodesandbox /> Pro Manage</h3>
      </div>
          <div onClick={handleboard}> <FiLayout /> Board</div>
          <div onClick={handleanalyt}> <GoDatabase /> Anlytics</div>
          <div onClick={handlesetting} >
            <CiSettings /> Settings
          </div>
      </div>
      
      
      <div className={styles.logout} onClick={() => setAdduseremail(true)}>
        <IoIosLogOut color='red'/> 
        <span>Log out</span>
      </div>
      </div>
      <div className={styles.div2}>
      {/* <form onSubmit={handleSubmit}>
        <input type="email" value={people} onChange={handleChange} />
        <button type="submit">Add People</button>
      </form> */}
      {/* <TaskForm /> */}
      
      {taskboard && <TaskList />}
      {analyt && <Analytics/>}
      {settings && <Settings/>}
      
      </div>
      {addemail && 
      <div className={styles.overlay}>
        <div className={styles.user}>
          <h4> Are you sure you want to Logout</h4>
              <button type="submit" onClick={()=>dispatch(logout())} className={styles.btn2}>Yes Logout</button>
              <button type="button" onClick={() => setAdduseremail(false)} className={styles.btn1}>Cancel</button>
        </div>
    </div>
      }
      
  </div>
  );
};

export default Dashboard;
