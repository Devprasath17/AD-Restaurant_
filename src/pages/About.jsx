import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Eye, Shield, Share2, BookOpen } from 'lucide-react'
import StatsSection from '../components/home/StatsSection'

/* ─── Timeline Item ──────────────────────────────────────────── */
const timelineItems = [
  {
    year: '1994',
    title: 'The Foundation',
    description:
      'André Dumont opens the first AD establishment with only 12 seats and a focus on rare heirloom vegetables.',
    image: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    side: 'left',
  },
  {
    year: '2008',
    title: 'First Michelin Star',
    description:
      'Recognition arrives as AD is awarded its first star, cementing its place among the world\'s culinary elite.',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    side: 'right',
  },
  {
    year: '2024',
    title: 'The Modern Era',
    description:
      'A complete redesign brings AD into a new era of digital-first luxury and experimental dining experiences.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    side: 'left',
  },
]

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = item.side === 'left'

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Year + dot (center on desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center z-10">
        <div
          className="w-4 h-4 rounded-full"
          style={{ background: '#C9982A', boxShadow: '0 0 20px rgba(201,152,42,0.5)' }}
        />
      </div>

      {/* Image side */}
      <div className={isLeft ? 'order-1' : 'order-1 md:order-2'}>
        <div className="overflow-hidden" style={{ height: '280px' }}>
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(30%) brightness(0.7)' }}
            whileHover={{ scale: 1.04, filter: 'grayscale(10%) brightness(0.8)' }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Text side */}
      <div className={`${isLeft ? 'order-2 md:text-right' : 'order-2 md:order-1 md:text-left'}`}>
        <motion.span
          className="font-serif text-5xl md:text-6xl font-light block mb-3"
          style={{ color: '#C9982A' }}
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {item.year}
        </motion.span>
        <h3
          className="font-serif text-2xl md:text-3xl font-light mb-4"
          style={{ color: '#e8e6e1' }}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#706b5d' }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── MVV Card ───────────────────────────────────────────────── */
const mvvCards = [
  {
    Icon: Target,
    title: 'Mission',
    text: 'To elevate the act of dining into a transcendent sensory experience that honours nature\'s finest gifts through artisanal precision.',
  },
  {
    Icon: Eye,
    title: 'Vision',
    text: 'To become the global standard-bearer for intimate, high-end culinary artistry that balances tradition with avant-garde innovation.',
  },
  {
    Icon: Shield,
    title: 'Core Values',
    bullets: ['Uncompromising Integrity', 'Artisanal Respect', 'Discreet Excellence'],
  },
]

function MVVCard({ card, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative p-8 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(201,152,42,0.15)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ borderColor: 'rgba(201,152,42,0.35)', background: 'rgba(201,152,42,0.04)' }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full mb-6"
        style={{ background: 'rgba(201,152,42,0.1)', border: '1px solid rgba(201,152,42,0.3)' }}
      >
        <card.Icon size={18} style={{ color: '#C9982A' }} />
      </div>

      <h3 className="font-serif text-2xl font-light mb-4" style={{ color: '#e8e6e1' }}>
        {card.title}
      </h3>

      {card.text && (
        <p className="text-sm leading-relaxed" style={{ color: '#706b5d' }}>
          {card.text}
        </p>
      )}

      {card.bullets && (
        <ul className="space-y-2">
          {card.bullets.map(b => (
            <li key={b} className="flex items-center gap-3 text-sm" style={{ color: '#706b5d' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C9982A' }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Ambient glow */}
      <div
        className="absolute -top-px left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,152,42,0.4), transparent)' }}
      />
    </motion.div>
  )
}

/* ─── About Page ─────────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const storyRef = useRef(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' })

  const chefRef = useRef(null)
  const chefInView = useInView(chefRef, { once: true, margin: '-80px' })

  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' })

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: '#0d0c0a' }}
    >
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-44 pb-32 text-center overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
            alt="AD Restaurant"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.12) grayscale(30%)' }}
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(201,152,42,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.p
            className="section-label mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Since 1904
          </motion.p>

          <motion.h1
            className="font-serif font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: '#e8e6e1' }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            The Legacy of{' '}
            <span className="italic text-gold-gradient">AD</span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: '#706b5d' }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Born from a passion for forgotten techniques and modern refinement,
            AD Restaurant is a sanctuary for those who seek culinary transcendence.
          </motion.p>
        </div>
      </section>

      {/* ── Story ── */}
      <section
        ref={storyRef}
        className="py-28 px-6 overflow-hidden"
        style={{ background: '#080807' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -70 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="overflow-hidden" style={{ height: '520px' }}>
              <img
                src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=900&q=85"
                alt="Culinary artistry"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(20%) brightness(0.75)' }}
              />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20" style={{ border: '1px solid rgba(201,152,42,0.4)', borderRight: 'none', borderBottom: 'none' }} />
            <div className="absolute -bottom-4 -right-4 w-20 h-20" style={{ border: '1px solid rgba(201,152,42,0.4)', borderLeft: 'none', borderTop: 'none' }} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8" style={{ color: '#e8e6e1' }}>
              A Quiet Revolution
              <br />
              <span className="italic" style={{ color: '#C9982A' }}>in Fine Dining</span>
            </h2>

            <div className="divider-gold w-16 mb-8" />

            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8c8779' }}>
              It began in a small cellar on the outskirts of Paris, where our
              founder, André Dumont, sought to strip away the artifice of
              traditional haute cuisine. He believed that luxury wasn't found
              in complexity, but in the profound clarity of a single, perfect
              ingredient.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#706b5d' }}>
              Today, AD Restaurant continues that philosophy. Every plate is a
              narrative, whispered through textures and temperatures that
              challenge the palate while comforting the soul. We don't just
              serve food; we curate moments of silence in a noisy world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Chef Feature ── */}
      <section
        ref={chefRef}
        className="relative py-28 overflow-hidden"
        style={{ background: '#0d0c0a' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,152,42,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Chef image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={chefInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden" style={{ height: '380px' }}>
                  <img
                    src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=600&q=85"
                    alt="Chef Julian Vasseur"
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(20%) brightness(0.7)' }}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  {/* Large AD watermark */}
                  <div
                    className="font-serif text-9xl font-bold opacity-5 leading-none select-none"
                    style={{ color: '#C9982A' }}
                  >
                    AD
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={chefInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="section-label mb-4">Head Chef</p>

              <h2
                className="font-serif text-4xl md:text-5xl font-light mb-2 leading-tight"
                style={{ color: '#e8e6e1' }}
              >
                Julian Vasseur
              </h2>

              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9982A">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
                <span className="text-xs tracking-widest uppercase ml-2" style={{ color: '#575249' }}>
                  3 Michelin Stars
                </span>
              </div>

              <div className="divider-gold w-16 mb-8" />

              <blockquote
                className="font-serif text-xl font-light italic leading-relaxed mb-10"
                style={{ color: '#ccc9c0', borderLeft: '2px solid #C9982A', paddingLeft: '1.25rem' }}
              >
                "Flavor is a memory we haven't experienced yet. My role is to
                bridge that gap with the finest elements the earth provides,
                treated with nothing but absolute respect."
              </blockquote>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: 'From', value: 'Lyon, France' },
                  { label: 'Cuisine', value: 'Botanical Cuisine' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#575249' }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: '#e8e6e1' }}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ border: '1px solid rgba(201,152,42,0.3)', color: '#706b5d' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9982A'; e.currentTarget.style.color = '#C9982A' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,152,42,0.3)'; e.currentTarget.style.color = '#706b5d' }}
                >
                  <Share2 size={14} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ border: '1px solid rgba(201,152,42,0.3)', color: '#706b5d' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9982A'; e.currentTarget.style.color = '#C9982A' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,152,42,0.3)'; e.currentTarget.style.color = '#706b5d' }}
                >
                  <BookOpen size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        ref={timelineRef}
        className="py-28 px-6"
        style={{ background: '#080807' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.p
              className="section-label mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              The Journey
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Milestones of Excellence
            </motion.h2>
            <motion.div
              className="divider-gold w-32 mx-auto mt-6"
              initial={{ scaleX: 0 }}
              animate={timelineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
          </div>

          {/* Vertical line on desktop */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,152,42,0.3), transparent)' }}
            />

            <div className="space-y-24">
              {timelineItems.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats (reused from Home) ── */}
      <StatsSection />

      {/* ── MVV Cards ── */}
      <section
        className="py-28 px-6"
        style={{ background: '#0d0c0a' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mvvCards.map((card, i) => (
              <MVVCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
