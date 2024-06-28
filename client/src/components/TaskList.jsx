import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks } from '../redux/actions/taskActions';
import styles from "./TaskList.module.css";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import AddUser from "./AddUser.jsx";
import { GoPeople } from "react-icons/go";
import { formatDate } from "../functions/date";
import TaskForm from "./TaskForm.jsx";

function TaskList() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const taskState = useSelector(state => state.taskReducer);
  const [checkopen, setCheckopen] = useState(false);
  const { tasks = [], loading, error } = taskState; // Ensure tasks is always an array
  const [adduseremail, setAdduseremail] = useState(false);
  const [addtasks, setAddtasks] = useState(false);
  const [filter, setFilter] = useState('Today');
  const [openChecklists, setOpenChecklists] = useState({
    backlog: false,
    todo: false,
    'in-progress': false,
    done: false,
  });

  const formatdate = formatDate();

  useEffect(() => {
    dispatch(fetchTasks(filter));
  }, [dispatch, filter]);

  const handleOpenChecklists = (status) => {
    setOpenChecklists((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const renderTasks = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);

    if (filteredTasks.length === 0) {
      return null;
    }

    return filteredTasks.map(task => (
      <TaskItem
        key={task._id}
        task={task}
        checkopen={openChecklists[status]}
        setCheckopen={() => handleOpenChecklists(status)}
      />
    ));
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.parent}>
      <div className={styles.header}>
        <div className={styles.header1}>
          <h2>Welcome! {authState?.authData?.user?.name}</h2>
          <div>
            <h1>Board</h1>
            <span onClick={() => setAdduseremail(true)}><GoPeople /> Add People</span>
          </div>
        </div>
        <div className={styles.header2}>
          <h2 style={{ color: 'grey' }}>{formatdate}</h2>
          <select name="filter" value={filter} onChange={handleFilterChange}>
            <option value="Today">Today</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
          </select>
        </div>
      </div>

      {['backlog', 'todo', 'in-progress', 'done'].map((status) => (
        <div key={status} className={styles[status]}>
          <div className={styles.taskhead}>
            <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
            <div>
            {status === 'todo' && <span onClick={() => setAddtasks(true)}> + </span>}
              <HiOutlineSquare2Stack onClick={() => handleOpenChecklists(status)} />
            </div>
          </div>
          <div className={styles.task2}>
            <div className={styles.task1}>
              {renderTasks(status)}
            </div>
          </div>
        </div>
      ))}

      {adduseremail && 
        <div className={styles.overlay}>
          <div className={styles.user}>
            <AddUser setAdduseremail={setAdduseremail} />
          </div>
        </div>
      }
      {addtasks && (
        <div className={styles.overlay}>
          <div className={styles.taskform}>
            <TaskForm setAddtasks={setAddtasks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
