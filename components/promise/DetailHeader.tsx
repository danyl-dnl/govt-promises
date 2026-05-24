import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Promise as PromiseType } from "@/types"
import { HighlightJargon } from "@/components/shared/JargonHelper"

interface DetailHeaderProps {
  promise: PromiseType
}

export function DetailHeader({ promise }: DetailHeaderProps) {
  let statusColor = "#64748B"
  if (promise.status === "fulfilled") statusColor = "#15803D"
  else if (promise.status === "in-progress") statusColor = "#2563EB"
  else if (promise.status === "evaded") statusColor = "#DC2626"

  return (
    <div className="relative bg-white border-b border-border transition-colors duration-300">
      {/* Top Status Band */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: statusColor }}
      />
      
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-udf-blue transition-colors cursor-pointer">Home</Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link href="/promises" className="hover:text-udf-blue transition-colors cursor-pointer">Promises</Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <span className="text-slate-800 line-clamp-1 max-w-[200px] md:max-w-none">{promise.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promise.sector.color }}>
                {promise.sector.name}
              </span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 leading-tight mb-2 tracking-[-0.02em]">
              {promise.title}
            </h1>

            {promise.titleMl && promise.titleMl !== promise.title && (
              <p className="font-malayalam text-xl md:text-2xl text-slate-500 font-semibold mb-4 leading-normal">
                {promise.titleMl}
              </p>
            )}
            
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mt-2">
              <HighlightJargon text={promise.description} />
            </p>
          </div>
          
          <div className="shrink-0 flex flex-col items-start md:items-end gap-3 mt-2 md:mt-0">
            <StatusBadge status={promise.status} className="text-sm px-3 py-1.5" />
            <div className="text-xs text-slate-500 text-left md:text-right">
              <span className="block mb-1">Last Updated:</span>
              <span className="font-medium text-slate-700">
                {new Date(promise.lastUpdated).toLocaleDateString("en-IN", { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Verbatim Manifesto Quote */}
        <div className="bg-slate-50 rounded-xl p-6 md:p-8 border-l-4 border-slate-300 relative transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 text-slate-300 opacity-50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="font-display italic text-lg md:text-xl text-slate-700 relative z-10">
            &ldquo;<HighlightJargon text={promise.manifestoQuote} />&rdquo;
          </p>
          <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            — UDF Election Manifesto 2026
          </div>
        </div>
      </div>
    </div>
  )
}
