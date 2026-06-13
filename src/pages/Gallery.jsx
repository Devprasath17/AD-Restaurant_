import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/galleryData'

/* ─── Lightbox ───────────────────────────────────────────────── */
function Lightbox({ items, index, onClose, onNext, onPrev }) {
  const item = items[index]

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(8,8,7,0.97)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-200"
        style={{ border: '1px solid rgba(201,152,42,0.4)', color: '#C9982A' }}
        onClick={onClose}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,152,42,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <X size={16} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full z-10 transition-all duration-200"
        style={{ border: '1px solid rgba(201,152,42,0.3)', color: '#C9982A' }}
        onClick={e => { e.stopPropagation(); onPrev() }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,152,42,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          className="flex flex-col items-center px-20 md:px-32 max-w-5xl w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
          />
          <div className="mt-6 text-center">
            <p className="font-serif text-xl font-light" style={{ color: '#e8e6e1' }}>{item.title}</p>
            <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#C9982A' }}>{item.category}</p>
          </div>
          <p className="mt-4 text-xs" style={{ color: '#575249' }}>
            {index + 1} / {items.length}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full z-10 transition-all duration-200"
        style={{ border: '1px solid rgba(201,152,42,0.3)', color: '#C9982A' }}
        onClick={e => { e.stopPropagation(); onNext() }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,152,42,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  )
}

/* ─── Gallery Card ───────────────────────────────────────────── */
function GalleryCard({ item, globalIndex, onOpen, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '4/3' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onClick={() => onOpen(globalIndex)}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.8) saturate(0.85)' }}
        whileHover={{ scale: 1.08, filter: 'brightness(0.92) saturate(1.1)' }}
        transition={{ duration: 0.55 }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: 'rgba(8,8,7,0)' }}
        whileHover={{ background: 'rgba(8,8,7,0.55)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100"
          style={{ transition: 'opacity 0.3s ease' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(201,152,42,0.7)', color: '#C9982A', background: 'rgba(13,12,10,0.6)' }}
          >
            <ZoomIn size={18} />
          </div>
          <span className="font-serif text-base font-light" style={{ color: '#e8e6e1' }}>{item.title}</span>
          <span className="text-xs tracking-widest uppercase" style={{ color: '#C9982A' }}>{item.category}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Gallery Page ───────────────────────────────────────────── */
export default function Gallery() {
  const [active, setActive] = useState('All Works')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const filtered =
    active === 'All Works'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.category === active)

  const openLightbox = useCallback((i) => {
    setLightboxIndex(i)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex(i => (i + 1) % filtered.length)
  }, [filtered.length])

  const goPrev = useCallback(() => {
    setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  return (
    <>
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
          className="relative pt-40 pb-20 text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(201,152,42,0.05) 0%, transparent 70%)',
            }}
          />

          <motion.h1
            className="font-serif font-light italic px-4 mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: '#C9982A' }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            The Visual Experience
          </motion.h1>

          <motion.p
            className="text-sm md:text-base leading-relaxed max-w-md mx-auto px-6"
            style={{ color: '#706b5d' }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A curated collection of culinary mastery and architectural
            elegance at AD Restaurant.
          </motion.p>
        </section>

        {/* Filter tabs — underline style */}
        <div
          className="border-b"
          style={{ borderColor: 'rgba(201,152,42,0.12)' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="flex items-end gap-8 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {GALLERY_CATEGORIES.map(cat => {
                const isActive = active === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="relative pb-4 text-xs tracking-widest uppercase font-medium flex-shrink-0 transition-colors duration-300"
                    style={{ color: isActive ? '#C9982A' : '#575249' }}
                  >
                    {cat}
                    {isActive && (
                      <motion.span
                        layoutId="gallery-filter-line"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: '#C9982A' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  globalIndex={i}
                  onOpen={openLightbox}
                  delay={(i % 3) * 0.07}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* CTA box */}
        <section className="max-w-4xl mx-auto px-6 pb-28">
          <motion.div
            className="relative text-center py-16 px-8"
            style={{ border: '1px solid rgba(201,152,42,0.2)', background: 'rgba(201,152,42,0.03)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Wine glass icon */}
            <div className="flex justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9982A" strokeWidth="1.2">
                <path d="M8 22h8M12 22V11M5 3h14l-2 8H7L5 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-light italic mb-4" style={{ color: '#C9982A' }}>
              Experience the Excellence Firsthand
            </h2>

            <p className="text-sm leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: '#706b5d' }}>
              Our gallery only tells half the story. The aroma, the texture,
              and the atmosphere await your arrival.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/reservation" className="btn-gold text-xs px-10">
                Book a Table
              </Link>
              <Link to="/about" className="btn-outline-gold text-xs px-10">
                Private Events
              </Link>
            </div>
          </motion.div>
        </section>
      </motion.main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </>
  )
}
