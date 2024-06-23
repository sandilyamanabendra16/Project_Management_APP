import * as UserApi from "../api/userRequest";


export const getUser=(userId)=> async(dispatch)=>{
    dispatch({type: "FETCHING_START"})
    try{
        const {data}= await UserApi.getUser(userId);
        dispatch({type:"FETCHED_USER", data: data})
    }catch(err){
        dispatch({type:"FETCH_FAILURE"})
    }
}
export const updateUser=(id, formData)=> async(dispatch)=>{
    dispatch({type:"UPDATE_START"})
    try{
        const {data}= await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATE_SUCCESS", data: data})
    }
    catch(err){
        dispatch({type:"UPDATE_FAILURE"})
    }
}
