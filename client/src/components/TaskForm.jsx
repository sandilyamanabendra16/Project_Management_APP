import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/actions/taskActions';

const TaskForm = ({setAddtasks}) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'low',
    dueDate: '',
    sharedWidth: [],
  });
  const [checklist, setChecklist] = useState([]);
  const [checklistItem, setChecklistItem] = useState('');

  const { title, priority, dueDate } = formData;

  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChecklistChange = e => setChecklistItem(e.target.value);

  const addChecklistItem = () => {
    if (checklistItem.trim()) {
      setChecklist([...checklist, { text: checklistItem, completed: false }]);
      setChecklistItem('');
    }
  };

  const removeChecklistItem = index => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const onSubmit = e => {
    e.preventDefault();
    const taskData = {
      ...formData,
      checklist
    };
    dispatch(createTask(taskData));
    setFormData({
      title: '',
      priority: 'low',
      dueDate: ''
    });
    setChecklist([]);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={onChange} required />
      </div>
      <div>
        <label>Priority</label>
        <select name="priority" value={priority} onChange={onChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={dueDate} onChange={onChange} />
      </div>
      <div>
        <label>Checklist</label>
        <input
          type="text"
          value={checklistItem}
          onChange={onChecklistChange}
          placeholder="Add a checklist item"
        />
        <button type="button" onClick={addChecklistItem}>
          Add
        </button>
      </div>
      <div>
        {checklist.map((item, index) => (
          <div key={index}>
            <span>{item.text}</span>
            <button type="button" onClick={() => removeChecklistItem(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={()=>setAddtasks(false)}> Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
