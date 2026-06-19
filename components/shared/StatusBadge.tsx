import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"
import { Status } from "@/types"

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case "fulfilled":
      return (
        <Badge className={`bg-kerala-green hover:bg-kerala-green text-white border-transparent font-semibold shadow-sm gap-1 ${className}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          Fulfilled
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className={`bg-udf-blue-bg text-udf-blue border-udf-blue/30 font-semibold gap-1.5 shadow-sm ${className}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-udf-blue opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-udf-blue" />
          </span>
          <span>In Progress</span>
        </Badge>
      )
    case "evaded":
      return (
        <Badge className={`bg-evaded hover:bg-evaded text-white border-transparent font-semibold shadow-sm gap-1 ${className}`}>
          <XCircle className="h-3.5 w-3.5" />
          Evaded
        </Badge>
      )
    case "pending":
    default:
      return (
        <Badge variant="outline" className={`bg-slate-50 text-pending border-slate-200 font-semibold gap-1 ${className}`}>
          <AlertCircle className="h-3.5 w-3.5" />
          Pending
        </Badge>
      )
  }
}
