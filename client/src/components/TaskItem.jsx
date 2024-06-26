import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../redux/actions/taskActions';
import styles from "./TaskItem.module.css";
import TaskEdit from "./TaskEdit";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    checklist: task.checklist || [] // Ensure checklist is initialized
  });
  const taskState = useSelector(state => state.taskReducer);
  const { tasks } = taskState;
  const id = task._id;

  const onDelete = () => {
    dispatch(deleteTask(id));
  };

  const onUpdateStatus = (status) => {
    dispatch(updateTask(id, { ...task, status }));
  };

  const toggleChecklistItemCompletion = (index) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setFormData({ ...formData, checklist: newChecklist });
  };


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const completedChecklistItems = task.checklist ? task.checklist.filter(item => item.completed).length : 0;
  const totalChecklistItems = task.checklist ? task.checklist.length : 0;
  const getDateClass = () => {
    if (!task.dueDate) {
      return styles.dateNoDue;
    }
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    if (task.status === 'done') {
      return styles.dateDone;
    } else if (dueDate < today) {
      return styles.dateOverdue;
    } else {
      return styles.dateNormal;
    }
  };
  const formatChecklistText = (text) => {
    const parts = text.split(/\d+\)\s*/);
    return parts.filter(part => part.trim() !== '').join(', ');
  };
  const priorityCircleClass = () => {
    switch (task.priority) {
      case 'high':
        return styles.highPriorityCircle;
      case 'medium':
        return styles.mediumPriorityCircle;
      case 'low':
        return styles.lowPriorityCircle;
      default:
        return styles.defaultPriorityCircle;
    }
  };
  const handleEdit =()=>{
    setIsEditing(true); 
    setIsOpen(false)}
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.header2}>
          <span className={priorityCircleClass()}></span>
      <span >{task.priority.toUpperCase()} PRIORITY</span>
        </div>
        
      <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={handleButtonClick} className={styles.dotButton}>
        ...
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={handleEdit} className={styles.dropdownItem}>Edit</button>
          <button onClick={onDelete} className={styles.dropdownItem}>Delete</button>
          <button className={styles.dropdownItem}>Share</button>
        </div>
      )}
      </div>
    </div>
      <h3>{task.title}</h3>
      <p>Checklist({completedChecklistItems}/{totalChecklistItems})</p>
      <ul>
      {task.checklist && task.checklist.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleChecklistItemCompletion(index)}
            />
            <span>
              {formatChecklistText(item.text)}
            </span>
          </li>
        ))}
      </ul>
      
      <div className={styles.taskbtns}>
        <div className={getDateClass()}>
        {task.dueDate && new Date(task.dueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
      })}
        </div>
        <div >
          {task.status !== 'todo' && <button onClick={() => onUpdateStatus('todo')} className={styles.taskbtns1}>To Do</button>}
          {task.status !== 'in-progress' && <button onClick={() => onUpdateStatus('in-progress')} className={styles.taskbtns1}>PROGRESS</button>}
          {task.status !== 'done' && <button onClick={() => onUpdateStatus('done')} className={styles.taskbtns1}>DONE</button>}
          {task.status !== 'backlog' && <button onClick={() => onUpdateStatus('backlog')} className={styles.taskbtns1}>BACKLOG</button>}
        </div>
      </div>
      <div>
        {isEditing && (
          <TaskEdit task={task} setIsEditing={setIsEditing}/>
        )}
      </div>
      </div>
  );
};

export default TaskItem;
