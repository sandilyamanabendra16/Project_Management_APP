import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FindTasks } from '../redux/actions/taskActions';
import TaskForm from "../components/TaskForm.jsx";
import styles from "./TaskPage.module.css";
import TaskItem from '../components/TaskItem';

const TaskPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const taskState = useSelector(state => state.taskReducer);
    const [link, SetLink]=useState(false);

    const task = taskState.tasks.find(task => task._id === id);


    useEffect(() => {
        if (!task) {
          dispatch(FindTasks(id));
        }
      }, [dispatch, id, task]);
    console.log(task);
      if (!task) {
        return <div>Task Not Found</div>;
      }
  return (
    <div className={styles.main}>
        <div>TaskPage</div>
        <div className={styles.task}>
            <TaskItem task={task} link={link} SetLink={SetLink}/>
        </div>
        
    </div>
    
  )
}

export default TaskPage;