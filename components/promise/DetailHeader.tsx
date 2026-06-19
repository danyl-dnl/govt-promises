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
      {/* Top Status Announcement Bar */}
      <div 
        className="py-2.5 px-4 flex items-start sm:items-center justify-center gap-2 border-b text-xs font-bold uppercase tracking-wider transition-all duration-300"
        style={{ 
          backgroundColor: statusColor + '0d', 
          borderColor: statusColor + '20',
          color: statusColor
        }}
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0 mt-1 sm:mt-0">
          {promise.status === 'in-progress' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
        <span>
          {promise.status === 'fulfilled' && 'Verification Audit: Implementation confirmed and complete'}
          {promise.status === 'in-progress' && 'Verification Audit: Promise actively being implemented'}
          {promise.status === 'evaded' && 'Verification Audit: Government action is currently evaded or stalled'}
          {promise.status === 'pending' && 'Verification Audit: Awaiting initial government action'}
        </span>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-y-1 text-xs font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-udf-blue transition-colors cursor-pointer">Home</Link>
          <ChevronRight className="h-3 w-3 mx-1.5 sm:mx-2 shrink-0" />
          <Link href="/promises" className="hover:text-udf-blue transition-colors cursor-pointer">Promises</Link>
          <ChevronRight className="h-3 w-3 mx-1.5 sm:mx-2 shrink-0" />
          <span className="text-slate-800 line-clamp-1 max-w-[120px] sm:max-w-xs md:max-w-none">{promise.title}</span>
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

        {/* Verbatim Manifesto Quote Card */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm transition-all duration-300">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-udf-blue to-kerala-green" />
          <div className="px-6 py-6 md:px-8 md:py-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                📄 Verbatim — UDF Manifesto 2026
              </p>
              <div className="text-slate-200">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
            <p className="font-display italic text-lg md:text-xl text-slate-700 leading-relaxed relative z-10">
              &ldquo;<HighlightJargon text={promise.manifestoQuote} />&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
