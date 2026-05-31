const API_URL = 'http://localhost:3000';

export const authService = {
  register: async (login, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    return response.text();
  },

  login: async (login, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  logout: async (token) => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: { 'Authorization': token }
    });
    localStorage.removeItem('token');
    return response.json();
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};
