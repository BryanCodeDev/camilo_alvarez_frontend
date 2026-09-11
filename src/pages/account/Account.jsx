import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { User, Package, Settings, LogOut, CreditCard, MapPin, Bell, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { orderService } from '../../services/products'
import SEO from '../../components/seo/SEO'
import { formatPrice, formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'profile', label: 'Mi perfil', icon: User },
  { id: 'orders', label: 'Mis pedidos', icon: Package },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
  { id: 'security', label: 'Seguridad', icon: CreditCard },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
]

export default function Account() {
  const { user, loading: authLoading, updateProfile, logout, refetch } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    province: user?.province || '',
  })
  const [saving, setSaving] = useState(false)
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [securitySaving, setSecuritySaving] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        province: user.province || '',
      })
    }
  }, [user, authLoading])

  useEffect(() => {
    if (activeTab === 'orders' && !ordersLoading && orders.length === 0) {
      fetchOrders()
    }
  }, [activeTab])

  const fetchOrders = async () => {
    setOrdersLoading(true)
    try {
      const data = await orderService.getMyOrders({ limit: 20 })
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Fetch orders error:', error)
      toast.error('Error al cargar pedidos')
    } finally {
      setOrdersLoading(false)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(formData)
      toast.success('Perfil actualizado correctamente')
      refetch()
    } catch (error) {
      toast.error('Error al actualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  const handleSecuritySubmit = async (e) => {
    e.preventDefault()
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    if (securityForm.newPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setSecuritySaving(true)
    try {
      await updateProfile({ ...formData, currentPassword: securityForm.currentPassword, newPassword: securityForm.newPassword })
      toast.success('Contraseña actualizada')
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al cambiar contraseña')
    } finally {
      setSecuritySaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendiente', color: 'red', bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-600/30' },
      paid: { label: 'Pagado', color: 'blue', bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
      preparing: { label: 'Preparando', color: 'purple', bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-600/30' },
      shipped: { label: 'Enviado', color: 'indigo', bg: 'bg-indigo-600/20', text: 'text-indigo-400', border: 'border-indigo-600/30' },
      delivered: { label: 'Entregado', color: 'green', bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-600/30' },
      cancelled: { label: 'Cancelado', color: 'red', bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-600/30' },
      refunded: { label: 'Reembolsado', color: 'gray', bg: 'bg-gray-600/20', text: 'text-white', border: 'border-gray-600/30' },
    }
    return configs[status] || configs.pending
  }

  const getPaymentStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendiente', color: 'red' },
      approved: { label: 'Aprobado', color: 'green' },
      rejected: { label: 'Rechazado', color: 'red' },
      cancelled: { label: 'Cancelado', color: 'gray' },
      refunded: { label: 'Reembolsado', color: 'blue' },
    }
    return configs[status] || configs.pending
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Mi cuenta | TechStore"
        description="Gestiona tu perfil, pedidos, direcciones y seguridad en TechStore."
        noindex
      />

      <div className="min-h-screen bg-primary-900 pt-20">
        <div className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">Mi cuenta</h1>
            <p className="text-white mt-2">Gestiona tu perfil, pedidos y preferencias</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dark-border">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-bold text-2xl">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-xl text-white">{user?.firstName} {user?.lastName}</h2>
                    <p className="text-white text-sm">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-600/20 text-red-400 text-xs font-medium rounded-full border border-red-600/30">
                      {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </div>
                </div>

                <nav className="space-y-1" aria-label="Secciones de mi cuenta">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                            : 'text-white hover:bg-primary-700 hover:text-white hover:border-red-600/30'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>

                <div className="mt-6 pt-6 border-t border-dark-border">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:text-red-400 hover:bg-red-600/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display font-semibold text-xl text-white mb-6">Información personal</h2>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="label">Nombre *</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="label">Apellido *</label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label">Teléfono</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="input"
                        placeholder="+54 11 0000 0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="label">Dirección</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="input"
                        placeholder="Calle, número, piso, departamento"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="label">Ciudad</label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="province" className="label">Provincia</label>
                        <input
                          id="province"
                          name="province"
                          type="text"
                          value={formData.province}
                          onChange={(e) => setFormData({...formData, province: e.target.value})}
                          className="input"
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto py-3">
                      {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display font-semibold text-xl text-white mb-6">Historial de pedidos</h2>
                  {ordersLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div key={i} className="skeleton h-24 rounded-xl" />
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Package className="w-16 h-16 text-primary-600 mb-4" />
                      <h3 className="font-display font-semibold text-xl text-white mb-2">No tienes pedidos aún</h3>
                      <p className="text-white mb-6">Tu historial de compras aparecerá aquí</p>
                      <Link to="/tienda" className="btn-primary">Explorar productos</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => {
                        const statusConfig = getStatusConfig(order.status)
                        const paymentConfig = getPaymentStatusConfig(order.payment_status)
                        return (
                          <Link
                            key={order.id}
                            to={`/cuenta/pedido/${order.id}`}
                            className="block p-4 bg-primary-700/50 border border-dark-border rounded-xl hover:border-red-600/50 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-primary-800 flex items-center justify-center">
                                  <Package className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                  <p className="font-medium text-white">Pedido #{order.order_number}</p>
                                  <p className="text-white text-sm">{formatDate(order.created_at)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 sm:ml-auto">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                  {statusConfig.label}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentConfig.color === 'green' ? 'bg-green-600/20 text-green-400 border border-green-600/30' : paymentConfig.color === 'red' ? 'bg-red-600/20 text-red-400 border border-red-600/30' : 'bg-red-600/20 text-red-400 border border-red-600/30'}`}>
                                  {paymentConfig.label}
                                </span>
                                <span className="font-display font-bold text-lg text-red-400">{formatPrice(order.total)}</span>
                                <ChevronRight className="w-5 h-5 text-primary-500" />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display font-semibold text-xl text-white mb-6">Direcciones guardadas</h2>
                  <p className="text-white mb-6">Gestiona tus direcciones de envío para compras más rápidas.</p>
                  <div className="space-y-4">
                    {(user?.address ? [{ ...formData, isDefault: true }] : []).map((addr, i) => (
                      <div key={i} className="p-4 bg-primary-700/50 border border-dark-border rounded-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-white">{addr.address}</p>
                            <p className="text-white text-sm">{addr.city}, {addr.province}</p>
                          </div>
                          <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs font-medium rounded-full border border-red-600/30">Predeterminada</span>
                        </div>
                      </div>
                    ))}
                    {(!user?.address || user?.address.length === 0) && (
                      <p className="text-white text-center py-8">No tienes direcciones guardadas</p>
                    )}
                  </div>
                  <button className="btn-outline mt-6">Agregar dirección</button>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display font-semibold text-xl text-white mb-6">Seguridad</h2>
                  <form onSubmit={handleSecuritySubmit} className="space-y-6 max-w-md">
                    <div>
                      <label htmlFor="currentPassword" className="label">Contraseña actual *</label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="label">Nueva contraseña *</label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                        className="input"
                        required
                        minLength={8}
                      />
                      <p className="text-white text-xs mt-1">Mínimo 8 caracteres</p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="label">Confirmar nueva contraseña *</label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                        className="input"
                        required
                      />
                    </div>
                    <button type="submit" disabled={securitySaving} className="btn-primary w-full py-3">
                      {securitySaving ? 'Actualizando...' : 'Cambiar contraseña'}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-800/50 border border-dark-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display font-semibold text-xl text-white mb-6">Notificaciones</h2>
                  <p className="text-white mb-6">Configura cómo quieres recibir actualizaciones.</p>
                  <div className="space-y-4">
                    {['Pedidos y envíos', 'Ofertas y promociones', 'Novedades y lanzamientos', 'Newsletter semanal'].map((item, i) => (
                      <label key={i} className="flex items-center justify-between p-4 bg-primary-700/50 border border-dark-border rounded-xl cursor-pointer">
                        <span className="text-white">{item}</span>
                        <input
                          type="checkbox"
                          defaultChecked={i < 2}
                          className="w-5 h-5 text-red-600 border-dark-border bg-primary-700 focus:ring-red-500 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}