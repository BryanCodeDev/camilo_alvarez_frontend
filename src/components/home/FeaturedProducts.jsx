import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Zap, Tag, MessageSquare } from 'lucide-react'
import { formatPrice, calculateDiscount, getStockStatus } from '../../utils/helpers'
import ProductCard from '../products/ProductCard'

const demoProducts = [
  {
    id: 1,
    name: 'AirPods Pro 2da Generación',
    slug: 'airpods-pro-2',
    category: 'Audio',
    price: 89900,
    originalPrice: 119900,
    discount: 25,
    stock: 15,
    sku: 'AUD-APP-001',
    brand: 'Apple',
    images: ['/images/products/airpods-pro-2-1.jpg', '/images/products/airpods-pro-2-2.jpg'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    category: 'Smartphones',
    price: 1299900,
    originalPrice: 1449900,
    discount: 10,
    stock: 8,
    sku: 'SPH-APP-002',
    brand: 'Apple',
    images: ['/images/products/iphone-15-pro-max-1.jpg', '/images/products/iphone-15-pro-max-2.jpg'],
    featured: true,
    onSale: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'MacBook Air M2 13.6" 8GB/256GB',
    slug: 'macbook-air-m2-13-8gb-256gb',
    category: 'Computadores',
    price: 999900,
    originalPrice: 1149900,
    discount: 13,
    stock: 5,
    sku: 'CMP-APP-003',
    brand: 'Apple',
    images: ['/images/products/macbook-air-m2-1.jpg', '/images/products/macbook-air-m2-2.jpg'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    category: 'Audio',
    price: 349900,
    originalPrice: 429900,
    discount: 18,
    stock: 22,
    sku: 'AUD-SNY-004',
    brand: 'Sony',
    images: ['/images/products/sony-wh1000xm5-1.jpg', '/images/products/sony-wh1000xm5-2.jpg'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    category: 'Smartphones',
    price: 1199900,
    originalPrice: 1349900,
    discount: 11,
    stock: 12,
    sku: 'SPH-SAM-005',
    brand: 'Samsung',
    images: ['/images/products/samsung-s24-ultra-1.jpg', '/images/products/samsung-s24-ultra-2.jpg'],
    featured: true,
    onSale: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 73,
  },
  {
    id: 6,
    name: 'Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2',
    category: 'Gaming',
    price: 159900,
    originalPrice: 189900,
    discount: 15,
    stock: 30,
    sku: 'GAM-LOG-006',
    brand: 'Logitech',
    images: ['/images/products/logitech-gprox2-1.jpg', '/images/products/logitech-gprox2-2.jpg'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 7,
    name: 'Apple Watch Series 9 45mm',
    slug: 'apple-watch-series-9-45mm',
    category: 'Smartwatch',
    price: 449900,
    originalPrice: 499900,
    discount: 10,
    stock: 18,
    sku: 'SWT-APP-007',
    brand: 'Apple',
    images: ['/images/products/apple-watch-s9-1.jpg', '/images/products/apple-watch-s9-2.jpg'],
    featured: true,
    onSale: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 91,
  },
  {
    id: 8,
    name: 'Samsung 49" Odyssey G9',
    slug: 'samsung-49-odyssey-g9',
    category: 'Gaming',
    price: 1299900,
    originalPrice: 1599900,
    discount: 18,
    stock: 6,
    sku: 'GAM-SAM-008',
    brand: 'Samsung',
    images: ['/images/products/samsung-odyssey-g9-1.jpg', '/images/products/samsung-odyssey-g9-2.jpg'],
    featured: true,
    onSale: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 45,
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
              transition={{ duration: 0.5, delay: index * 0.08 }}
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