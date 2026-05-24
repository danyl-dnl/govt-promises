"use client"

import React, { useEffect, useState } from "react"

interface CountdownTimerProps {
  startDate: string
  termEndDate?: string // optional: for progress bar
}

function useElapsed(startDate: string) {
  const [elapsed, setElapsed] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const start = new Date(startDate).getTime()
    const tick = () => setElapsed(Math.max(0, Date.now() - start))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startDate])

  return { elapsed, mounted }
}

export function CountdownTimer({
  startDate,
  termEndDate = "2031-05-18T00:00:00Z",
}: CountdownTimerProps) {
  const { elapsed, mounted } = useElapsed(startDate)

  if (!mounted) {
    return (
      <div className="w-full animate-pulse select-none" aria-hidden="true">
        {/* Skeleton days */}
        <div className="flex items-baseline gap-3 mb-1">
          <div className="h-10 w-24 bg-slate-100 rounded-lg mb-1" />
          <div className="h-4 w-32 bg-slate-100 rounded" />
        </div>

        {/* Skeleton h : m : s */}
        <div className="flex items-center gap-1.5 mb-5">
          <div className="h-5 w-16 bg-slate-100 rounded" />
          <span className="text-slate-200 font-bold text-sm">:</span>
          <div className="h-5 w-16 bg-slate-100 rounded" />
          <span className="text-slate-200 font-bold text-sm">:</span>
          <div className="h-5 w-16 bg-slate-100 rounded" />
        </div>

        {/* Skeleton progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <div className="h-3 w-20 bg-slate-100 rounded" />
            <div className="h-3 w-8 bg-slate-100 rounded" />
          </div>
          <div className="h-[3px] w-full rounded-full bg-slate-100" />
          <div className="flex justify-between items-center mt-1.5">
            <div className="h-3 w-16 bg-slate-100 rounded" />
            <div className="h-3 w-16 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    )
  }

  const totalMs   = new Date(termEndDate).getTime() - new Date(startDate).getTime()
  const pct       = Math.min(100, (elapsed / totalMs) * 100)

  const totalSec  = Math.floor(elapsed / 1000)
  const days      = Math.floor(totalSec / 86400)
  const hours     = Math.floor((totalSec % 86400) / 3600)
  const minutes   = Math.floor((totalSec % 3600) / 60)
  const seconds   = totalSec % 60

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="w-full">
      {/* Primary: days */}
      <div className="flex items-baseline gap-3 mb-1">
        <span
          className="font-display font-bold text-slate-900 tabular-nums leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontVariantNumeric: "tabular-nums" }}
        >
          {days}
        </span>
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
          {days === 1 ? "day" : "days"} in office
        </span>
      </div>

      {/* Secondary: h : m : s */}
      <div className="flex items-center gap-1.5 mb-5">
        {[
          { v: pad(hours),   l: "hrs" },
          { v: pad(minutes), l: "min" },
          { v: pad(seconds), l: "sec" },
        ].map(({ v, l }, i) => (
          <React.Fragment key={l}>
            {i > 0 && (
              <span className="text-slate-200 font-bold text-sm select-none">:</span>
            )}
            <span className="tabular-nums text-sm font-bold text-slate-500 font-display" style={{ fontVariantNumeric: "tabular-nums" }}>
              {v}
              <span className="text-[10px] font-semibold text-slate-400 ml-0.5 uppercase tracking-wider">
                {l}
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Term progress */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Term progress
          </span>
          <span className="text-[10px] font-bold text-slate-500 tabular-nums">
            {pct.toFixed(1)}%
          </span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-udf-blue transition-all duration-1000 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] text-slate-300 font-medium">May 18, 2026</span>
          <span className="text-[10px] text-slate-300 font-medium">May 18, 2031</span>
        </div>
      </div>
    </div>
  )
}
