import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Analytics.module.css';

const Analytics = () => {
    const taskState = useSelector(state => state.taskReducer);
    const { tasks } = taskState;
    const todos = tasks ? tasks.filter(item => item.status === "todo").length : 0;
    const backlogs=tasks ? tasks.filter(item => item.status === "backlog").length : 0;
    const inprogress=tasks ? tasks.filter(item => item.status === "in-progress").length : 0;
    const completed= tasks ? tasks.filter(item => item.status === "done").length : 0;
    
    const today = new Date().toISOString().split('T')[0];;
    //Priority
    const low = tasks ? tasks.filter(item => item.priority=== "low").length : 0;
    const medium = tasks ? tasks.filter(item => item.priority=== "medium").length : 0;
    const high = tasks ? tasks.filter(item => item.priority=== "high").length : 0;
    const duedate = tasks ? tasks.filter(item => item.dueDate?.split('T')[0] === today).length : 0;
    console.log(tasks[2].dueDate?.split('T')[0]);
    console.log(today);

    return (
        <div className={styles.main}>
            <h1>Analytics</h1>
            <div className={styles.both}>
            <div className={styles.inner}>
            <div>
                <span> <div className={styles.Circle}></div>Backlog Tasks </span>
                <span> <b>{backlogs}</b></span>
            </div>
            <div>
                <span> <div className={styles.Circle}></div>To-do Tasks </span>
                <span><b>{todos} </b></span>
            </div>
            <div>
                <span> <div className={styles.Circle}></div>In-Progress Tasks </span>
                <span><b>{inprogress} </b></span>
            </div>
            <div>
                <span> <div className={styles.Circle}></div> Completed Tasks </span>
                <span><b>{completed} </b></span>
            </div>
            </div>
            <div className={styles.inner}>
            <div>
                <span> <div className={styles.Circle}></div>Low Priority </span>
                <span><b>{low} </b></span>
            </div>
            <div>
                <span> <div className={styles.Circle}></div> Moderate Priority</span>
                <span><b>{medium} </b></span>
            </div>
            <div>
                <span><div className={styles.Circle}></div> High Priority </span>
                <span><b>{high} </b></span>
            </div>
            <div>
                <span> <div className={styles.Circle}></div> Due Date Tasks </span>
                <span> <b>{duedate}</b></span>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Analytics;
