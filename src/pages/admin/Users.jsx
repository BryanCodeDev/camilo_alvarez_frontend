import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, Shield, UserCheck, UserX, Loader2 } from 'lucide-react'
import SEO from '../../components/seo/SEO'
import { adminUserService } from '../../services/admin'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [currentPage, role])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = { page: currentPage, limit: 20, ...(role && { role }), ...(search && { search }) }
      const data = await adminUserService.getAll(params)
      setUsers(data.users || [])
      setTotalPages(data.pagination?.totalPages || 1)
    } catch (error) {
      console.error('Fetch users error:', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  const openUser = async (user) => {
    setSelectedUser(user)
    setUserModalOpen(true)
  }

  const handleToggleStatus = async (user) => {
    try {
      await adminUserService.toggleStatus(user.id)
      toast.success(`Usuario ${user.isActive ? 'desactivado' : 'activado'}`)
      fetchUsers()
    } catch (error) {
      console.error('Toggle user status error:', error)
      toast.error('Error al actualizar usuario')
    }
  }

  const handleChangeRole = async (user, newRole) => {
    setSaving(true)
    try {
      await adminUserService.changeRole(user.id, newRole)
      toast.success(`Rol cambiado a ${newRole === 'admin' ? 'administrador' : 'usuario'}`)
      fetchUsers()
    } catch (error) {
      console.error('Change role error:', error)
      toast.error('Error al cambiar rol')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <SEO
        title="Usuarios | TechStore Admin"
        description="Gestiona los usuarios de TechStore."
        noindex
      />

      <div className="space-y-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">Usuarios</h1>
            <p className="text-white mt-2">Gestiona cuentas, roles y permisos</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 bg-primary-800/50 border border-dark-border rounded-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, email o teléfono..."
                className="w-full pl-12 pr-4 py-3 bg-primary-700 border border-dark-border rounded-xl text-white placeholder:text-primary-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>
            <select
              value={role}
              onChange={(e) => { setRole(e.target.value); setCurrentPage(1) }}
              className="input py-3 px-4 bg-primary-700"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuarios</option>
            </select>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary-800/50 border border-dark-border rounded-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-6 space-y-4" role="list" aria-busy="true">
              {[...Array(8)].map((_, i) => (
                <motion.div key={i} className="skeleton h-20 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto min-w-0">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-primary-900/50 text-left text-white">
                    <th className="py-4 px-6 font-medium">Usuario</th>
                    <th className="py-4 px-6 font-medium">Email</th>
                    <th className="py-4 px-6 font-medium">Rol</th>
                    <th className="py-4 px-6 font-medium">Estado</th>
                    <th className="py-4 px-6 font-medium">Registro</th>
                    <th className="py-4 px-6 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="border-b border-dark-border/50 hover:bg-primary-900/50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                            <p className="text-white text-xs">{user.phone || 'Sin teléfono'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white truncate max-w-xs">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-gold-600/20 text-gold-400 border border-gold-600/30' : 'bg-blue-600/20 text-blue-400 border border-blue-600/30'}`}>
                          {user.role === 'admin' ? 'Admin' : 'Usuario'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-red-600/20 text-red-400 border border-red-600/30'}`}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white whitespace-nowrap">{formatDate(user.createdAt)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openUser(user)} className="p-2 text-white hover:text-gold-400 hover:bg-primary-700 rounded-lg transition-colors" aria-label={`Ver ${user.email}`}>
                            <Eye className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleToggleStatus(user)} className={`p-2 rounded-lg transition-colors ${user.isActive ? 'text-white hover:text-gold-400 hover:bg-gold-600/10' : 'text-white hover:text-green-400 hover:bg-green-600/10'}`} aria-label={`${user.isActive ? 'Desactivar' : 'Activar'} ${user.email}`}>
                            {user.isActive ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-4 sm:p-6 border-t border-dark-border">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-secondary px-4 py-2 min-h-10 disabled:opacity-50">Anterior</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) pageNum = i + 1
                else if (currentPage <= 3) pageNum = i + 1
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
                else pageNum = currentPage - 2 + i
                return (
                  <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum ? 'bg-gold-600 text-primary-900' : 'bg-primary-700 text-white hover:bg-primary-600 hover:text-white border border-dark-border'}`}>
                    {pageNum}
                  </button>
                )
              })}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-secondary px-4 py-2 min-h-10 disabled:opacity-50">Siguiente</button>
            </div>
          )}
        </motion.div>
      </div>

      {userModalOpen && selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-primary-800 border border-dark-border rounded-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-dark-border">
              <h2 className="font-display font-bold text-xl text-white">Detalles del usuario</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-white text-sm">Nombre</p>
                <p className="font-medium text-white">{selectedUser.firstName} {selectedUser.lastName}</p>
              </div>
              <div>
                <p className="text-white text-sm">Email</p>
                <p className="font-medium text-white">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-white text-sm">Teléfono</p>
                <p className="font-medium text-white">{selectedUser.phone || 'No registrado'}</p>
              </div>
              <div>
                <p className="text-white text-sm">Rol</p>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    value={selectedUser.role}
                    onChange={(e) => handleChangeRole(selectedUser, e.target.value)}
                    className="input py-2 px-3 bg-primary-700 text-sm"
                    disabled={saving}
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                  {saving && <Loader2 className="w-5 h-5 animate-spin text-gold-500" />}
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-dark-border">
                <button onClick={() => setUserModalOpen(false)} className="btn-secondary">Cerrar</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}