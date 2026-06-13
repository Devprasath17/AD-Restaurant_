import React from 'react'

export default function OpeningHours() {
  return (
    <div className="bg-dark-800 border border-dark-700 p-6 rounded-lg">
      <h3 className="text-gold-400 font-serif text-lg mb-4">Opening Hours</h3>
      <div className="text-dark-100 space-y-3">
        <div className="flex justify-between"><span>Monday - Thursday</span><span>17:00 — 23:00</span></div>
        <div className="flex justify-between"><span>Friday - Saturday</span><span>17:00 — 01:00</span></div>
        <div className="flex justify-between"><span>Sunday</span><span>12:00 — 22:00</span></div>
      </div>
    </div>
  )
}
