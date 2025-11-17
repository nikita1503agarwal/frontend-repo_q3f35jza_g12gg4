const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: (email) => request(`/profile?email=${encodeURIComponent(email)}`),
  updateProfile: (data) => request('/profile', { method: 'PUT', body: JSON.stringify(data) }),
  createRequest: (data) => request('/request', { method: 'POST', body: JSON.stringify(data) }),
  listRequests: (email) => request(`/requests?email=${encodeURIComponent(email)}`),
};
