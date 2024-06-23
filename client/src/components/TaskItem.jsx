import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/actions/taskActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const onUpdateStatus = (status) => {
    dispatch(updateTask({ ...task, status }));
  };

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <p>{task.status}</p>
      <p>{task.dueDate}</p>
      <button onClick={() => onUpdateStatus('todo')}>To Do</button>
      <button onClick={() => onUpdateStatus('in-progress')}>In Progress</button>
      <button onClick={() => onUpdateStatus('done')}>Done</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
