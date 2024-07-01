import axios from 'axios';
import {BACKEND_URL} from './Constant';

const API = axios.create({ baseURL: BACKEND_URL});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile1')) {
    const profile1String = localStorage.getItem('profile1');
    const profile1Object = JSON.parse(profile1String);
    const { token } = profile1Object;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchTasks = (url) => API.get(url);
export const createTask = (formData) => API.post('/tasks', formData);
export const updateTask = (id, formData) => API.put(`/tasks/${id}`, formData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const findTask = (id) => API.get(`/tasks/${id}`);
