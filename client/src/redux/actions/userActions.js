import * as UserApi from "../api/userRequest";
import axios from 'axios';
import { ADD_PEOPLE } from './types';

export const ADD_PEOPLE_START = 'ADD_PEOPLE_START';
export const ADD_PEOPLE_SUCCESS = 'ADD_PEOPLE_SUCCESS';
export const ADD_PEOPLE_FAIL = 'ADD_PEOPLE_FAIL';
export const ADD_PEOPLE_DUPLICATE = 'ADD_PEOPLE_DUPLICATE';  // New action type

export const getUser = (userId) => async (dispatch) => {
    dispatch({ type: "FETCHING_START" });
    try {
        const { data } = await UserApi.getUser(userId);
        dispatch({ type: "FETCHED_USER", data: data });
    } catch (err) {
        dispatch({ type: "FETCH_FAILURE" });
    }
};

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATE_START" });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err.response)
        if (err.response && err.response.data.error === 'Old password is incorrect') {
            dispatch({ type: 'INVALID_PASSWORD' });
          }
        dispatch({ type: "UPDATE_FAILURE" });
    }
};


//Add People
// export const addPeople = (id, people) => async dispatch => {
//   dispatch({ type: ADD_PEOPLE_START });
//   try {
//     const { data } = await UserApi.addPeople(id, people);
//     dispatch({ type: ADD_PEOPLE_SUCCESS, data: data });
//   } catch (err) {
//       dispatch({ type: ADD_PEOPLE_FAIL });
//     }
//   };



export const addPeople = (userId, email) => async dispatch => {
  try {
    const { data } = await UserApi.addPeople(userId, email);
    dispatch({
      type: ADD_PEOPLE,
      payload: data,
    });
  } catch (error) {
    console.error('Error adding people:', error);
  }
};

