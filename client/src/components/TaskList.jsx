import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks } from '../redux/actions/taskActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.taskReducer);
  const { tasks, loading, error } = taskState;

  useEffect(() => {
    dispatch(fetchTasks());
    console.log(taskState);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {!tasks ||tasks.length === 0 ? (
        null
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
