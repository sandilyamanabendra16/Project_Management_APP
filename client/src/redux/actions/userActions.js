import * as UserApi from "../api/userRequest";

export const ADD_PEOPLE_START = 'ADD_PEOPLE_START';
export const ADD_PEOPLE_SUCCESS = 'ADD_PEOPLE_SUCCESS';
export const ADD_PEOPLE_FAIL = 'ADD_PEOPLE_FAIL';

export const getUser=(userId)=> async(dispatch)=>{
    dispatch({type: "FETCHING_START"})
    try{
        const {data}= await UserApi.getUser(userId);
        dispatch({type:"FETCHED_USER", payload: data})
    }catch(err){
        dispatch({type:"FETCH_FAILURE"})
    }
}
export const updateUser=(id, formData)=> async(dispatch)=>{
    dispatch({type:"UPDATE_START"})
    try{
        const {data}= await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATE_SUCCESS", payload: data})
    }
    catch(err){
        dispatch({type:"UPDATE_FAILURE"})
    }
}


export const addEmail=(id, people)=> async(dispatch)=>{
    dispatch({type:ADD_PEOPLE_START});
    try{
        const {data}= await UserApi.addEmail(id, people);
        dispatch({type:ADD_PEOPLE_SUCCESS, payload:data})
    }catch(err){
        dispatch({type:ADD_PEOPLE_FAIL});
    }
}