const API_BASE = '/api'

async function post(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

export function loginApi(username, password) {
  return post('/auth/login', { username, password })
}

export function refreshApi(refreshToken) {
  return post('/auth/refresh', { refresh_token: refreshToken })
}
