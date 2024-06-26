import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPeople } from '../redux/actions/userActions';
import styles from "./AddUser.module.css";

const AddUser = ({setAdduseremail}) => {
  const dispatch = useDispatch();
  const [people, setPeople] = useState('');
  const [submit, setSubmit] = useState(false);
  const authState = useSelector(state => state.auth);

  const handleChange = (e) => {
    setPeople(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = authState.authData?.user?._id;
    if (id) {
      dispatch(addPeople(id, people));
      setSubmit(true);
    } else {
      console.error('User ID is null');
    }
  };

  return (
    <div className={styles.main}>
      {!submit ? (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div> Add people to the board</div>
            <input type="email" value={people} onChange={handleChange} placeholder="Enter the email" />
            <div><button type="button" onClick={() => setAdduseremail(false)} className={styles.btn1}>Cancel</button>
          <button type="submit" className={styles.btn2}>Add Email</button></div>
          
        </form>
      ) : (
        <div className={styles.added}>
          <h4>{people} added to the board</h4>
          <button onClick={() => setAdduseremail(false)} className={styles.btn2}>Okay, got it!</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
