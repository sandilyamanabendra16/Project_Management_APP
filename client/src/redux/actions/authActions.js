import * as AuthApi from '../api/authRequest'

export const logIn=(formData)=> async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    
    try{
        const {data}=await AuthApi.logIn(formData)
        dispatch({type:'AUTH_SUCCESS',payload:data})
    }
    catch(err){
        console.log(err)
        dispatch({type:'AUTH_FAIL'})
    }
}

export const signUp=(formData)=> async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    
    try{
        const {data}=await AuthApi.signUp(formData)
        dispatch({type:'AUTH_SUCCESS',payload:data})
    }
    catch(err){
        console.log(err)
        dispatch({type:'AUTH_FAIL'})
    }
}

export const logout=()=> async(dispatch)=>{
    dispatch({type:'LOGOUT'})
}

export const initializeAuth = () => {
  return {
    type: 'AUTH_SUCCESS',
    payload: JSON.parse(localStorage.getItem('profile1'))
  };
};
