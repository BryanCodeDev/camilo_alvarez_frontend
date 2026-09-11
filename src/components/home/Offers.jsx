import { motion } from 'framer-motion'
import ProductCard from '../products/ProductCard'

const demoOffers = [
  {
    id: 10,
    name: 'AirPods 4 con ANC',
    slug: 'airpods-4-anc',
    category: 'Audio',
    price: 599900,
    originalPrice: 749900,
    discount: 20,
    stock: 25,
    sku: 'AUD-APP-010',
    brand: 'Apple',
    images: ['/images/producto1.webp'],
    featured: false,
    onSale: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 42,
  },
  {
    id: 11,
    name: 'iPad Air M2 11" 128GB',
    slug: 'ipad-air-m2-11-128gb',
    category: 'Computadores',
    price: 649900,
    originalPrice: 799900,
    discount: 18,
    stock: 14,
    sku: 'CMP-APP-011',
    brand: 'Apple',
    images: ['/images/producto1.webp'],
    featured: false,
    onSale: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 58,
  },
  {
    id: 12,
    name: 'Samsung Galaxy Buds2 Pro',
    slug: 'samsung-galaxy-buds2-pro',
    category: 'Audio',
    price: 189900,
    originalPrice: 249900,
    discount: 24,
    stock: 35,
    sku: 'AUD-SAM-012',
    brand: 'Samsung',
    images: ['/images/producto1.webp'],
    featured: false,
    onSale: true,
    isNew: false,
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: 13,
    name: 'Logitech MX Master 3S',
    slug: 'logitech-mx-master-3s',
    category: 'Periféricos',
    price: 119900,
    originalPrice: 149900,
    discount: 20,
    stock: 28,
    sku: 'PER-LOG-013',
    brand: 'Logitech',
    images: ['/images/producto1.webp'],
    featured: false,
    onSale: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 167,
  },
]

export default function Offers() {
  return (
    <section className="py-20 lg:py-28 bg-primary-900/50" aria-labelledby="offers-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="offers-title" className="section-title mx-auto mb-4">OFERTAS ESPECIALES</h2>
          <p className="text-white max-w-2xl mx-auto">Descuentos por tiempo limitado en productos seleccionados</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
          {demoOffers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              role="listitem"
            >
              <ProductCard product={product} variant="default" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a href="/tienda?category=ofertas" className="btn-outline inline-flex items-center gap-2">
            Ver todas las ofertas
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}