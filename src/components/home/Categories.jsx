import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Headphones, Smartphone, Monitor, Gamepad2, Watch, Plug, Zap, Keyboard, Bot } from 'lucide-react'
import { formatNumber } from '../../utils/helpers'

const categories = [
  { slug: 'audio', name: 'Audio', image: '/images/categories/audio.jpg', count: 42, Icon: Headphones },
  { slug: 'smartphones', name: 'Smartphones', image: '/images/categories/smartphones.jpg', count: 28, Icon: Smartphone },
  { slug: 'computadores', name: 'Computadores', image: '/images/categories/computadores.jpg', count: 35, Icon: Monitor },
  { slug: 'gaming', name: 'Gaming', image: '/images/categories/gaming.jpg', count: 56, Icon: Gamepad2 },
  { slug: 'smartwatch', name: 'Smartwatch', image: '/images/categories/smartwatch.jpg', count: 18, Icon: Watch },
  { slug: 'accesorios', name: 'Accesorios', image: '/images/categories/accesorios.jpg', count: 67, Icon: Plug },
  { slug: 'cargadores', name: 'Cargadores', image: '/images/categories/cargadores.jpg', count: 23, Icon: Zap },
  { slug: 'perifericos', name: 'Periféricos', image: '/images/categories/perifericos.jpg', count: 31, Icon: Keyboard },
  { slug: 'gadgets', name: 'Gadgets', image: '/images/categories/gadgets.jpg', count: 44, Icon: Bot },
]

export default function Categories() {
  return (
    <section className="py-20 lg:py-28 bg-primary-900/50" aria-labelledby="categories-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="categories-title" className="section-title mx-auto mb-4">EXPLORA POR CATEGORÍA</h2>
          <p className="text-white max-w-2xl mx-auto">Encuentra lo que necesitas en nuestra selección curada por expertos</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.article
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              <Link
                to={`/categoria/${category.slug}`}
                className="block relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-800 border border-dark-border hover:border-gold-600/50 transition-all duration-500"
                aria-label={`${category.name} - ${formatNumber(category.count)} productos`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent z-10" />
                <img
                  src={category.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  <div className="text-center">
                    <span className="text-4xl sm:text-5xl mb-2 block"><category.Icon className="w-10 h-10 sm:w-12 sm:h-12" /></span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1 group-hover:text-gold-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white text-sm font-medium">
                      {formatNumber(category.count)} productos
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="px-4 py-2 bg-gold-600 text-white text-sm font-semibold rounded-full">
                    Ver categoría
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/tienda" className="btn-outline inline-flex items-center gap-2">
            Ver todas las categorías
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}