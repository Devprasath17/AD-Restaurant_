import React from 'react'
import { FiPhone, FiMapPin } from 'react-icons/fi'

export default function LocationCard() {
  return (
    <div className="bg-dark-800 border border-dark-700 p-6 rounded-lg">
      <h3 className="text-gold-400 font-serif text-lg mb-4">Location</h3>
      <div className="text-dark-100">
        <p className="font-semibold">1221 Avenue of the Arts,</p>
        <p>New York, NY 10020</p>
        <div className="mt-4">
          <div className="flex items-center gap-2"><FiPhone className="text-gold-400" /> <span>+1 (212) 555-0198</span></div>
          <div className="mt-2"><a href="mailto:concierge@ad-restaurant.com" className="text-dark-100">concierge@ad-restaurant.com</a></div>
        </div>

        <div className="mt-6 flex gap-3">
          <a href="tel:+12125550198" className="px-4 py-2 border border-dark-700 rounded hover:bg-dark-700 flex items-center gap-2"><FiPhone /> CLICK TO CALL</a>
          <a href="#" className="px-4 py-2 border border-dark-700 rounded hover:bg-dark-700 flex items-center gap-2">WHATSAPP</a>
        </div>
      </div>
    </div>
  )
}
