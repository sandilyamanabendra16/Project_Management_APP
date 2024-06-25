const initialState = {
    authData: null,
    loading: false,
    error: false,
    isAuthenticated: false,
    updateLoading: false,
    userAlreadyExists: false,
    invalidEmailorPassword: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'AUTH_START':
        return { ...state, loading: true, error: false, userAlreadyExists: false,userAlreadyExists: false, };
      case 'AUTH_SUCCESS':
        localStorage.setItem('profile1', JSON.stringify({ ...action.payload }));
        return { ...state, authData: action.payload, loading: false, error: false, isAuthenticated: true, userAlreadyExists: false, };
      case 'AUTH_FAIL':
        return { ...state, loading: false, error: action.payload, isAuthenticated: false };
      case 'USER_ALREADY_EXISTS':
        return {
        ...state,
        userAlreadyExists: true,
      };
      case 'RESET_USER_ALREADY_EXISTS':
      return {
        ...state,
        userAlreadyExists: false, invalidEmailorPassword: false,
      };
      case 'INVALID_EMAIL_PASSWORD':
        return {...state, invalidEmailorPassword:true}
      case 'FETCHING_START':
        return { ...state, loading: true, error: false };
      case 'FETCHED_USER':
        return { ...state, authData: action.payload, loading: false, error: false, isAuthenticated: true };
      case 'FETCH_FAILURE':
        localStorage.removeItem('profile1');
        return { ...state, loading: false, error: true, isAuthenticated: false };
      case 'UPDATE_START':
        return { ...state, updateLoading: true, error: false };
      case 'UPDATE_SUCCESS':
        localStorage.setItem('profile1', JSON.stringify({ ...action.payload }));
        return { ...state, authData: action.payload, updateLoading: false, error: false };
      case 'UPDATE_FAIL':
        return { ...state, updateLoading: false, error: true };
      case 'LOGOUT':
        localStorage.clear();
        return { ...state, authData: null, loading: false, error: false, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  