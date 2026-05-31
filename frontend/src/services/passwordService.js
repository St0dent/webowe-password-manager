const API_URL = 'http://localhost:3000';

export const passwordService = {
  addPassword: async (title, password, token) => {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title, password })
    });
    return response.json();
  },

  getPasswords: async (token) => {
    const response = await fetch(`${API_URL}/passwords`, {
      method: 'GET',
      headers: { 'Authorization': token }
    });
    return response.json();
  },

  deletePassword: async (id, token) => {
    const response = await fetch(`${API_URL}/password/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    });
    return response.json();
  },

  updatePassword: async (id, newPassword, token) => {
    const response = await fetch(`${API_URL}/password/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ newPassword })
    });
    return response.json();
  },

  searchPasswords: async (query, token) => {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 'Authorization': token }
    });
    return response.json();
  }
};
