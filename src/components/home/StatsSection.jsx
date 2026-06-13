import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 5000, suffix: '+', label: 'Happy Guests' },
  { value: 50, suffix: '+', label: 'Signature Dishes' },
  { value: 4.9, suffix: '', label: 'Star Rating', isRating: true },
]

function AnimatedNumber({ target, suffix, started }) {
  const [current, setCurrent] = useState(0)
  const isDecimal = !Number.isInteger(target)

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const next = Math.min(increment * step, target)
      setCurrent(isDecimal ? parseFloat(next.toFixed(1)) : Math.floor(next))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [started, target, isDecimal])

  return (
    <span>
      {isDecimal ? current.toFixed(1) : current.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-16"
      style={{ background: 'rgba(13,12,10,0.95)' }}
    >
      {/* Top/bottom gold lines */}
      <div className="divider-gold mb-0" />

      <div
        className="py-12"
        style={{
          background: 'rgba(201,152,42,0.03)',
          borderTop: '1px solid rgba(201,152,42,0.1)',
          borderBottom: '1px solid rgba(201,152,42,0.1)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map(({ value, suffix, label, isRating }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                {/* Vertical divider (except last) */}
                {i < stats.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12"
                    style={{ background: 'rgba(201,152,42,0.2)' }}
                  />
                )}

                <div
                  className="font-serif text-4xl md:text-5xl font-light mb-2 flex items-center gap-1"
                  style={{ color: '#C9982A' }}
                >
                  <AnimatedNumber target={value} suffix={suffix} started={inView} />
                  {isRating && <Star size={22} fill="#C9982A" className="mb-1" />}
                </div>

                <p className="text-xs tracking-widest uppercase font-light" style={{ color: '#706b5d' }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider-gold mt-0" />
    </section>
  )
}
