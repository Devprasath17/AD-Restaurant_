import React, { useState } from 'react'
import ReservationCalendar from '../components/ReservationCalendar'
import ReservationForm from '../components/ReservationForm'
import { motion } from 'framer-motion'

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <ReservationCalendar value={selectedDate} onChange={setSelectedDate} />

          <div className="bg-dark-800 border border-dark-700 p-6 rounded-lg">
            <h3 className="text-gold-400 font-serif text-lg">Reservation Policy</h3>
            <p className="text-dark-100 mt-3 text-sm">We request that all guests arrive promptly. Tables are held for a maximum of 15 minutes. For parties larger than 8, please contact our private dining concierge directly.</p>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img src="/src/assets/restaurant.svg" alt="restaurant" className="w-full h-48 object-cover transform hover:scale-105 transition" />
          </div>
        </div>

        <div className="md:col-span-8">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-dark-800 border border-dark-700 p-8 rounded-lg">
            <h1 className="font-serif text-4xl text-gold-400">Secure Your Table</h1>
            <p className="text-dark-100 mt-3">Experience culinary heritage and modern artistry. Please select your preferred date and time for an unforgettable evening at AD.</p>

            <div className="mt-6">
              <ReservationForm defaultDate={selectedDate} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
