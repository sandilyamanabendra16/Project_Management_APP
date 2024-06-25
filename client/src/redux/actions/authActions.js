import * as AuthApi from '../api/authRequest'

export const logIn=(formData)=> async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    
    try{
        const {data}=await AuthApi.logIn(formData)
        dispatch({type:'AUTH_SUCCESS',payload:data})
    }
    catch(err){
      if (err.response && err.response.data.message === 'Invalid email or password.') {
        dispatch({ type: 'INVALID_EMAIL_PASSWORD' });
      }else{
        console.log(err)
        dispatch({type:'AUTH_FAIL'})
    }}
}

export const signUp=(formData)=> async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    
    try{
        const {data}=await AuthApi.signUp(formData);
        dispatch({type:'AUTH_SUCCESS',payload:data})
    }
    catch(err){
      if (err.response.data.message === "User already registered.") {
        dispatch({ type: 'USER_ALREADY_EXISTS' });
      }else{
        console.log(err)
        dispatch({type:'AUTH_FAIL'})
    }
  }
}

export const logout=()=> async(dispatch)=>{
    dispatch({type:'LOGOUT'})
}

export const resetUserAlreadyExists = () => ({
  type: 'RESET_USER_ALREADY_EXISTS'
});
