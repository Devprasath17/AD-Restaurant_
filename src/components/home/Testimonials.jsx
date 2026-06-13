import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    rating: 5,
    text: '"The attention to detail is simply unmatched. From the moment we walked in, we felt like royalty. The Wagyu was life-changing."',
    author: 'James Harrington',
    role: 'Food Critic, The Luxe Life',
    featured: false,
  },
  {
    rating: 5,
    text: '"A culinary sanctuary. Every course was a masterpiece of flavor and visual design. AD is setting a new standard for luxury dining."',
    author: 'Elena Rossi',
    role: 'Private Collector',
    featured: true,
  },
  {
    rating: 5,
    text: '"The perfect blend of intimacy and grandeur. The sommelier\'s recommendations were perfect pairings for an unforgettable night."',
    author: 'Marcus Vane',
    role: 'Entrepreneur',
    featured: false,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#C9982A" style={{ color: '#C9982A' }} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-28 px-6 overflow-hidden"
      style={{ background: '#0d0c0a' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Reviews
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Guest Experiences
          </motion.h2>
          <motion.div
            className="divider-gold w-32 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(({ rating, text, author, role, featured }, i) => (
            <motion.div
              key={author}
              className="relative p-8 transition-all duration-500"
              style={{
                background: featured
                  ? 'rgba(201,152,42,0.06)'
                  : 'rgba(255,255,255,0.02)',
                border: featured
                  ? '1px solid rgba(201,152,42,0.35)'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{
                borderColor: 'rgba(201,152,42,0.4)',
                background: 'rgba(201,152,42,0.05)',
              }}
            >
              {/* Featured glow */}
              {featured && (
                <div
                  className="absolute -inset-px rounded-sm"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(201,152,42,0.15), transparent, rgba(201,152,42,0.08))',
                    pointerEvents: 'none',
                  }}
                />
              )}

              <StarRating count={rating} />

              <blockquote
                className="font-serif text-lg font-light leading-relaxed my-6 italic"
                style={{ color: '#ccc9c0' }}
              >
                {text}
              </blockquote>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(201,152,42,0.1)' }}>
                {/* Avatar placeholder */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                  style={{
                    background: 'rgba(201,152,42,0.15)',
                    color: '#C9982A',
                    border: '1px solid rgba(201,152,42,0.3)',
                  }}
                >
                  {author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#e8e6e1' }}>{author}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#706b5d' }}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
