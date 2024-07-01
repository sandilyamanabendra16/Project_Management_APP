import axios from 'axios'
import { BACKEND_URL} from './Constant';

const API= axios.create({ baseURL: BACKEND_URL});

API.interceptors.request.use((req) => {
    
    if (localStorage.getItem('profile1')) {
        const profile1String = localStorage.getItem('profile1');
        const profile1Object = JSON.parse(profile1String);
        const { token } = profile1Object;
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
export const getUser = (userId) => API.get(`/users/${userId}`) ;

export const updateUser=(id, formData)=>API.put(`/users/${id}`, formData);

// export const addPeople=(id, people)=>API.post(`/users/add/${id}`, {people});
export const addPeople=(userId, email)=>API.post(`/users/add/${userId}`, { email });