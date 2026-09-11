import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { Search, Menu, X, User, ShoppingCart, Heart, ChevronDown, LayoutDashboard, LogOut, Headphones, Smartphone, Monitor, Gamepad2, Watch, Plug, Zap, Keyboard, Bot } from 'lucide-react'
import CartDrawer from '../cart/CartDrawer'

const MotionLink = motion.create(Link)

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/tienda', label: 'Tienda' },
  { path: '/tienda?category=ofertas', label: 'Ofertas' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/contacto', label: 'Contacto' },
]

const categories = [
  { slug: 'audio', name: 'Audio', Icon: Headphones },
  { slug: 'smartphones', name: 'Smartphones', Icon: Smartphone },
  { slug: 'computadores', name: 'Computadores', Icon: Monitor },
  { slug: 'gaming', name: 'Gaming', Icon: Gamepad2 },
  { slug: 'smartwatch', name: 'Smartwatch', Icon: Watch },
  { slug: 'accesorios', name: 'Accesorios', Icon: Plug },
  { slug: 'cargadores', name: 'Cargadores', Icon: Zap },
  { slug: 'perifericos', name: 'Periféricos', Icon: Keyboard },
  { slug: 'gadgets', name: 'Gadgets', Icon: Bot },
]

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { itemCount, toggleCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary-900/95 backdrop-blur-md border-b border-dark-border shadow-card'
          : 'bg-transparent'
      }`}>
        <nav className="container-custom" aria-label="Navegación principal">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 z-10" aria-label="TechStore - Inicio">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              >
                <svg className="w-6 h-6 text-primary-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </motion.div>
              <span className="font-display font-bold text-xl lg:text-2xl text-white hidden sm:block">TechStore</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 whitespace-nowrap">
              {navLinks.map((link, index) => (
                <MotionLink
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 relative ${
                    location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                      ? 'text-red-400'
                      : 'text-white hover:text-red-400'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  {link.path === '/tienda' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setDropdownOpen(dropdownOpen === 'categories' ? null : 'categories')
                      }}
                      className="flex items-center gap-1 ml-1"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen === 'categories'}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === 'categories' ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  )}
                </MotionLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-800 border border-dark-border rounded-full text-white hover:border-red-600 hover:text-white transition-all duration-300"
                  aria-label="Buscar productos"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Buscar</span>
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute right-0 top-full mt-2 w-72 max-w-[90vw]"
                    >
                      <form onSubmit={handleSearch} className="relative">
                        <input
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Buscar productos..."
                          className="w-full px-4 py-3 pr-12 bg-primary-800 border border-dark-border rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:border-red-500"
                          autoFocus
                          aria-label="Buscar productos"
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white hover:text-red-400"
                          aria-label="Buscar"
                        >
                          <Search className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDropdownOpen(dropdownOpen === 'user' ? null : 'user')
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-800 border border-dark-border rounded-full hover:border-red-600 transition-all duration-300"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === 'user'}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-white">{user?.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === 'user' ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-56 max-w-[90vw] bg-primary-800 border border-dark-border rounded-xl py-2 shadow-card"
                      >
                        <Link to="/cuenta" className="flex items-center gap-3 px-4 py-2 text-white hover:text-red-400 hover:bg-primary-700" onClick={() => setDropdownOpen(null)}>
                          <User className="w-5 h-5" aria-hidden="true" />
                          Mi cuenta
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2 text-white hover:text-red-400 hover:bg-primary-700" onClick={() => setDropdownOpen(null)}>
                            <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
                            Panel Admin
                          </Link>
                        )}
                        <hr className="my-2 border-dark-border" />
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:text-red-400 hover:bg-primary-700 text-left">
                          <LogOut className="w-5 h-5" aria-hidden="true" />
                          Cerrar sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-red-400 transition-colors">Iniciar sesión</Link>
                  <Link to="/registro" className="btn-primary text-sm">Registrarse</Link>
                </div>
              )}

              <Link to="/carrito" onClick={toggleCart} className="relative p-2 text-white hover:text-red-400 transition-colors" aria-label={`Carrito: ${itemCount} productos`}>
                <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {dropdownOpen === 'categories' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute left-0 right-0 top-full bg-primary-900 border-b border-dark-border py-6 lg:static lg:bg-transparent lg:border-0 lg:py-0 lg:opacity-100 lg:h-auto"
              >
                <div className="container-custom grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {categories.map((cat, index) => (
                    <Link
                      key={cat.slug}
                      to={`/categoria/${cat.slug}`}
                      className="flex flex-col items-center gap-2 p-4 bg-primary-800 border border-dark-border rounded-xl hover:border-red-600/50 hover:shadow-red transition-all duration-300 group"
                      onClick={() => setDropdownOpen(null)}
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform"><cat.Icon className="w-8 h-8" /></span>
                      <span className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-400 text-primary-900 shadow-red flex items-center justify-center"
        aria-label="Abrir menú"
      >
        <Menu className="w-7 h-7" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary-900 flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-dark-border">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="font-display font-bold text-xl text-white">TechStore</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:text-red-400 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-7 h-7" aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 pt-4 pb-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 pr-12 bg-primary-800 border border-dark-border rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:border-red-500"
                  autoFocus
                  aria-label="Buscar productos"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white hover:text-red-400"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
              </form>
            </div>

            <nav className="flex-1 overflow-y-auto p-6 space-y-4">
              {navLinks.map((link, index) => (
                <MotionLink
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                      ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                      : 'text-white hover:bg-primary-800 hover:text-white'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </MotionLink>
              ))}

              <div className="pt-4 border-t border-dark-border">
                <h3 className="px-4 text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Categorías</h3>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat, index) => (
                    <Link
                      key={cat.slug}
                      to={`/categoria/${cat.slug}`}
                      className="flex flex-col items-center gap-2 p-4 bg-primary-800 border border-dark-border rounded-xl hover:border-red-600/50 hover:shadow-red transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-2xl"><cat.Icon className="w-7 h-7" /></span>
                      <span className="text-sm font-medium text-white">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {isAuthenticated ? (
                <div className="pt-4 border-t border-dark-border space-y-2">
                  <Link to="/cuenta" className="block px-4 py-3 rounded-xl bg-primary-800 border border-dark-border text-white hover:border-red-600 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    Mi cuenta
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-3 rounded-xl bg-primary-800 border border-dark-border text-white hover:border-red-600 transition-all" onClick={() => setMobileMenuOpen(false)}>
                      Panel Admin
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full block px-4 py-3 rounded-xl bg-primary-800 border border-dark-border text-red-400 hover:bg-red-600/20 hover:border-red-600/30 transition-all">
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-dark-border space-y-2">
                  <Link to="/login" className="block w-full px-4 py-3 rounded-xl bg-primary-800 border border-dark-border text-white text-center hover:border-red-600 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    Iniciar sesión
                  </Link>
                  <Link to="/registro" className="block w-full btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                    Registrarse
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  )
}