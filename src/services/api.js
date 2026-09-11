import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== '/login' && window.location.pathname !== '/registro') {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      }
    }
    return Promise.reject(error)
  }
)

export default api