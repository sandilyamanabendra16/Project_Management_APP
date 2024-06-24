import axios from 'axios'

const API= axios.create({ baseURL:'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile1')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile1')).token}`;
    }
    return req;
  });

export const getUser = (userId) => API.get(`/users/${userId}`) ;

export const updateUser=(id, formData)=>API.patch(`/users/${id}`, formData);

export const addEmail=(id,people)=>API.put(`/users/add/${id}`, people);