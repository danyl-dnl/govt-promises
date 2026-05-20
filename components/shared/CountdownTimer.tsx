"use client"

import React, { useEffect, useState } from "react"

interface CountdownTimerProps {
  startDate: string // ISO string
}

export function CountdownTimer({ startDate }: CountdownTimerProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const start = new Date(startDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = now - start

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000))
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  if (!mounted) return null

  const Unit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center min-w-[48px]">
      <span className="font-display font-bold text-3xl text-slate-900 tabular-nums leading-none">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold mt-1">{label}</span>
    </div>
  )

  const Sep = () => (
    <span className="font-bold text-2xl text-slate-200 leading-none pb-3 select-none">:</span>
  )

  return (
    <div className="flex items-end gap-1">
      <Unit value={String(days)} label="Days" />
      <Sep />
      <Unit value={hours.toString().padStart(2, "0")} label="Hrs" />
      <Sep />
      <Unit value={minutes.toString().padStart(2, "0")} label="Min" />
      <Sep />
      <Unit value={seconds.toString().padStart(2, "0")} label="Sec" />
    </div>
  )
}
