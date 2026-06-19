"use client"

import React, { useState, useEffect } from "react"

const SECTIONS = [
  { id: "commitment", label: "The Commitment" },
  { id: "evidence-trail", label: "Evidence Trail" },
  { id: "related-promises", label: "Related Promises" },
]

export function StickyDetailTOC() {
  const [activeId, setActiveId] = useState("commitment")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 }
    )

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <nav className="sticky top-24 space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">On this page</p>
      <ul className="space-y-3">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex items-center gap-2.5 text-xs py-0.5 transition-all duration-200 group uppercase tracking-wider font-semibold
                ${activeId === s.id 
                  ? "text-udf-blue font-bold" 
                  : "text-slate-400 hover:text-slate-700"}`}
            >
              <span
                className={`block h-px rounded transition-all duration-200
                  ${activeId === s.id ? "bg-udf-blue w-5" : "bg-slate-200 w-3 group-hover:w-4 group-hover:bg-slate-400"}`}
              />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
