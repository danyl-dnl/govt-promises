import React from "react"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onClearFilters?: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-6">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-6 text-slate-400 relative">
        <span className="absolute inset-0 rounded-full border border-slate-200 animate-ping opacity-45" />
        <SearchX className="h-8 w-8 z-10" />
      </div>
      
      <h3 className="font-malayalam font-bold text-2xl text-slate-800 mb-3 tracking-normal">
        ഒന്നും കണ്ടെത്തിയില്ല
      </h3>
      
      <p className="font-malayalam text-slate-500 max-w-md mb-3 text-sm leading-relaxed">
        നിങ്ങൾ തിരഞ്ഞെടുത്ത ഫിൽട്ടറുകളുമായി പൊരുത്തപ്പെടുന്ന വാഗ്ദാനങ്ങളൊന്നും കണ്ടെത്താൻ കഴിഞ്ഞില്ല. തിരയൽ പദങ്ങളിലോ ഫിൽട്ടറുകളിലോ മാറ്റം വരുത്തി വീണ്ടും ശ്രമിക്കുക.
      </p>
      
      <p className="text-slate-400 max-w-md text-xs mb-8">
        No promises found matching your current filters. Try adjusting your search or clearing some filters.
      </p>

      {onClearFilters && (
        <Button
          onClick={onClearFilters}
          className="bg-slate-900 hover:bg-slate-700 text-white rounded-xl px-5 h-10 text-xs font-semibold shadow-xs cursor-pointer select-none"
        >
          Clear Active Filters
        </Button>
      )}
    </div>
  )
}
