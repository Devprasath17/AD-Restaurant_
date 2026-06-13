import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

const fieldClass = 'peer bg-transparent border border-[#302f2e] focus:border-gold-400/60 focus:outline-none rounded-xl px-4 py-4 text-sm text-on-surface placeholder-transparent transition-colors duration-300'

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [sent, setSent] = useState(false)

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 900))
    setSent(true)
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
        ].map(field => (
          <label key={field.name} className="relative block">
            <input
              {...register(field.name, { required: field.required })}
              type={field.type}
              placeholder=" "
              className={fieldClass}
            />
            <span className="pointer-events-none absolute left-4 top-4 origin-[0_0] text-xs text-on-surface-variant transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-[10px]">
              {field.label}
            </span>
            {errors[field.name] && (
              <span className="text-xs text-red-400 mt-2 block">{field.label} is required.</span>
            )}
          </label>
        ))}
      </div>

      <div className="relative block">
        <select
          {...register('type')}
          className={fieldClass}
          defaultValue="General Inquiry"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Private Dining">Private Dining</option>
          <option value="Press & Media">Press & Media</option>
          <option value="Careers">Careers</option>
        </select>
        <span className="pointer-events-none absolute left-4 top-4 origin-[0_0] text-xs text-on-surface-variant transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-[10px]">
          Inquiry Type
        </span>
      </div>

      <div className="relative block">
        <textarea
          {...register('message', { required: true })}
          placeholder=" "
          rows={5}
          className={fieldClass + ' min-h-[160px]'}
        />
        <span className="pointer-events-none absolute left-4 top-4 origin-[0_0] text-xs text-on-surface-variant transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-[10px]">
          Your Message
        </span>
        {errors.message && (
          <span className="text-xs text-red-400 mt-2 block">Message is required.</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca4d] to-[#c9982a] py-4 text-sm font-semibold uppercase tracking-[0.28em] text-dark-900 shadow-[0_20px_60px_rgba(212,175,55,0.18)] transition-transform duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {sent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gold-400/30 bg-[#111111] p-4 text-sm text-gold-300"
        >
          Thanks for reaching out — we will respond within 24 hours.
        </motion.div>
      )}
    </motion.form>
  )
}
