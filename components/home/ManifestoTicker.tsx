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
    <div className="w-full bg-udf-blue py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
          {MANIFESTO_ITEMS.map((item, i) => (
            <div key={`a-${i}`} className="flex items-center shrink-0">
              <span className="text-[10px] font-black tracking-[0.25em] text-white/90 mx-5 shrink-0 uppercase">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-300/60 shrink-0" />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee min-w-full shrink-0 items-center" aria-hidden="true">
          {MANIFESTO_ITEMS.map((item, i) => (
            <div key={`b-${i}`} className="flex items-center shrink-0">
              <span className="text-[10px] font-black tracking-[0.25em] text-white/90 mx-5 shrink-0 uppercase">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-300/60 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
