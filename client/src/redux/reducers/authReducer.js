const initialState = {
    authData: JSON.parse(localStorage.getItem('profile1')) || null,
    loading: false,
    error: false,
    isAuthenticated: false,
    updateLoading: false, // Consistent naming for update loading state
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'AUTH_START':
        return { ...state, loading: true, error: false };
      case 'AUTH_SUCCESS':
        localStorage.setItem('profile1', JSON.stringify({ ...action.payload }));
        return { ...state, authData: action.payload, loading: false, error: false, isAuthenticated: true };
      case 'AUTH_FAIL':
        return { ...state, loading: false, error: true, isAuthenticated: false };
      case 'FETCHING_START':
        return { ...state, loading: true, error: false };
      case 'FETCHED_USER':
        return { ...state, authData: action.payload, loading: false, error: false, isAuthenticated: true };
      case 'FETCH_FAILURE':
        localStorage.removeItem('profile');
        return { ...state, loading: false, error: true, isAuthenticated: false };
      case 'UPDATE_START':
        return { ...state, updateLoading: true, error: false };
      case 'UPDATE_SUCCESS':
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
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
  