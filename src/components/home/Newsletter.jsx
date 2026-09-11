import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Ingresa un correo válido')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscribed(true)
      setEmail('')
      toast.success('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.')
    } catch {
      toast.error('Error al suscribirse. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-900 to-primary-950" aria-labelledby="newsletter-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent rounded-3xl" aria-hidden="true" />
          <div className="relative p-8 lg:p-12 bg-primary-900/50 backdrop-blur-sm border border-dark-border rounded-3xl">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-green-500" aria-hidden="true" />
                <h2 id="newsletter-title" className="font-display font-bold text-3xl text-white">¡Gracias por suscribirte!</h2>
                <p className="text-white">Pronto recibirás nuestras mejores ofertas y novedades.</p>
                <button
                  onClick={() => setSubscribed(false)}
                  className="btn-outline mt-4"
                >
                  Suscribir otro correo
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 id="newsletter-title" className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
                    No te pierdas nuestras ofertas
                  </h2>
                  <p className="text-white">Suscríbete y recibe descuentos exclusivos, lanzamientos y más.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-12 pr-4 py-4 bg-primary-800 border border-dark-border rounded-xl text-white placeholder:text-primary-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      required
                      autoComplete="email"
                      aria-label="Correo electrónico"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 py-4 flex items-center gap-2 whitespace-nowrap group-hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {loading ? (
                      <motion.svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 1 2 12 10 10 0 0 1 12 2" /></motion.svg>
                    ) : (
                      <>
                        Suscribirse
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white text-xs">Al suscribirte aceptas nuestra <a href="/politica-privacidad" className="underline hover:text-red-400">Política de privacidad</a>. Sin spam, solo lo mejor.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}