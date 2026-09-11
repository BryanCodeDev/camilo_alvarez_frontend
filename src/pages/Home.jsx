import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Offers from '../components/home/Offers'
import TrustSection from '../components/home/TrustSection'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <>
      <SEO
        title="TechStore - Tecnología Premium"
        description="Productos tecnológicos seleccionados para quienes buscan calidad, rendimiento y estilo. Audio, smartphones, computadores, gaming y más."
        type="website"
      />
      <div className="min-h-screen">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Offers />
        <TrustSection />
        <Newsletter />
      </div>
    </>
  )
}