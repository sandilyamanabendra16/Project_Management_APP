import auth from './auth';

const apiBaseUrl = 'http://localhost:4000';

const api = {
  async login(email, password) {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    auth.login(data.token);
    return data;
  },

  async getTasks(filter) {
    const response = await fetch(`${apiBaseUrl}/tasks?filter=${filter}`, {
      headers: { 'Authorization': `Bearer ${auth.getToken()}` }
    });
    const data = await response.json();
    return data;
  },

  async createTask(task) {
    const response = await fetch(`${apiBaseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
  },

  async updateTask(id, task) {
    const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
  },

  async deleteTask(id) {
    const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    });
    const data = await response.json();
    return data;
  },

  async getUser() {
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    });
    const data = await response.json();
    return data;
  },

  async updateUser(user) {
    const response = await fetch(`${apiBaseUrl}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  },
};

export default api;
