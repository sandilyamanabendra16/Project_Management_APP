import axios from 'axios'
import { BACKEND_URL } from './Constant'

const API= axios.create({ baseURL: BACKEND_URL});

export const logIn=(FormData)=>API.post('/auth/login', FormData)
export const signUp=(FormData)=>API.post('/auth/register', FormData)