import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';
import styles from "./TaskEdit.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const TaskEdit = ({task, setIsEditing}) => {
    const dispatch = useDispatch();
    const id = task._id;
    console.log(task);
    const authState = useSelector(state => state.auth);
    const [assigned, setAssigned] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        sharedWith: task.sharedWith || [],
        checklist: task.checklist || [] // Ensure checklist is initialized
      });
    const { title, priority, dueDate, sharedWith, checklist } = formData;

    const handleEditChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handlePriorityChange = priority => {
        setFormData({ ...formData, priority });
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

      const handleDateChange = date => {
        setFormData({ ...formData, dueDate: date });
      };
      const toggleChecklist = () => {
        setAssigned(!assigned);
      };
      const completedChecklistItems = checklist.filter(item => item.completed).length;
        const totalChecklistItems = checklist.length;

    const getInitials = email => {
            return email?.slice(0, 2).toUpperCase();
          };

    const onChange = e => {
    if (e.target.name === 'sharedWith') {
      const value = e.target.value.split(',').map(item => item.trim()).filter(item => item);
      setFormData({ ...formData, sharedWith: value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
    const handleAssignEmail = email => {
        if (email && !sharedWith.includes(email)) {
            setFormData({ ...formData, sharedWith: [...sharedWith, email] });
        }
    };
  return (
    <div className={styles.overlay}>
        <div className={styles.user}>
            <div className={styles.main}>

            
        <div className={styles.title}>
        <label>Title <span>*</span></label>
        <input type="text" name="title" value={title} onChange={handleEditChange} placeholder="Enter Task Title" />
      </div>
      <div className={styles.priority}>
        <label>Select Priority <span>*</span></label>
        <div className={styles.prioritybutton}>
          <div
            style={{
              backgroundColor: priority === 'high' ? '#EEECEC' : 'transparent',
              color: '#767575',
              marginRight: '5px'
            }}
            className={styles.high}
          >
            <div className={styles.highPriorityCircle}></div>
            <button type="button" onClick={() => handlePriorityChange('high')}>
              HIGH PRIORITY
            </button>
          </div>
          <div
            style={{
              backgroundColor: priority === 'medium' ? '#EEECEC' : 'transparent',
              color: '#767575',
              marginRight: '5px'
            }}
            className={styles.medium}
          >
            <div className={styles.mediumPriorityCircle}></div>
            <button type="button" onClick={() => handlePriorityChange('medium')}>
              MEDIUM PRIORITY
            </button>
          </div>
          <div
            style={{
              backgroundColor: priority === 'low' ? '#EEECEC' : 'transparent',
              color: '#767575',
              marginRight: '5px'
            }}
            className={styles.low}
          >
            <div className={styles.lowPriorityCircle}></div>
            <button type="button" onClick={() => handlePriorityChange('low')}>
              LOW PRIORITY
            </button>
          </div>
        </div>
      </div>
      <div className={styles.assign}>
        <label>Assign to</label>
        <div className={styles.arrow}>
          <input
            type="text"
            name="sharedWith"
            value={sharedWith.join(', ')}
            onChange={onChange}
            placeholder="Add an assignee"
          />
          {assigned ? <FaChevronDown onClick={toggleChecklist} /> : <FaChevronUp onClick={toggleChecklist} />}
        </div>
      </div>
      {assigned && (
        <div className={styles.peopleAdded}>
          {authState.authData.user.peopleAdded.map(email => (
            <div key={email} className={styles.emailItem}>
              <div>
                <span className={styles.emailInitialsCircle}>
                  {getInitials(email)}
                </span>
                <span>{email}</span>
              </div>
              <button type="button" onClick={() => handleAssignEmail(email)}>Assign</button>
            </div>
          ))}
        </div>
      )}


        <div className={styles.checklist}>
            <div>
                <label>Checklist ({completedChecklistItems}/{totalChecklistItems}) <span>*</span></label>
            </div>
            <ul>
              {formData.checklist.map((item, index) => (
                <li key={index}>
                <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleChecklistItemCompletion(index)}
              />
                  <input 
                    type="text" 
                    value={item.text} 
                    onChange={(e) => handleChecklistChange(index, e.target.value)} 
                    placeholder={`Checklist item ${index + 1}`} 
                  />
                  <button type="button" onClick={() => removeChecklistItem(index)}>
                    <MdDelete color='red'/>
                  </button>
                </li>
              ))}
              <button type="button" onClick={addChecklistItem} className={styles.button2}>
              + Add New 
            </button>
            </ul>
            </div>
                <div className={styles.button3}>
        <div className={styles.dueDate}>
            <DatePicker
                selected={dueDate}
                onChange={handleDateChange}
                placeholderText="Select Due Date"
                className={styles.datep}
            />
        </div>
        <div className={styles.buttons}>
            <button onClick={cancelbutton} className={styles.btn2}> Cancel </button>
            <button onClick={handleUpdateTask} className={styles.btn1}>Update</button>
        </div>
                    </div>
                </div>
          </div>
    </div>
  )
}

export default TaskEdit