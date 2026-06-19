"use client"

import React from "react"
import { ExternalLink } from "lucide-react"
import { TierBadge } from "@/components/promise/TierBadge"
import { Source } from "@/types"
import { motion } from "framer-motion"

interface EvidenceTimelineProps {
  sources: Source[]
  promiseId: string
}

export function EvidenceTimeline({ sources, promiseId }: EvidenceTimelineProps) {
  if (sources.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center transition-colors duration-300">
        <p className="text-muted-foreground">No verifiable evidence has been recorded for this promise yet.</p>
      </div>
    )
  }

  const sortedSources = [...sources].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="relative ml-4 md:ml-8">
      {/* Timeline Background Line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-slate-200" />
      {/* Animated Timeline Line */}
      <motion.div
        className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-udf-blue via-blue-400 to-kerala-green origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {sortedSources.map((source, index) => {
        // Fallback to our custom local Mock Press/Gazette Reader archive URL
        const archiveUrl = source.archiveUrl || `/archive/${promiseId}-${index + 1}`

        const nodeColor = source.tier === 1 
          ? "bg-kerala-green" 
          : source.tier === 2 
            ? "bg-udf-blue" 
            : "bg-slate-400"

        const cardBorderColor = source.tier === 1 
          ? "border-l-kerala-green" 
          : source.tier === 2 
            ? "border-l-udf-blue" 
            : "border-l-slate-300"

        return (
          <div key={index} className="mb-10 relative pl-8">
            {/* Node */}
            <div className={`absolute w-4 h-4 rounded-full -left-[1px] top-1 border-4 border-white ${nodeColor} shadow-sm z-10`} />
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-2 flex-wrap">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-slate-800 text-white text-[9px] font-bold tracking-wider uppercase font-mono shadow-sm">
                  {new Date(source.date).toLocaleDateString("en-IN", { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                  })}
                </span>
                <TierBadge tier={source.tier} />
              </div>
              
              <div className={`bg-white p-4 md:p-5 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 border-l-4 ${cardBorderColor} hover:shadow-md`}>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="font-bold text-lg text-slate-900 leading-snug">{source.title}</h3>
                  {((source.url && source.url !== "#") || archiveUrl) && (
                    <a 
                       href={source.url !== "#" ? source.url : archiveUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="shrink-0 p-3 md:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-udf-blue transition-colors cursor-pointer"
                       aria-label="View source report"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">
                  {source.summary}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Source: <span className="text-slate-700 font-extrabold">{source.publication}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {source.url && source.url !== "#" && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-udf-blue hover:text-udf-blue-dark transition-colors group bg-slate-50 hover:bg-slate-100/80 px-3.5 py-3 md:px-2.5 md:py-1.5 rounded-lg border border-slate-100 cursor-pointer select-none"
                      >
                        View Original
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {archiveUrl && (
                      <a 
                        href={archiveUrl}
                        className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700 transition-colors group bg-slate-50 hover:bg-slate-100/80 px-3.5 py-3 md:px-2.5 md:py-1.5 rounded-lg border border-slate-100 cursor-pointer select-none"
                      >
                        Archived Copy
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
