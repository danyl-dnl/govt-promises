"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ArrowRight, BusFront, Activity, Wallet, ShieldCheck, Ship, Tractor, HardHat } from "lucide-react"
import { Promise as PromiseType } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  "bus-front": <BusFront className="h-4 w-4" />,
  "activity": <Activity className="h-4 w-4" />,
  "wallet": <Wallet className="h-4 w-4" />,
  "shield-check": <ShieldCheck className="h-4 w-4" />,
  "ship": <Ship className="h-4 w-4" />,
  "tractor": <Tractor className="h-4 w-4" />,
  "hardhat": <HardHat className="h-4 w-4" />,
}

interface HorizontalCardProps {
  promise: PromiseType
}

export function HorizontalCard({ promise }: HorizontalCardProps) {
  let statusColor = "#64748B"
  if (promise.status === "fulfilled") statusColor = "#15803D"
  else if (promise.status === "in-progress") statusColor = "#2563EB"
  else if (promise.status === "evaded") statusColor = "#DC2626"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/promises/${promise.slug}`}>
        <div className="group relative bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row">
          {/* Status Color Stripe */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all duration-200"
            style={{ backgroundColor: statusColor }}
          />
          
          <div className="p-5 pl-6 md:p-6 md:pl-8 flex-grow flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center p-1.5 rounded bg-slate-100 text-slate-500">
                {iconMap[promise.icon] || <ShieldCheck className="h-4 w-4" />}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promise.sector.color }}>
                {promise.sector.name}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-udf-blue transition-colors mb-1">
              {promise.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 max-w-3xl">
              {promise.description}
            </p>
          </div>
          
          <div className="p-5 pl-6 md:p-6 md:pl-4 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 bg-slate-50/50 min-w-[180px]">
            <StatusBadge status={promise.status} />
            <div className="flex items-center text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-udf-blue transition-colors">
              View Details
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
