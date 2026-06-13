import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="AD Restaurant interior"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) saturate(0.8)' }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,152,42,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,12,10,0.4) 0%, rgba(13,12,10,0.1) 40%, rgba(13,12,10,0.8) 100%)',
        }}
      />

      {/* Floating ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,152,42,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,152,42,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        style={{ opacity }}
      >
        {/* Pre-label */}
        <motion.p
          {...fadeUp(0.1)}
          className="section-label mb-6"
        >
          Welcome to AD Restaurant
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.25)}
          className="font-serif font-light leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: '#e8e6e1' }}
        >
          Experience Exceptional
          <br />
          Dining at{' '}
          <span className="text-gold-gradient italic">AD Restaurant</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: '#aca89b' }}
        >
          Discover handcrafted dishes, unforgettable flavors, and a premium
          dining experience tailored for the discerning palate.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/menu" className="btn-outline-gold group flex items-center gap-2">
            Explore Menu
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link to="/gallery" className="btn-gold group flex items-center gap-2">
            View Gallery
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ bottom: '-120px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#575249' }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #C9982A, transparent)' }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
