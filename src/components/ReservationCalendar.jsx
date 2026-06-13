import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function getCalendarMatrix(year, month) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0-6 (Sun-Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const matrix = []
  let week = new Array(7).fill(null)
  let day = 1
  // fill first week
  for (let i = startDay === 0 ? 6 : startDay - 1; i < 7; i++) {
    week[i] = day++
  }
  matrix.push(week)
  while (day <= daysInMonth) {
    week = new Array(7).fill(null)
    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      week[i] = day++
    }
    matrix.push(week)
  }
  return matrix
}

export default function ReservationCalendar({ value, onChange }) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [matrix, setMatrix] = useState([])

  useEffect(() => {
    setMatrix(getCalendarMatrix(viewDate.getFullYear(), viewDate.getMonth()))
  }, [viewDate])

  function prevMonth() {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }
  function nextMonth() {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  function select(day) {
    if (!day) return
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onChange?.(d)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-sm w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-gold-400 font-serif text-lg">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <div className="flex gap-2 text-dark-300">
          <button aria-label="Previous month" onClick={prevMonth} className="px-2 py-1 rounded hover:bg-dark-700">◀</button>
          <button aria-label="Next month" onClick={nextMonth} className="px-2 py-1 rounded hover:bg-dark-700">▶</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-dark-300 mb-3">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
          <div key={d} className="text-xs">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {matrix.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => {
              const isSelected = value && day && new Date(value).toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toDateString()
              return (
                <button
                  key={j}
                  onClick={() => select(day)}
                  disabled={!day}
                  className={`h-10 rounded ${day ? 'hover:bg-dark-700' : 'opacity-0 cursor-default'} flex items-center justify-center ${isSelected ? 'bg-gold-500 text-dark-900 font-semibold border border-gold-700' : 'text-dark-100'}`}
                >
                  {day || ''}
                </button>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  )
}
