"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

import promisesData from "@/data/promises.json"

export function HeroSection() {
  const totalTracked = promisesData.length
  const fulfilledCount = promisesData.filter(p => p.status === "fulfilled").length
  const inProgressCount = promisesData.filter(p => p.status === "in-progress").length

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-udf-blue-bg blur-3xl mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-kerala-green animate-pulse" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live Tracker</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-4 tracking-[-0.04em]">
              <span className="block text-4xl md:text-5xl text-slate-500 font-malayalam font-semibold mb-2 tracking-normal">യു.ഡി.എഫ് വാഗ്ദാനങ്ങൾ</span>
              Holding Power <br /> <span className="text-udf-blue">Accountable.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              An independent, evidence-based ledger tracking the core election promises made by the UDF in Kerala. Built for transparency, trusted by citizens.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link href="/promises">
                <Button size="lg" className="bg-udf-blue hover:bg-udf-blue-dark text-white rounded-full px-8 h-12 text-base shadow-md group">
                  Explore Promises 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="rounded-full px-6 h-12 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  <ShieldCheck className="mr-2 h-4 w-4 text-slate-400" />
                  How We Verify
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, rotate: 0, y: 30 }}
            animate={{ opacity: 1, rotate: -1.5, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            {/* Professional Status Card */}
            <div className="relative bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden transform hover:rotate-0 transition-transform duration-500">

              {/* Blue top accent line */}
              <div className="h-[3px] w-full bg-udf-blue" />

              {/* Header */}
              <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-slate-100">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-0.5">Live Tracker</p>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Current Status Overview</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-kerala-green animate-pulse" />
                  <span className="text-[10px] font-semibold text-kerala-green uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Stats */}
              <div className="divide-y divide-slate-100">

                {/* Total Tracked */}
                <Link
                  href="/promises"
                  className="group flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Total Tracked</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl text-slate-900 tabular-nums group-hover:text-udf-blue transition-colors duration-200">{totalTracked}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-udf-blue transition-all duration-200" />
                  </div>
                </Link>

                {/* Fulfilled */}
                <Link
                  href="/promises?status=fulfilled"
                  className="group flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-kerala-green flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Fulfilled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl text-kerala-green tabular-nums">{fulfilledCount}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-kerala-green/30 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-kerala-green transition-all duration-200" />
                  </div>
                </Link>

                {/* In Progress */}
                <Link
                  href="/promises?status=in-progress"
                  className="group flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-udf-blue flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl text-udf-blue tabular-nums">{inProgressCount}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-udf-blue/30 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-udf-blue transition-all duration-200" />
                  </div>
                </Link>

              </div>

              {/* Fulfillment bar footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Fulfillment Rate</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    {totalTracked > 0 ? Math.round((fulfilledCount / totalTracked) * 100) : 0}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-kerala-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalTracked > 0 ? (fulfilledCount / totalTracked) * 100 : 0}%` }}
                    transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

            </div>

            {/* Subtle drop shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-slate-900/8 blur-xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
