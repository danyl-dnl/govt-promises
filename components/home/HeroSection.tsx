"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, CheckCircle } from "lucide-react"

import promisesData from "@/data/promises.json"

export function HeroSection() {
  const totalTracked = promisesData.length
  const fulfilledCount = promisesData.filter(p => p.status === "fulfilled").length
  const inProgressCount = promisesData.filter(p => p.status === "in-progress").length
  const fulfillmentPct = totalTracked > 0 ? Math.round((fulfilledCount / totalTracked) * 100) : 0

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 26 } }
  }

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-0 md:pt-28">

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Blue glow top-right */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-3xl" />
      {/* Green glow bottom-left */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-16 md:pb-20">

          {/* LEFT — Text */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.05] text-slate-900 mb-5 tracking-tight"
            >
              <span className="block text-2xl md:text-3xl text-slate-400 font-malayalam font-semibold mb-3 tracking-normal">
                യു.ഡി.എഫ് വാഗ്ദാനങ്ങൾ
              </span>
              Tracking Every{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-udf-blue">UDF Promise</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9.5C60 3.5 150 1.5 298 9.5"
                    stroke="#BFDBFE"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              to Kerala.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-500 max-w-xl mb-8 leading-relaxed">
              An independent, evidence-based ledger tracking the core election promises made by the UDF in Kerala. Built for transparency, trusted by citizens.
            </motion.p>

            {/* Search */}
            <motion.div variants={itemVariants} className="w-full max-w-md mb-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const query = formData.get("search")
                  if (query) window.location.href = `/promises?q=${encodeURIComponent(query.toString())}`
                }}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:border-udf-blue focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-200 shadow-sm"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search any promise..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  required
                />
                <Button type="submit" size="sm" className="bg-udf-blue hover:bg-udf-blue-dark text-white rounded-xl px-5 h-9 text-xs font-semibold shrink-0">
                  Search
                </Button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <Link href="/promises">
                <Button size="default" className="bg-slate-900 hover:bg-slate-700 text-white rounded-xl px-6 h-11 text-sm font-semibold shadow-sm group transition-all duration-200">
                  Browse All Promises
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="default" className="rounded-xl px-5 h-11 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                  <ShieldCheck className="mr-1.5 h-4 w-4" />
                  How We Verify
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Stats Card */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.15 }}
          >
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">
              {/* Top gradient stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-udf-blue via-blue-400 to-kerala-green" />

              {/* Card header */}
              <div className="px-7 pt-6 pb-5 flex items-center justify-between border-b border-slate-50">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Live Dashboard</p>
                  <h3 className="text-base font-bold text-slate-900">Current Status Overview</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-kerala-green animate-pulse" />
                  <span className="text-[10px] font-bold text-kerala-green uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Stats rows */}
              <div className="divide-y divide-slate-50">
                <Link href="/promises" className="group flex items-center justify-between px-7 py-4 hover:bg-slate-50/70 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Total Tracked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl text-slate-900 tabular-nums group-hover:text-udf-blue transition-colors">{totalTracked}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-udf-blue transition-all duration-200" />
                  </div>
                </Link>

                <Link href="/promises?status=fulfilled" className="group flex items-center justify-between px-7 py-4 hover:bg-emerald-50/40 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-kerala-green" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Fulfilled</span>
                  </div>
                  <span className="font-display font-bold text-2xl text-kerala-green tabular-nums">{fulfilledCount}</span>
                </Link>

                <Link href="/promises?status=in-progress" className="group flex items-center justify-between px-7 py-4 hover:bg-blue-50/40 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-udf-blue animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">In Progress</span>
                  </div>
                  <span className="font-display font-bold text-2xl text-udf-blue tabular-nums">{inProgressCount}</span>
                </Link>
              </div>

              {/* Fulfillment bar */}
              <div className="px-7 py-5 bg-slate-50/60">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fulfillment Rate</span>
                  <span className="text-sm font-bold text-slate-700">{fulfillmentPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-udf-blue to-kerala-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${fulfillmentPct}%` }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative blurred card behind */}
            <div className="absolute -z-10 -bottom-3 left-4 right-4 h-full rounded-3xl bg-blue-100/40 blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 48L60 42.7C120 37.3 240 26.7 360 26.7C480 26.7 600 37.3 720 40C840 42.7 960 37.3 1080 32C1200 26.7 1320 21.3 1380 18.7L1440 16V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z" fill="#2563EB" fillOpacity="1"/>
        </svg>
      </div>
    </section>
  )
}
