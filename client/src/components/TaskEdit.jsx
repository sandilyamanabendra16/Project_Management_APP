import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';

const TaskEdit = ({task, setIsEditing}) => {
    const dispatch = useDispatch();
    const id = task._id;
    console.log(task);

    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        checklist: task.checklist || [] // Ensure checklist is initialized
      });

    const handleEditChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const toggleChecklistItemCompletion = (index) => {
        const newChecklist = [...formData.checklist];
        newChecklist[index].completed = !newChecklist[index].completed;
        setFormData({ ...formData, checklist: newChecklist });
      };

      const handleChecklistChange = (index, value) => {
        const newChecklist = [...formData.checklist];
        newChecklist[index].text = value;
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

      const cancelbutton=()=>{
        setIsEditing(false);
      }
  return (
    <div>
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
            <button onClick={cancelbutton}> Cancel </button>
            
            <button onClick={handleUpdateTask}>Update Task</button>
          </div>
    </div>
  )
}

export default TaskEdit