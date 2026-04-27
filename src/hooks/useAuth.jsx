import { useState, useEffect, createContext, useContext } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('karnetik_token')
    if (token) {
      api.me()
        .then((data) => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('karnetik_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const data = await api.login({ email, password })
    localStorage.setItem('karnetik_token', data.token)
    setUser(data.user)
    return data
  }

  const register = async (body) => {
    const data = await api.register(body)
    return data
  }

  const logout = async () => {
    try {
      await api.logout()
    } catch (e) {
      // Token déjà expiré, on continue
    }
    localStorage.removeItem('karnetik_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}