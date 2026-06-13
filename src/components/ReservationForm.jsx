import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function ReservationForm({ defaultDate }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-dark-300">Full Name</label>
          <input {...register('fullName', { required: true })} className={`w-full mt-1 bg-transparent border-b border-dark-700 py-2 focus:outline-none ${errors.fullName ? 'border-red-500' : 'border-dark-700'}`} />
        </div>
        <div>
          <label className="text-xs text-dark-300">Phone Number</label>
          <input {...register('phone', { required: true })} className={`w-full mt-1 bg-transparent border-b border-dark-700 py-2 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-dark-700'}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-dark-300">Email Address</label>
          <input {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className={`w-full mt-1 bg-transparent border-b border-dark-700 py-2 focus:outline-none ${errors.email ? 'border-red-500' : 'border-dark-700'}`} />
        </div>
        <div>
          <label className="text-xs text-dark-300">Number of Guests</label>
          <select {...register('guests', { required: true })} className="w-full mt-1 bg-transparent border-b border-dark-700 py-2">
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-dark-300">Date</label>
          <input {...register('date', { required: true })} defaultValue={defaultDate ? new Date(defaultDate).toISOString().slice(0,10) : ''} type="date" className="w-full mt-1 bg-transparent border-b border-dark-700 py-2" />
        </div>
        <div>
          <label className="text-xs text-dark-300">Time Slot</label>
          <select {...register('time', { required: true })} className="w-full mt-1 bg-transparent border-b border-dark-700 py-2">
            {['17:00','18:00','19:00','20:00','21:00'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-dark-300">Special Requests / Allergies</label>
        <textarea {...register('notes')} rows={3} className="w-full mt-1 bg-transparent border-b border-dark-700 py-2" />
      </div>

      <div className="pt-4">
        <button type="submit" className="w-full bg-gold-400 text-dark-900 font-semibold py-3 rounded hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition">
          {loading ? <span className="inline-block animate-pulse">Processing...</span> : 'CONFIRM RESERVATION'}
        </button>
      </div>

      {success && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-3 bg-dark-700 border border-gold-700 rounded text-gold-300">
          Reservation confirmed! We will contact you shortly.
        </motion.div>
      )}
    </motion.form>
  )
}
