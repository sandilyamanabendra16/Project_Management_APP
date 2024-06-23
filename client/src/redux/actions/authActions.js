import * as AuthApi from '../api/authRequest'

export const logIn=(formData)=> async(dispatch)=>{
    dispatch({type:"Auth_start"})
    
    try{
        const {data}=await AuthApi.logIn(formData)
        dispatch({type:'Auth_success',data:data})
    }
    catch(err){
        console.log(err)
        dispatch({type:"Auth_fail"})
    }
}

export const signUp=(formData)=> async(dispatch)=>{
    dispatch({type:"Auth_start"})
    
    try{
        const {data}=await AuthApi.signUp(formData)
        dispatch({type:'Auth_success',data:data})
    }
    catch(err){
        console.log(err)
        dispatch({type:"Auth_fail"})
    }
}

export const logout=()=> async(dispatch)=>{
    dispatch({type:'LogOut'})
}