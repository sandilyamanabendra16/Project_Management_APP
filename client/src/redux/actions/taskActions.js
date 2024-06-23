
import * as TaskApi from '../api/taskRequest';
// Action Types
export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAIL = 'FETCH_TASKS_FAIL';

export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';

// Fetch Tasks
export const fetchTasks = () => async dispatch => {
  
    dispatch({ type: FETCH_TASKS_START });
    try {
        const {data} = await TaskApi.fetchTasks();
        dispatch({ type: FETCH_TASKS_SUCCESS, data: data });
    } catch (err) {
        dispatch({ type: FETCH_TASKS_FAIL });
    }
};

// Create Task
export const createTask = (formData) => async dispatch => {
    try {
        const {data} = await TaskApi.createTask(formData);
        dispatch({ type: CREATE_TASK_SUCCESS, data: data });
    } catch (err) {
        console.log(err);
    }
};

// Update Task
export const updateTask = (id, formData) => async dispatch => {
    try {
        const {data}= await TaskApi.updateTask(id, formData);
        dispatch({ type: UPDATE_TASK_SUCCESS, data: data });
    } catch (err) {
        console.log(err);
    }
};

// Delete Task
export const deleteTask = (id) => async dispatch => {
    try {
        await TaskApi.deleteTask(id);
        dispatch({ type: DELETE_TASK_SUCCESS, id });
    } catch (err) {
        console.log(err);
    }
};
