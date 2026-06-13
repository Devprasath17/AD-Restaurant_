import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import MapSection from '../components/MapSection'

const contactCards = [
  {
    title: 'Address',
    icon: MapPin,
    lines: ['1221 Avenue of the Arts', 'New York, NY 10020'],
  },
  {
    title: 'Phone',
    icon: Phone,
    lines: ['+1 (212) 555-0198', 'Available for reservations and concierge support'],
  },
  {
    title: 'Email',
    icon: Mail,
    lines: ['concierge@ad-restaurant.com', 'Private events, press, and VIP requests'],
  },
  {
    title: 'Opening Hours',
    icon: Clock,
    lines: ['Mon - Thu: 17:00 — 23:00', 'Fri - Sat: 17:00 — 01:00', 'Sun: 12:00 — 22:00'],
  },
]

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 6 + Math.random() * 12,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
}))

export default function ContactLocation() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="bg-[#070605]"
    >
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/hero-restaurant.svg"
            alt="Contact hero background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {particles.map(particle => (
            <motion.span
              key={particle.id}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6 + particle.delay, ease: 'easeInOut' }}
              className="absolute rounded-full bg-gold-400/20"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                filter: 'blur(0.8px)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="uppercase tracking-[0.4em] text-xs text-[#C9982A]/80"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl text-5xl md:text-6xl font-serif font-light text-white"
          >
            Connect With AD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm uppercase tracking-[0.26em] text-[#b0b0b0]"
          >
            Crafting unforgettable culinary experiences.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="glass-card border border-white/10 p-6 hover:-translate-y-2 hover:border-gold-400/30 transition-transform duration-500"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-300">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">{card.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm leading-relaxed text-[#d0c5af]">
                    {card.lines.map(line => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8 }}
            className="glass-card border border-white/10 p-8 md:p-12"
          >
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Inquiries</span>
              <h2 className="mt-4 text-3xl font-serif font-light text-white">For private events, media inquiries, or special requests.</h2>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <MapSection />
    </motion.main>
  )
}
