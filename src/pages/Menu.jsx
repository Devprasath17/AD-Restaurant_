import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Star } from 'lucide-react'
import { CATEGORIES, MENU_ITEMS } from '../data/menuData'

/* ─── Filter Tab ─────────────────────────────────────────────── */
function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 whitespace-nowrap"
      style={{ color: active ? '#0d0c0a' : '#8c8779' }}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #C9982A, #e8b82a)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

/* ─── Menu Card ──────────────────────────────────────────────── */
function MenuCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [added, setAdded] = useState(false)

  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.article
      ref={ref}
      layout
      className="flex flex-col overflow-hidden group"
      style={{
        background: '#111109',
        border: '1px solid rgba(201,152,42,0.08)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      whileHover={{ borderColor: 'rgba(201,152,42,0.28)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.82) saturate(0.85)' }}
          whileHover={{ scale: 1.07, filter: 'brightness(0.95) saturate(1.05)' }}
          transition={{ duration: 0.55 }}
          loading="lazy"
        />
        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(17,17,9,0.7) 0%, transparent 60%)' }}
        />
        {item.badge && (
          <span
            className="absolute top-4 right-4 text-xs tracking-widest uppercase px-3 py-1 font-medium"
            style={{ background: 'linear-gradient(135deg, #C9982A, #e8b82a)', color: '#0d0c0a' }}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-serif text-xl font-light leading-tight" style={{ color: '#e8e6e1' }}>
            {item.name}
          </h3>
          <span
            className="font-serif text-lg font-light flex-shrink-0"
            style={{ color: '#C9982A' }}
          >
            ${item.price}
          </span>
        </div>

        <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#706b5d' }}>
          {item.description}
        </p>

        <button
          onClick={handleAdd}
          className="w-full py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            border: '1px solid rgba(201,152,42,0.35)',
            color: added ? '#0d0c0a' : '#C9982A',
            background: added
              ? 'linear-gradient(135deg, #C9982A, #e8b82a)'
              : 'transparent',
          }}
          onMouseEnter={e => {
            if (!added) {
              e.currentTarget.style.background = 'rgba(201,152,42,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,152,42,0.6)'
            }
          }}
          onMouseLeave={e => {
            if (!added) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,152,42,0.35)'
            }
          }}
        >
          {added ? (
            <>
              <Star size={12} fill="currentColor" />
              Added
            </>
          ) : (
            <>
              <Plus size={12} />
              Add to Order
            </>
          )}
        </button>
      </div>
    </motion.article>
  )
}

/* ─── Menu Page ──────────────────────────────────────────────── */
export default function Menu() {
  const [active, setActive] = useState('All')
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const filtered =
    active === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === active)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: '#0d0c0a' }}
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-24 text-center overflow-hidden"
      >
        {/* Background ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,152,42,0.06) 0%, transparent 70%)',
          }}
        />

        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Culinary Excellence
        </motion.p>

        <motion.h1
          className="font-serif font-light leading-tight px-4"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', color: '#e8e6e1' }}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          An Exploration of Rare
          <br />
          <span className="italic text-gold-gradient">Flavors</span>
        </motion.h1>

        <motion.div
          className="divider-gold w-20 mx-auto mt-8"
          initial={{ scaleX: 0 }}
          animate={heroInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 py-4" style={{ background: 'rgba(13,12,10,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,152,42,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1"
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              className="flex items-center gap-1 rounded-full p-1 flex-shrink-0"
              style={{ border: '1px solid rgba(201,152,42,0.2)', background: 'rgba(201,152,42,0.04)' }}
            >
              {CATEGORIES.map(cat => (
                <FilterTab
                  key={cat}
                  label={cat}
                  active={active === cat}
                  onClick={() => setActive(cat)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light" style={{ color: '#575249' }}>
              No items in this category yet.
            </p>
          </div>
        )}
      </section>
    </motion.main>
  )
}
