import { apiFetch } from './api';
import authService from './authService';

const passwordService = {
  add: async (title, password) => {
    if (!title || !password) {
      throw new Error('Title and password are required');
    }

    const response = await apiFetch('/add', {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({ title, password })
    });

    return response;
  },

  getAll: async () => {
    const response = await apiFetch('/passwords', {
      method: 'GET',
      headers: authService.getAuthHeaders()
    });

    return Array.isArray(response) ? response : [];
  },

  get: async (id) => {
    if (!id) {
      throw new Error('Password ID is required');
    }

    const passwords = await passwordService.getAll();
    const password = passwords.find(p => p.id === id);

    if (!password) {
      throw new Error('Password not found');
    }

    return password;
  },

  delete: async (id) => {
    if (!id) {
      throw new Error('Password ID is required');
    }

    const response = await apiFetch(`/password/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders()
    });

    return response;
  },

  update: async (id, newPassword) => {
    if (!id || !newPassword) {
      throw new Error('ID and new password are required');
    }

    const response = await apiFetch(`/password/${id}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({ newPassword })
    });

    return response;
  },

  search: async (query) => {
    if (!query || typeof query !== 'string') {
      throw new Error('Search query is required');
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      return passwordService.getAll();
    }

    try {
      const response = await apiFetch(`/search?q=${encodeURIComponent(trimmedQuery)}`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      return Array.isArray(response) ? response : [];
    } catch (error) {
      if (error.status === 404) {
        return [];
      }
      throw error;
    }
  },

  searchLocal: (passwords, query) => {
    if (!query || query.trim().length === 0) {
      return passwords;
    }

    const lowerQuery = query.toLowerCase();
    return passwords.filter(p => p.title.toLowerCase().includes(lowerQuery));
  }
};

export default passwordService;
