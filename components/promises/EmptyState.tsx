import React from "react"
import { SearchX } from "lucide-react"

export function EmptyState() {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
        <SearchX className="h-8 w-8" />
      </div>
      <h3 className="font-malayalam font-bold text-2xl text-slate-800 mb-2 tracking-normal">
        ഒന്നും കണ്ടെത്തിയില്ല
      </h3>
      <p className="text-muted-foreground max-w-sm">
        No promises found matching your current filters. Try adjusting your search or clearing some filters.
      </p>
    </div>
  )
}
