import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MousePointer2 } from 'lucide-react'

const MotionLink = motion.create(Link)

const heroImages = [
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=80',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/60 to-primary-900/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-600/10 via-transparent to-transparent" />
        {heroImages.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ animationDelay: `${index * 7}s` }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="relative z-10 container-custom py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-600/20 border border-gold-600/30 text-gold-400 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
            </span>
            Nuevo: Envío gratis en compras &gt; $100.000
          </motion.span>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-6"
          >
            TECNOLOGÍA QUE{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              MARCA LA DIFERENCIA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Productos seleccionados para quienes buscan calidad, rendimiento y estilo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
          >
            <MotionLink
              to="/tienda"
              className="group btn-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VER PRODUCTOS
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </MotionLink>
            <MotionLink
              to="/tienda?category=ofertas"
              className="btn-outline px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VER OFERTAS
            </MotionLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Pago seguro con Mercado Pago</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Envíos a todo el país</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Garantía oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Soporte experto</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <MousePointer2 className="w-6 h-6 text-primary-500" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}