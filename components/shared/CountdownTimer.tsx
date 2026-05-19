"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

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

  return (
    <div className="flex justify-between w-full max-w-sm mx-auto text-center gap-2">
      <div className="flex flex-col items-center bg-udf-blue-bg rounded-lg p-2 flex-1 border border-udf-blue/20 shadow-sm">
        <span className="text-2xl font-bold font-display text-udf-blue">{days}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Days</span>
      </div>
      <div className="flex flex-col items-center bg-udf-blue-bg rounded-lg p-2 flex-1 border border-udf-blue/20 shadow-sm">
        <span className="text-2xl font-bold font-display text-udf-blue">{hours.toString().padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Hrs</span>
      </div>
      <div className="flex flex-col items-center bg-udf-blue-bg rounded-lg p-2 flex-1 border border-udf-blue/20 shadow-sm">
        <span className="text-2xl font-bold font-display text-udf-blue">{minutes.toString().padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Min</span>
      </div>
      <div className="flex flex-col items-center bg-udf-blue-bg rounded-lg p-2 flex-1 border border-udf-blue/20 shadow-sm">
        <span className="text-2xl font-bold font-display text-udf-blue">{seconds.toString().padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sec</span>
      </div>
    </div>
  )
}
