// utils/auth.js
const auth = {
    login: (token) => {
      localStorage.setItem('token', token);
    },
  
    logout: () => {
      localStorage.removeItem('token');
    },
  
    getToken: () => {
      return localStorage.getItem('token');
    },
  
    isAuthenticated: () => {
      const token = auth.getToken();
      return token !== null;
    },
  };
  
  export default auth;
  