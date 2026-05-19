import React from "react"
import { cn } from "@/lib/utils"

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-[10px] md:text-[11px] italic text-slate-400 leading-relaxed max-w-2xl text-center mx-auto", className)}>
      Unofficial. Not affiliated with the Election Commission of India, Government of Kerala, or any political party. Independent citizen-maintained ledger.
    </p>
  )
}
