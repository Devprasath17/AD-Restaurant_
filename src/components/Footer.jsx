import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = ['Privacy', 'Terms', 'Press', 'Contact']
const socialLinks = [
  { Icon: Instagram, href: '#' },
  { Icon: Facebook, href: '#' },
  { Icon: Twitter, href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: '#080807',
        borderColor: 'rgba(201,152,42,0.12)',
      }}
    >
      {/* Top divider gradient */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="font-serif text-3xl font-bold tracking-widest" style={{ color: '#C9982A' }}>
              AD RESTAURANT
            </span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#706b5d' }}>
              Crafted for the discerning palate. Every dish tells a story of
              heritage, passion, and culinary excellence.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs tracking-widest uppercase font-medium mb-6"
              style={{ color: '#C9982A' }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#C9982A' }} />
                <span className="text-sm" style={{ color: '#8c8779' }}>
                  Chennai, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} style={{ color: '#C9982A' }} />
                <a
                  href="tel:+919876543210"
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#8c8779' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9982A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8c8779')}
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} style={{ color: '#C9982A' }} />
                <a
                  href="mailto:contact@adrestaurant.com"
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#8c8779' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9982A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8c8779')}
                >
                  contact@adrestaurant.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="text-xs tracking-widest uppercase font-medium mb-6"
              style={{ color: '#C9982A' }}
            >
              Hours
            </h3>
            <ul className="space-y-2">
              {[
                { day: 'Mon – Thu', time: '6:00 PM – 10:30 PM' },
                { day: 'Fri – Sat', time: '6:00 PM – 11:30 PM' },
                { day: 'Sunday', time: '12:00 PM – 9:00 PM' },
              ].map(({ day, time }) => (
                <li key={day} className="flex justify-between text-sm gap-8">
                  <span style={{ color: '#ccc9c0' }}>{day}</span>
                  <span style={{ color: '#706b5d' }}>{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(201,152,42,0.08)' }}
        >
          <p className="text-xs" style={{ color: '#3f3c36' }}>
            © 2026 AD Restaurant. Crafted for the discerning palate.
          </p>

          <ul className="flex items-center gap-6">
            {footerLinks.map(label => (
              <li key={label}>
                <Link
                  to={`/${label.toLowerCase()}`}
                  className="text-xs tracking-wider uppercase transition-colors duration-200"
                  style={{ color: '#575249' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9982A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#575249')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300"
                style={{ borderColor: 'rgba(201,152,42,0.3)', color: '#706b5d' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C9982A'
                  e.currentTarget.style.color = '#C9982A'
                  e.currentTarget.style.background = 'rgba(201,152,42,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,152,42,0.3)'
                  e.currentTarget.style.color = '#706b5d'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
