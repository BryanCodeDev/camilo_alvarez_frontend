import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, Settings, LogOut, BarChart2, Box } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const adminNavItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/productos', label: 'Productos', icon: Package },
  { path: '/admin/categorias', label: 'Categorías', icon: Tag },
  { path: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { path: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { path: '/admin/configuracion', label: 'Configuración', icon: Settings },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-primary-900 flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed lg:relative z-50 w-72 bg-primary-800 border-r border-dark-border flex flex-col h-screen transition-transform duration-300"
      >
        <div className="p-6 border-b border-dark-border">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center">
              <Box className="w-6 h-6 text-primary-900" />
            </div>
            <span className="font-display font-bold text-xl text-white">TechStore Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                    : 'text-white hover:bg-primary-700 hover:text-white hover:border-red-600/30'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-white">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:text-red-400 hover:bg-primary-700 rounded-xl transition-colors mt-2"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col lg:ml-0">
        <header className="lg:hidden bg-primary-800 border-b border-dark-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white hover:bg-primary-700 transition-colors"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-display font-bold text-xl text-white">TechStore Admin</span>
          <div className="w-10" />
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}