import React from "react"

const MANIFESTO_ITEMS = [
  "FREE BUS TRAVEL FOR WOMEN",
  "ASHA WORKERS HONORARIUM HIKE",
  "WELFARE PENSION RAISED TO ₹3,000",
  "NYAY: ₹6,000/MONTH FOR BPL FAMILIES",
  "OOMMEN CHANDY HEALTH INSURANCE",
  "STUDENT STIPEND FOR GIRLS",
  "INTEREST-FREE YOUTH LOANS",
  "DEDICATED SENIOR CITIZENS MINISTRY",
  "MISSION SAMUDRA LAUNCH",
  "WAYANAD TRIBAL UNIVERSITY",
  "MSP ₹300/KG FOR RUBBER",
]

export function ManifestoTicker() {
  return (
    <div className="w-full bg-slate-100 border-b border-border overflow-hidden py-3 transition-colors duration-300">
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* We use two identical lists for seamless CSS animation */}
        <div className="flex animate-marquee min-w-full shrink-0">
          {MANIFESTO_ITEMS.map((item, i) => (
            <div key={`ticker-1-${i}`} className="flex items-center shrink-0">
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 mx-6 shrink-0">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee min-w-full shrink-0" aria-hidden="true">
          {MANIFESTO_ITEMS.map((item, i) => (
            <div key={`ticker-2-${i}`} className="flex items-center shrink-0">
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 mx-6 shrink-0">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
