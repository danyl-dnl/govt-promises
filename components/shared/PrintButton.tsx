"use client"

import React from "react"
import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-slate-500 hover:text-slate-700 rounded-lg border border-slate-200 shadow-sm transition-all hover:bg-slate-50"
      title="Print Document"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">Print</span>
    </button>
  )
}
