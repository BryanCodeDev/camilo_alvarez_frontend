import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Zap, Tag, MessageSquare } from 'lucide-react'
import { formatPrice, calculateDiscount, getStockStatus } from '../../utils/helpers'
import ProductCard from '../products/ProductCard'

const demoProducts = [
  {
    id: 1,
    name: 'Cables y Cargadores para Celulares',
    slug: 'cables-cargadores-celulares',
    category: 'Accesorios',
    description: 'Kit completo de cables y cargadores universales para celulares. Compatible con USB-C, Lightning y Micro USB.',
    price: 15900,
    originalPrice: 24900,
    discount: 36,
    stock: 50,
    sku: 'ACC-CAB-001',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: 2,
    name: 'Audífonos',
    slug: 'audifonos',
    category: 'Audio',
    description: 'Audífonos over-ear con sonido envolvente y micrófono integrado. Ideales para gaming y llamadas.',
    price: 29900,
    originalPrice: 45900,
    discount: 35,
    stock: 35,
    sku: 'AUD-AUD-002',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 64,
  },
  {
    id: 3,
    name: 'Cargadores Vehiculares',
    slug: 'cargadores-vehiculares',
    category: 'Accesorios',
    description: 'Cargador dual para auto con puerto USB-C y USB-A. Carga rápida para tus dispositivos en viaje.',
    price: 8900,
    originalPrice: 12900,
    discount: 31,
    stock: 60,
    sku: 'ACC-VEH-003',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 42,
  },
  {
    id: 4,
    name: 'Cargadores Portátiles',
    slug: 'cargadores-portatiles',
    category: 'Accesorios',
    description: 'Power bank de 20000mAh con carga rápida y doble puerto USB. Perfecto para el día a día.',
    price: 12900,
    originalPrice: 19900,
    discount: 35,
    stock: 40,
    sku: 'ACC-POR-004',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 115,
  },
  {
    id: 5,
    name: 'Soportes Para Celulares',
    slug: 'soportes-celulares',
    category: 'Accesorios',
    description: 'Soporte universal para celulares con ajuste 360°. Compatible con todos los tamaños.',
    price: 6900,
    originalPrice: 9900,
    discount: 30,
    stock: 70,
    sku: 'ACC-SOP-005',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.4,
    reviewCount: 53,
  },
  {
    id: 6,
    name: 'Adaptadores',
    slug: 'adaptadores',
    category: 'Accesorios',
    description: 'Pack de adaptadores universales: HDMI, VGA, USB-C y Ethernet. Conectividad total.',
    price: 4900,
    originalPrice: 7900,
    discount: 38,
    stock: 80,
    sku: 'ACC-ADA-006',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 37,
  },
  {
    id: 7,
    name: 'Estuches Para Audífonos',
    slug: 'estuches-audifonos',
    category: 'Accesorios',
    description: 'Estuche protector para audífonos con interior acolchado. Transporte seguro.',
    price: 3900,
    originalPrice: 5900,
    discount: 34,
    stock: 100,
    sku: 'ACC-EST-007',
    brand: 'TechStore',
    images: ['/images/producto1.webp'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 28,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 lg:py-28 bg-primary-900" aria-labelledby="featured-title">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="featured-title" className="section-title">PRODUCTOS DESTACADOS</h2>
            <p className="text-white mt-2">Nuestra selección premium de la semana</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link to="/tienda" className="btn-outline inline-flex items-center gap-2">
              Ver todo el catálogo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
          {demoProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              role="listitem"
            >
              <ProductCard product={product} variant="featured" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
