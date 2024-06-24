import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../redux/actions/taskActions';

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

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index].text = value;
    setFormData({ ...formData, checklist: newChecklist });
  };

  const toggleChecklistItemCompletion = (index) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setFormData({ ...formData, checklist: newChecklist });
  };

  const addChecklistItem = () => {
    setFormData({ ...formData, checklist: [...formData.checklist, { text: '', completed: false }] });
  };
  const removeChecklistItem = index => {
    setFormData({...formData, checklist: [...formData.checklist.filter((_, i) => i !== index)]});
  };
  const handleUpdateTask = () => {
    dispatch(updateTask(id, formData));
    setIsEditing(false);
  };

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <p>{task.status}</p>
      <p>{new Date(task.dueDate).toLocaleDateString()}</p>
      
      <ul>
        {task.checklist && task.checklist.map((item, index) => (
          <li key={index}>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.text}
            </span>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleChecklistItemCompletion(index)}
            />
          </li>
        ))}
      </ul>
      
      <button onClick={() => onUpdateStatus('todo')}>To Do</button>
      <button onClick={() => onUpdateStatus('in-progress')}>In Progress</button>
      <button onClick={() => onUpdateStatus('done')}>Done</button>
      <button onClick={onDelete}>Delete</button>
      
      <div>
        <button onClick={toggleEditForm}>Edit Task</button>
        {isEditing && (
          <div>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleEditChange} 
              placeholder="Title" 
            />
            <select 
              name="priority" 
              value={formData.priority} 
              onChange={handleEditChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleEditChange} 
            />
            <ul>
              {formData.checklist.map((item, index) => (
                <li key={index}>
                  <input 
                    type="text" 
                    value={item.text} 
                    onChange={(e) => handleChecklistChange(index, e.target.value)} 
                    placeholder={`Checklist item ${index + 1}`} 
                  />
                  <button type="button" onClick={() => removeChecklistItem(index)}>
                    Remove
                  </button>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItemCompletion(index)}
                  />
                </li>
              ))}
            </ul>
            <button type="button" onClick={addChecklistItem}>
              Add Checklist Item
            </button>
            
            <button onClick={handleUpdateTask}>Update Task</button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
