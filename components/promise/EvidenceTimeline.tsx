"use client"

import React from "react"
import { ExternalLink } from "lucide-react"
import { TierBadge } from "@/components/promise/TierBadge"
import { Source } from "@/types"

interface EvidenceTimelineProps {
  sources: Source[]
}

export function EvidenceTimeline({ sources }: EvidenceTimelineProps) {
  if (sources.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
        <p className="text-muted-foreground">No verifiable evidence has been recorded for this promise yet.</p>
      </div>
    )
  }

  return (
    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8">
      {sources.map((source, index) => (
        <div key={index} className="mb-10 relative pl-8">
          {/* Node */}
          <div className="absolute w-4 h-4 rounded-full -left-[9px] top-1 border-4 border-white bg-slate-300 shadow-sm" />
          
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {new Date(source.date).toLocaleDateString("en-IN", { 
                  year: 'numeric', month: 'short', day: 'numeric' 
                })}
              </span>
              <TierBadge tier={source.tier} />
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-bold text-lg text-slate-900">{source.title}</h3>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-udf-blue transition-colors"
                  aria-label="View original source"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {source.summary}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Source: <span className="text-slate-700 font-extrabold">{source.publication}</span>
                </div>
                {source.url && source.url !== "#" && (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-udf-blue hover:text-udf-blue-dark transition-colors group"
                  >
                    View Original Report
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
