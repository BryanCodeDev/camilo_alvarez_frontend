import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-600 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-600 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}