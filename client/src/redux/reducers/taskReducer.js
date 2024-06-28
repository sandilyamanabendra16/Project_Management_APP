import {
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  loading: false,
  error: false
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_TASKS_START:
          return { ...state, loading: true, error: false };
      case 'FETCH_TASKS_REQUEST':
          return {
              ...state,
              loading: true,
              error: null,
            };
      case FETCH_TASKS_SUCCESS:
          return { ...state, tasks: action.data, loading: false, error: false };
      case FETCH_TASKS_FAIL:
          return { ...state, loading: false, error: true };
      case 'FIND_TASK_START':
        return {...state, loading:true, error:false};
      case 'FIND_TASK_SUCCESS':
        return {...state, tasks: action.data, loading:false, error:false};
      case 'FIND_TASK_FAIL':
         return {...state, loading:false, error:true}
      case CREATE_TASK_SUCCESS:
          return { ...state, tasks: [...state.tasks, action.data], loading: false, error: false };
      case UPDATE_TASK_SUCCESS:
          return {
              ...state,
              tasks: state.tasks.map(task => task._id === action.data._id ? action.data : task),
              loading: false,
              error: false
          };
      case DELETE_TASK_SUCCESS:
          return {
              ...state,
              tasks: state.tasks.filter(task => task._id !== action.id),
              loading: false,
              error: false
          };
      default:
          return state;
  }
};

export default taskReducer;
