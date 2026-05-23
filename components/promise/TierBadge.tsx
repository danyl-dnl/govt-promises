import React from "react"
import { Badge } from "@/components/ui/badge"
import { SourceTier } from "@/types"

interface TierBadgeProps {
  tier: SourceTier
  className?: string
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  switch (tier) {
    case 1:
      return (
        <Badge variant="outline" className={`bg-kerala-green-bg text-kerala-green border-kerala-green/20 ${className}`}>
          Tier 1 — Official Gazette
        </Badge>
      )
    case 2:
      return (
        <Badge variant="outline" className={`bg-udf-blue-bg text-udf-blue border-udf-blue/20 ${className}`}>
          Tier 2 — Govt Press Release
        </Badge>
      )
    case 3:
    default:
      return (
        <Badge variant="outline" className={`bg-slate-100 text-slate-500 border-slate-200 ${className}`}>
          Tier 3 — National Wire
        </Badge>
      )
  }
}
