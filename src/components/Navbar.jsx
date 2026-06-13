import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'The Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reservations', to: '/reservation' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(13, 12, 10, 0.97)'
            : 'rgba(13, 12, 10, 0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(201,152,42,0.15)' : '1px solid transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="font-serif text-2xl font-bold tracking-wider transition-colors duration-300"
              style={{ color: '#C9982A' }}
            >
              AD
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className="relative text-xs tracking-widest uppercase font-medium transition-colors duration-300 group"
                    style={{ color: active ? '#C9982A' : '#ccc9c0' }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                      style={{
                        width: active ? '100%' : '0%',
                        background: '#C9982A',
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{
                        width: '0%',
                        background: '#C9982A',
                      }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium transition-colors duration-300"
              style={{ color: '#8c8779' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9982A'}
              onMouseLeave={e => e.currentTarget.style.color = '#8c8779'}
            >
              <Phone size={14} />
            </a>
            <Link to="/reservation" className="btn-gold text-xs">
              Reserve
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors duration-200"
            style={{ color: '#C9982A' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(13,12,10,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
              <span className="font-serif text-2xl font-bold" style={{ color: '#C9982A' }}>AD</span>
              <button onClick={() => setMobileOpen(false)} style={{ color: '#C9982A' }}>
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-10">
              {navLinks.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <Link
                    to={to}
                    className="font-serif text-3xl font-light tracking-wide transition-colors duration-200"
                    style={{
                      color: location.pathname === to ? '#C9982A' : '#e8e6e1',
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link to="/reservation" className="btn-gold">
                  Reserve a Table
                </Link>
              </motion.div>
            </div>

            <div className="pb-12 flex justify-center gap-6">
              <a href="tel:+919876543210" className="text-xs tracking-widest uppercase" style={{ color: '#8c8779' }}>
                +91 98765 43210
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
