const API_URL = import.meta.env.VITE_API_URL || 'https://api.karnetik.com/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('karnetik_token')

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw { status: response.status, data }
  }

  return data
}

export const api = {
  // Auth publiques
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  forgotPassword: (body) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(body) }),
  resetPassword: (body) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify(body) }),

  // Auth protégées
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  sendVerification: () => request('/auth/email/verify/send', { method: 'POST' }),
  deleteAccount: (body) => request('/auth/account', { method: 'DELETE', body: JSON.stringify(body) }),
}