import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile1')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile1')).token}`;
    }
  
    return req;
  });
  
export const fetchTasks = () => API.get('/tasks');
export const createTask = (formData) => API.post('/tasks', formData);
export const updateTask = (id, formData) => API.put(`/tasks/${id}`, formData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
