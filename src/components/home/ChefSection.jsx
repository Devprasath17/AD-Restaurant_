import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Award } from 'lucide-react'

const highlights = [
  {
    Icon: Leaf,
    title: 'Seasonal Vision',
    text: 'Our menu evolves with the harvest, ensuring peak flavor in every bite.',
  },
  {
    Icon: Award,
    title: 'Curation',
    text: 'An award-winning cellar featuring over 400 rare vintages and artisan spirits.',
  },
]

export default function ChefSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-28 overflow-hidden"
      style={{ background: '#080807' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden" style={{ height: '560px' }}>
              <img
                src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=900&q=85"
                alt="Executive Chef at AD Restaurant"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(20%) brightness(0.8)' }}
              />
              {/* Gradient overlays */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(8,8,7,0.3) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Gold corner accent */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24"
              style={{
                border: '1px solid rgba(201,152,42,0.4)',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24"
              style={{
                border: '1px solid rgba(201,152,42,0.4)',
                borderLeft: 'none',
                borderTop: 'none',
              }}
            />

            {/* Floating card */}
            <motion.div
              className="absolute bottom-8 right-8 glass-card px-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p className="font-serif text-lg font-light" style={{ color: '#e8e6e1' }}>
                André Dupont
              </p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: '#C9982A' }}>
                Executive Chef
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <p className="section-label mb-4">Chef's Table</p>

            <h2
              className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight"
              style={{ color: '#e8e6e1' }}
            >
              The Philosophy
              <br />
              <span className="italic text-gold-gradient">of Taste</span>
            </h2>

            <div className="divider-gold w-16 mb-8" />

            <p
              className="text-sm md:text-base leading-relaxed mb-10"
              style={{ color: '#8c8779' }}
            >
              At AD Restaurant, our Executive Chef André Dupont believes that
              every dish should tell a story. By blending traditional French
              techniques with bold local ingredients, we create an experience
              that transcends mere dining.
            </p>

            {/* Highlights */}
            <div className="space-y-6 mb-10">
              {highlights.map(({ Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ background: 'rgba(201,152,42,0.1)', border: '1px solid rgba(201,152,42,0.3)' }}
                  >
                    <Icon size={16} style={{ color: '#C9982A' }} />
                  </div>
                  <div>
                    <h4
                      className="font-medium text-sm mb-1"
                      style={{ color: '#e8e6e1' }}
                    >
                      {title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#706b5d' }}>
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/about" className="btn-outline-gold group inline-flex items-center gap-2">
              Meet Our Chef
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
