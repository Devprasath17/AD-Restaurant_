import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const dishes = [
  {
    id: 1,
    name: 'Imperial Wagyu Reserve',
    badge: 'SIGNATURE',
    description: 'A5 Grade Miyazaki wagyu, aged 45 days, served with smoked bone marrow and truffle-infused reduction.',
    image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
    size: 'large',
  },
  {
    id: 2,
    name: 'Charred Octopus',
    description: 'Mediterranean octopus, pea purée, spicy chorizo oil, and micro-greens.',
    image: 'https://images.pexels.com/photos/2232/food-pizza-restaurant-eating.jpg?auto=compress&cs=tinysrgb&w=600&q=85',
    size: 'small',
  },
  {
    id: 3,
    name: 'Heirloom Garden',
    description: 'Root vegetables, ginger-miso foam, and ancient grains.',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
    size: 'small',
  },
  {
    id: 4,
    name: 'Oyster & Champagne',
    description: 'Freshly shucked Kumamoto oysters, mignonette, and a glass of Vintage Blanc de Blancs.',
    image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
    size: 'medium',
    highlight: true,
  },
  {
    id: 5,
    name: 'Saffron Risotto',
    description: 'Carnaroli rice, aged Parmigiano-Reggiano, white truffle oil.',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
    size: 'medium',
  },
]

function DishCard({ dish, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      style={{
        background: '#080807',
        border: '1px solid rgba(201,152,42,0.1)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ borderColor: 'rgba(201,152,42,0.35)' }}
    >
      {/* Image */}
      <div
        className="overflow-hidden"
        style={{ height: dish.size === 'large' ? '360px' : '200px' }}
      >
        <motion.img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85) saturate(0.9)' }}
          whileHover={{ scale: 1.06, filter: 'brightness(0.95) saturate(1.1)' }}
          transition={{ duration: 0.6 }}
        />
        {/* Gradient overlay on image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(8,8,7,0.9) 0%, rgba(8,8,7,0.2) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Badge */}
      {dish.badge && (
        <span
          className="absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1"
          style={{ background: 'rgba(201,152,42,0.9)', color: '#0d0c0a' }}
        >
          {dish.badge}
        </span>
      )}

      {/* Text */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-light mb-2" style={{ color: '#e8e6e1' }}>
          {dish.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#706b5d' }}>
          {dish.description}
        </p>

        {dish.highlight && (
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 mt-4 text-xs tracking-widest uppercase group/link transition-colors duration-200"
            style={{ color: '#C9982A' }}
          >
            Explore Pairings
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default function FeaturedDishes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28 px-6" style={{ background: '#0d0c0a' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Culinary Artistry
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Featured Dishes
          </motion.h2>
          <motion.div
            className="divider-gold w-32 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large featured card spans 2 rows on large screens */}
          <div className="lg:col-span-1 lg:row-span-2">
            <DishCard dish={dishes[0]} delay={0} />
          </div>

          {/* Top right */}
          <div className="lg:col-span-1">
            <DishCard dish={dishes[1]} delay={0.08} />
          </div>

          {/* Bottom left (second row) */}
          <div className="lg:col-span-1">
            <DishCard dish={dishes[2]} delay={0.16} />
          </div>

          {/* Highlight card */}
          <div className="lg:col-span-1">
            <DishCard dish={dishes[3]} delay={0.24} />
          </div>

          {/* Last card */}
          <div className="lg:col-span-1">
            <DishCard dish={dishes[4]} delay={0.32} />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link to="/menu" className="btn-outline-gold group inline-flex items-center gap-2">
            View Full Menu
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
