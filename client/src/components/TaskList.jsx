import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks } from '../redux/actions/taskActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks, loading, error}= useSelector(state => state.taskReducer);
//   const { tasks, loading, error } = taskState || { tasks: [], loading: false, error: null };

  useEffect(() => {
    dispatch(fetchTasks());
    console.log(tasks);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
