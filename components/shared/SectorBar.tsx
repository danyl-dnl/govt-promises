"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SectorBarProps {
  percentage: number
  color: string
}

export function SectorBar({ percentage, color }: SectorBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Small delay to allow the mount animation to trigger nicely
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}
