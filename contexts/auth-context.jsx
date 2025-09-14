"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // Mock authentication - accept any username, password must be 'test123'
    if (password !== "test123") {
      throw new Error('Invalid credentials. Password must be "test123"')
    }

    // Mock user data
    const userData = {
      id: "1",
      username,
      email: `${username}@company.com`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      role: "Contract Manager",
    }

    // Mock JWT token
    const mockToken = `mock_jwt_${Date.now()}_${username}`

    // Store in localStorage
    localStorage.setItem("auth_token", mockToken)
    localStorage.setItem("user_data", JSON.stringify(userData))

    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
