const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(data.message || data || 'API Error');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = { ...DEFAULT_HEADERS, ...options.headers };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Unable to reach server');
    }
    throw error;
  }
}

export { apiFetch, API_BASE_URL };
