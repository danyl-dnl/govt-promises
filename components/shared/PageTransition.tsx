"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="w-full h-full flex flex-col flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
