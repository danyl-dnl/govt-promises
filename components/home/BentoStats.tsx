"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { DonutChart } from "@/components/shared/DonutChart"
import { CountdownTimer } from "@/components/shared/CountdownTimer"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"
import {
  HeartPulse,
  Users,
  ShieldCheck,
  Building,
  Sprout,
  Briefcase,
  BookOpen,
  GraduationCap,
  DollarSign,
  Scale,
  Landmark,
  HardHat,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import promisesData from "@/data/promises.json"
import { Sector, Promise as PromiseType } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  "users": <Users className="h-4 w-4" />,
  "heart-pulse": <HeartPulse className="h-4 w-4" />,
  "shield-check": <ShieldCheck className="h-4 w-4" />,
  "building": <Building className="h-4 w-4" />,
  "sprout": <Sprout className="h-4 w-4" />,
  "briefcase": <Briefcase className="h-4 w-4" />,
  "book-open": <BookOpen className="h-4 w-4" />,
  "graduation-cap": <GraduationCap className="h-4 w-4" />,
  "dollar-sign": <DollarSign className="h-4 w-4" />,
  "scale": <Scale className="h-4 w-4" />,
  "landmark": <Landmark className="h-4 w-4" />,
  "hardhat": <HardHat className="h-4 w-4" />,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 280, damping: 24 },
  }),
}

export function BentoStats() {
  const stats = useMemo(() => {
    let fulfilled = 0
    let inProgress = 0
    let evaded = 0
    let pending = 0
    const sectorCounts: Record<string, { count: number; sector: Sector }> = {};

    (promisesData as PromiseType[]).forEach((p) => {
      if (p.status === "fulfilled") fulfilled++
      else if (p.status === "in-progress") inProgress++
      else if (p.status === "evaded") evaded++
      else pending++

      const sectorId = p.sector.id
      if (!sectorCounts[sectorId]) {
        sectorCounts[sectorId] = { count: 0, sector: p.sector }
      }
      sectorCounts[sectorId].count++
    })

    let maxSector = { id: "", name: "Health", icon: "heart-pulse", color: "#10B981" }
    let maxSectorCount = 0
    Object.values(sectorCounts).forEach(({ count, sector }) => {
      if (count > maxSectorCount) {
        maxSectorCount = count
        maxSector = sector
      }
    })

    const total = promisesData.length

    return {
      total,
      fulfilled,
      inProgress,
      evaded,
      pending,
      donutData: [
        { name: "Fulfilled", value: fulfilled, color: "#15803D" },
        { name: "In Progress", value: inProgress, color: "#2563EB" },
        { name: "Evaded", value: evaded, color: "#DC2626" },
        { name: "Pending", value: pending, color: "#CBD5E1" },
      ],
      mostActiveSector: {
        id: maxSector.id,
        name: maxSector.name,
        icon: maxSector.icon,
        color: maxSector.color,
        count: maxSectorCount,
      },
    }
  }, [])

  return (
    <section className="py-14 bg-white border-b border-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">Dashboard</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
              Project Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Click any status category or active sector card below to instantly view and filter relevant promises.
            </p>
          </div>
          <p className="text-sm text-slate-400 font-medium shrink-0">
            Tracking <span className="text-slate-700 font-semibold"><AnimatedCounter value={stats.total} /></span> core promises
          </p>
        </div>

        {/* Segmented status progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex h-2.5 rounded-full overflow-hidden gap-px bg-slate-100 shadow-sm border border-slate-100">
            {[
              { value: stats.fulfilled, color: "#15803D", label: "Fulfilled" },
              { value: stats.inProgress, color: "#2563EB", label: "In Progress" },
              { value: stats.evaded, color: "#DC2626", label: "Evaded" },
              { value: stats.pending, color: "#CBD5E1", label: "Pending" },
            ].map((seg, i) => (
              <motion.div
                key={seg.label}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{ backgroundColor: seg.color }}
                initial={{ width: 0 }}
                whileInView={{ width: stats.total > 0 ? `${(seg.value / stats.total) * 100}%` : "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
                title={`${seg.label}: ${seg.value}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Row 2: Donut + Timer + Sector ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Donut chart */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6 h-full transition-colors duration-300">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
                Status Distribution
              </p>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <DonutChart data={stats.donutData} />
                </div>
                {/* Legend */}
                <div className="flex flex-col gap-2 flex-1">
                  {stats.donutData.map((d) => (
                    <Link
                      key={d.name}
                      href={`/promises?status=${d.name.toLowerCase().replace(" ", "-")}`}
                      className="group flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: d.color }}
                        />
                        <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 group-hover:font-semibold transition-colors">
                          {d.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 tabular-nums group-hover:text-udf-blue transition-colors">
                        <AnimatedCounter value={d.value} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Time in office */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col transition-colors duration-300">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4 flex-shrink-0">
                Cabinet Term Progress
              </p>
              <div className="flex-grow flex items-center">
                <CountdownTimer startDate="2026-05-18T00:00:00Z" />
              </div>
            </div>
          </motion.div>

          {/* Most active sector */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Link
              href={`/promises?sector=${stats.mostActiveSector.id}`}
              className="group block border border-slate-200 rounded-xl p-6 h-full hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #ffffff 60%, ${stats.mostActiveSector.color}08 100%)`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Most Active Sector
                </p>
                <TrendingUp className="h-4 w-4 text-slate-300 group-hover:text-udf-blue transition-colors duration-200" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors duration-200 flex-shrink-0">
                  {iconMap[stats.mostActiveSector.icon] || <ShieldCheck className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-slate-900 leading-tight">
                    {stats.mostActiveSector.name}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    <AnimatedCounter value={stats.mostActiveSector.count} /> promises tracked
                  </p>
                </div>
              </div>

              {/* Mini bar showing sector share */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Share of total</span>
                  <span className="text-[10px] font-bold text-slate-600">
                    <AnimatedCounter value={Math.round((stats.mostActiveSector.count / stats.total) * 100)} suffix="%" />
                  </span>
                </div>
                <div className="h-[2px] rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-udf-blue"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.round((stats.mostActiveSector.count / stats.total) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-udf-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-[11px] font-semibold">View promises</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
