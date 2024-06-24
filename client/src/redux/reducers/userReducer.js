// reducers/userReducer.js

import { ADD_PEOPLE } from '../actions/types';

const initialState = {
  user: {},
  // other initial state properties
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PEOPLE:
      return {
        ...state,
        user: {
          ...state.user,
          peopleAdded: action.payload.peopleAdded
        }
      };
    // other cases
    default:
      return state;
  }
};

export default userReducer;
