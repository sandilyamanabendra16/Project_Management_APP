const initialState = {
    authData: null,
    loading: false,
    error: false,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'Auth_start':
        return { ...state, loading: true, error: false };
      case 'Auth_success':
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, authData: action.data, loading: false, error: false, isAuthenticated: true };
      case 'Auth_fail':
        return { ...state, loading: false, error: true, isAuthenticated: false };
        case 'FETCHING_START':
            return {...state, loading:false, error: false};
        case 'FETCHED_USER':
            return {...state, userData: action.data,loading:false, error:false, isAuthenticated: true };
        case 'FETCH_FAILURE':
            localStorage.removeItem('profile');
            return {...state, loading: false, error: true, isAuthenticated: false };
        case 'UPDATE_START':
                return {...state, updateLoding: true, error:false};
        case 'UPDATE_SUCCESS': 
                localStorage.setItem('profile',JSON.stringify({...action?.data}))
                return { ...state, authData: action.data, updateLoding: false, error: false};
        case 'UPDATE_FAILURE':
                return { ...state, updateLoding: false, error:true}
        case 'LogOut':
            localStorage.clear();
        return { ...state, authData: null, loading: false, error: false, isAuthenticated: false };
        default:
        return state;
    }
  };
  
  export default authReducer;
  
            