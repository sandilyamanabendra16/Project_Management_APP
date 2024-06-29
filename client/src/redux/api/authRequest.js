import axios from 'axios'

const API= axios.create({ baseURL:'https://project-management-app-gqr7.onrender.com' })

export const logIn=(FormData)=>API.post('/auth/login', FormData)
export const signUp=(FormData)=>API.post('/auth/register', FormData)