import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

export default function ReservationCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#080807' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="AD Restaurant dining room"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.15) saturate(0.6)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,152,42,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="w-16 h-px mx-auto mb-8"
          style={{ background: '#C9982A' }}
        />

        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Reserve Your Table
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-6xl font-light leading-tight mb-6"
          style={{ color: '#e8e6e1' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          An Unforgettable
          <br />
          <span className="italic text-gold-gradient">Evening Awaits</span>
        </motion.h2>

        <motion.p
          className="text-sm md:text-base leading-relaxed mb-10"
          style={{ color: '#706b5d' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Secure your place at the finest table in Chennai. Reservations are
          recommended and can be made up to 30 days in advance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/reservation" className="btn-gold group inline-flex items-center gap-2">
            Book a Table
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:+919876543210"
            className="btn-outline-gold group inline-flex items-center gap-2"
          >
            <Phone size={14} />
            Call Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
