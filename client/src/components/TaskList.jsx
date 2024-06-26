import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks } from '../redux/actions/taskActions';
import styles from "./TaskList.module.css";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import AddUser from "./AddUser.jsx";
import { GoPeople } from "react-icons/go";
import {formatDate} from "../functions/date";
import TaskForm from "./TaskForm.jsx";

const TaskList = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const taskState = useSelector(state => state.taskReducer);
  const { tasks, loading, error } = taskState;
const [adduseremail, setAdduseremail]=useState(false);
const[addtasks, setAddtasks]=useState(false);
const formatdate= formatDate();
  useEffect(() => {
    dispatch(fetchTasks());
    console.log(taskState);
  }, [dispatch]);
console.log(addtasks);
  const renderTasks = (status) => (
    tasks
      .filter(task => task.status === status)
      .map(task => <TaskItem key={task._id} task={task} />)
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
console.log(authState.authData.user.name);


  return (
    <div className={styles.parent}>
        <div class={styles.header}>
            <div className={styles.header1}>
                <h2> Welcome ! {authState.authData.user.name}</h2>
                <div>
                    <h1 > Borad</h1>
                    <span onClick={()=>setAdduseremail(true)}> <GoPeople /> Add People </span>
                </div>
            </div>
        <div className={styles.header2}>
            <h2 style={{color:'grey'}}> {formatdate}</h2>
                <select name="filter">
                    <option value="Today"> Today</option>
                    <option value="Week"> This Week</option>
                    <option value="Month"> This Month</option>
                </select>
        </div>
        </div>
        <div class={styles.backlog}>
            <div className={styles.taskhead}>
                <h3> Backlog</h3>
                <HiOutlineSquare2Stack/>
            </div>
            <div className={styles.task1}>
               {renderTasks('backlog')} 
            </div>
            
        </div>
        <div class={styles.todo}>
            <div className={styles.taskhead}>
                <h3> To do</h3>
                <div>
                <span onClick={()=>setAddtasks(true)}> +</span>
                <HiOutlineSquare2Stack/>
                </div>
            </div>
            <div className={styles.task1}>
                {renderTasks('todo')}
            </div>
            
        </div>
        <div class={styles.inprogress}>
            <div className={styles.taskhead}>
                <h3>In progress</h3>
                <HiOutlineSquare2Stack/>
            </div>
            <div className={styles.task1}>
                {renderTasks('in-progress')}
            </div>
            
        </div>
        <div class={styles.Done}>
            <div className={styles.taskhead}>
                <h3>Done</h3>
                <HiOutlineSquare2Stack/>
            </div>
            <div className={styles.task1}>
              {renderTasks('done')}  
            </div>
            
        </div>
        {adduseremail && 
        <div className={styles.overlay}>
        <div className={styles.user}>
            <AddUser setAdduseremail={setAdduseremail}/>
        </div>
        </div>}
            {addtasks? (<div className={styles.overlay}>
                <div className={styles.taskform}>
            <TaskForm setAddtasks={setAddtasks}/>
            </div>
            </div> ) :(null)}
    </div>
  );
};

export default TaskList;
