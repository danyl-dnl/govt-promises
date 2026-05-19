"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function HeroSection() {
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
            <div className="bg-white rounded-2xl border border-border shadow-xl p-8 transform hover:rotate-0 transition-transform duration-500">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 text-center">Current Status Overview</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-slate-600 font-medium">Total Tracked</span>
                  <span className="font-display font-bold text-3xl text-foreground">74</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-kerala-green font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-kerala-green" /> Fulfilled
                  </span>
                  <span className="font-display font-bold text-3xl text-kerala-green">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-udf-blue font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-udf-blue" /> In Progress
                  </span>
                  <span className="font-display font-bold text-3xl text-udf-blue">1</span>
                </div>
              </div>
            </div>
            
            {/* Soft shadow below card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-slate-900/5 blur-xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
