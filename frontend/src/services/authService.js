import { apiFetch } from './api';

const TOKEN_STORAGE_KEY = 'auth_token';

const authService = {
  register: async (login, password) => {
    if (!login || !password) {
      throw new Error('Login and password are required');
    }

    const response = await apiFetch('/register', {
      method: 'POST',
      body: JSON.stringify({ login, password })
    });

    return response;
  },

  login: async (login, password) => {
    if (!login || !password) {
      throw new Error('Login and password are required');
    }

    const data = await apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ login, password })
    });

    if (data && data.token) {
      authService.setToken(data.token);
    }

    return data;
  },

  logout: async () => {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await apiFetch('/logout', {
        method: 'POST',
        headers: {
          'Authorization': token
        }
      });

      authService.clearToken();
      return response;
    } catch (error) {
      authService.clearToken();
      throw error;
    }
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  setToken: (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  clearToken: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  isAuthenticated: () => {
    return !!authService.getToken();
  },

  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? { 'Authorization': token } : {};
  }
};

export default authService;
