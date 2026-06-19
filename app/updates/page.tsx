import React from "react"
import { ExternalLink, Rss } from "lucide-react"
import { TierBadge } from "@/components/promise/TierBadge"
import promisesData from "@/data/promises.json"
import { SourceTier } from "@/types"
import Link from "next/link"

// Extract all sources AND updates and flatten them into a single timeline feed
const updatesFeed = promisesData.flatMap(promise => {
  const sources = promise.sources.map(source => ({
    ...source,
    promiseSlug: promise.slug,
    promiseTitle: promise.title,
    promiseStatus: promise.status,
    sector: promise.sector,
    isUpdate: false
  }))
  const updates = ((promise as Record<string, unknown>).updates as Array<{ title: string; url: string; publication: string; date: string; tier: number; summary: string }> ?? []).map(update => ({
    ...update,
    promiseSlug: promise.slug,
    promiseTitle: promise.title,
    promiseStatus: promise.status,
    sector: promise.sector,
    isUpdate: true
  }))
  return [...sources, ...updates]
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">Updates Feed</h1>
          <p className="text-muted-foreground text-lg">
            Chronological feed of all verified news, government orders, and progress updates across all promises.
          </p>
        </div>

        {updatesFeed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center transition-colors">
            <Rss className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-900 mb-2">No updates yet</h3>
            <p className="text-muted-foreground">Check back later for new verified updates.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {updatesFeed.map((update, index) => (
              <div key={index} className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        {new Date(update.date).toLocaleDateString("en-IN", { 
                          year: 'numeric', month: 'short', day: 'numeric' 
                        })}
                      </span>
                      <TierBadge tier={update.tier as SourceTier} />
                    </div>
                    <h2 className="font-bold text-xl text-slate-900 mb-2 flex items-center gap-2">
                      {update.isUpdate && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                          Major Update
                        </span>
                      )}
                      {update.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{update.summary}</p>
                  </div>
                  
                  <a 
                    href={update.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-udf-blue transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 cursor-pointer"
                  >
                    Read Source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl transition-colors duration-300">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Related Promise</div>
                  <Link href={`/promises/${update.promiseSlug}`} className="group flex items-center gap-3 cursor-pointer">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: update.sector.color }} />
                    <span className="font-medium text-slate-700 group-hover:text-udf-blue transition-colors line-clamp-1">{update.promiseTitle}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
