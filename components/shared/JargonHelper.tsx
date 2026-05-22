"use client"

import React, { useState, useRef, useEffect } from "react"
import { HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface JargonHelperProps {
  term: string
  displayText: string
}

const jargonDictionary: Record<string, { title: string; en: string; ml: string }> = {
  "cial model": {
    title: "CIAL Model (പി.പി.പി)",
    en: "Public-Private Partnership (PPP) model where government, public, and private investors own shares, like Cochin International Airport Limited.",
    ml: "സർക്കാരും പൊതുജനങ്ങളും സ്വകാര്യ വ്യക്തികളും ചേർന്നു ഓഹരി പങ്കാളിത്തത്തോടെ നടത്തുന്ന വികസന മാതൃക (പി.പി.പി മാതൃക)."
  },
  "dpr": {
    title: "DPR (വിശദമായ പദ്ധതി രൂപരേഖ)",
    en: "Detailed Project Report: The formal technical and financial blueprint of a project before execution.",
    ml: "ഒരു പദ്ധതിയുടെ സാങ്കേതിക-സാമ്പത്തിക വശങ്ങൾ വ്യക്തമാക്കുന്ന വിശദമായ പദ്ധതി റിപ്പോർട്ട്."
  },
  "mvd": {
    title: "MVD (മോട്ടോർ വാഹന വകുപ്പ്)",
    en: "Motor Vehicles Department: The state government body regulating licenses, registrations, and vehicle modifications.",
    ml: "സംസ്ഥാനത്തെ വാഹനാതിർത്തികളും ഡ്രൈവിംഗ് ലൈസൻസുകളും നിയമങ്ങളും നിയന്ത്രിക്കുന്ന പൊതു വകുപ്പ്."
  },
  "plan outlay": {
    title: "Plan Outlay (വികസന ഫണ്ട്)",
    en: "The total budget allocated by the state government for development and welfare schemes in a fiscal year.",
    ml: "വികസന ക്ഷേമ പദ്ധതികൾക്കായി സംസ്ഥാന സർക്കാർ ഒരു വർഷം നീക്കിവെക്കുന്ന മൊത്തം തുക."
  },
  "ex-gratia": {
    title: "Ex-Gratia (കാരുണ്യ ധനസഹായം)",
    en: "A payment made out of goodwill or moral obligation rather than legal liability (e.g. government negligence relief).",
    ml: "നിയമപരമായ ബാധ്യതകൾക്കപ്പുറം സർക്കാരിന്റെ ധാർമ്മിക ഉത്തരവാദിത്തത്തോടെ നൽകുന്ന സാമ്പത്തിക നഷ്ടപരിഹാരം."
  },
  "kpsc": {
    title: "KPSC (കേരള പി.എസ്.സി)",
    en: "Kerala Public Service Commission: The state administration recruitment board that conducts civil service exams.",
    ml: "സർക്കാർ തസ്തികകളിലേക്ക് ജീവനക്കാരെ തെരഞ്ഞെടുക്കുന്നതിനുള്ള ഭരണഘടനാ സ്ഥാപനം (പബ്ലിക് സർവീസ് കമ്മീഷൻ)."
  },
  "psc": {
    title: "PSC (പി.എസ്.സി)",
    en: "Public Service Commission: The government recruitment body for state public sector and civil services.",
    ml: "സർക്കാർ ജീവനക്കാരെയും ഉദ്യോഗാർത്ഥികളെയും സുതാര്യമായി നിയമിക്കുന്നതിനുള്ള പബ്ലിക് സർവീസ് കമ്മീഷൻ."
  },
  "life mission": {
    title: "LIFE Mission (ലൈഫ് മിഷൻ)",
    en: "Kerala's comprehensive state-sponsored housing program targeting homes for all landless and homeless citizens.",
    ml: "ഭവനരഹിതരായ എല്ലാ ജനങ്ങൾക്കും വീട് നിർമ്മിച്ച് നൽകുന്നതിനുള്ള കേരള സർക്കാരിന്റെ സമ്പൂർണ്ണ പാർപ്പിട പദ്ധതി."
  },
  "silverline": {
    title: "SilverLine (കെ-റെയിൽ പദ്ധതി)",
    en: "The proposed semi-high-speed rail project from Kasaragod to Thiruvananthapuram, recently scrapped due to protests.",
    ml: "തിരുവനന്തപുരം മുതൽ കാസർഗോഡ് വരെ വിഭാവനം ചെയ്തതും പിന്നീട് ഉപേക്ഷിച്ചതുമായ സെമി ഹൈസ്പീഡ് റെയിൽ പദ്ധതി (കെ-റെയിൽ)."
  }
}

export function JargonHelper({ term, displayText }: JargonHelperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  const key = term.toLowerCase().trim()
  const info = jargonDictionary[key]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!info) {
    return <span>{displayText}</span>
  }

  return (
    <span 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-baseline gap-0.5 font-semibold text-slate-900 border-b border-dashed border-udf-blue hover:text-udf-blue transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-udf-blue/20 rounded px-0.5 -mx-0.5"
        type="button"
      >
        {displayText}
        <HelpCircle className="h-3 w-3 text-slate-400 inline self-center shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 md:w-80 bg-white border border-slate-200 text-slate-800 p-4 shadow-xl rounded-xl z-50 pointer-events-auto block text-left"
            role="tooltip"
          >
            {/* Popover Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 block" />

            <span className="relative z-10 block">
              <span className="block text-sm font-bold text-slate-900 mb-2 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-udf-blue" />
                {info.title}
              </span>
              
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">English</span>
              <span className="block text-xs text-slate-600 mb-3 leading-relaxed">{info.en}</span>
              
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 font-malayalam">മലയാളം</span>
              <span className="block text-xs text-slate-600 font-malayalam leading-relaxed block">{info.ml}</span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/**
 * HighlightJargon Component
 * Finds known jargon terms inside text and wraps them in JargonHelper tooltips.
 */
interface HighlightJargonProps {
  text: string
}

export function HighlightJargon({ text }: HighlightJargonProps) {
  if (!text) return null

  // Create regex pattern to match all jargon terms
  // Order keys by length descending to match longer phrases first (e.g. "plan outlay" before "plan")
  const sortedTerms = Object.keys(jargonDictionary).sort((a, b) => b.length - a.length)
  
  // Construct regex pattern matching any of these terms as word boundaries
  // Use custom boundaries or handle space/hyphen properly
  const pattern = sortedTerms.map(term => {
    // Escape special characters for safety
    return term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }).join("|")
  
  const regex = new RegExp(`\\b(${pattern})\\b`, "gi")
  
  const parts = text.split(regex)
  if (parts.length === 1) return <>{text}</>

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = sortedTerms.includes(part.toLowerCase())
        if (isMatch) {
          return <JargonHelper key={index} term={part} displayText={part} />
        }
        return part
      })}
    </>
  )
}
