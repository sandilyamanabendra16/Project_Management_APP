import { ADD_PEOPLE_START, ADD_PEOPLE_SUCCESS, ADD_PEOPLE_FAIL } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PEOPLE_START:
      return { ...state, loading: true, error: null };
    case ADD_PEOPLE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case ADD_PEOPLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducers;
