"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { DonutChart } from "@/components/shared/DonutChart"
import { CountdownTimer } from "@/components/shared/CountdownTimer"
import {
  CheckCircle2,
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
  Clock,
  TrendingUp,
} from "lucide-react"
import promisesData from "@/data/promises.json"

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
    const sectorCounts: Record<string, { count: number; sector: any }> = {}

    promisesData.forEach((p) => {
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

  const statCards = [
    {
      href: "/promises?status=fulfilled",
      label: "Fulfilled",
      value: stats.fulfilled,
      color: "text-kerala-green",
      dot: "bg-kerala-green",
      pct: Math.round((stats.fulfilled / stats.total) * 100),
    },
    {
      href: "/promises?status=in-progress",
      label: "In Progress",
      value: stats.inProgress,
      color: "text-udf-blue",
      dot: "bg-udf-blue",
      pct: Math.round((stats.inProgress / stats.total) * 100),
    },
    {
      href: "/promises?status=pending",
      label: "Pending",
      value: stats.pending,
      color: "text-slate-500",
      dot: "bg-slate-300",
      pct: Math.round((stats.pending / stats.total) * 100),
    },
    {
      href: "/promises?status=evaded",
      label: "Evaded",
      value: stats.evaded,
      color: "text-red-600",
      dot: "bg-red-500",
      pct: Math.round((stats.evaded / stats.total) * 100),
    },
  ]

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">Dashboard</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
              Project Overview
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            Tracking <span className="text-slate-700 font-semibold">{stats.total}</span> core promises
          </p>
        </div>

        {/* ── Row 1: 4 stat chips ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Link
                href={s.href}
                className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
                <p className={`font-display font-bold text-3xl tabular-nums ${s.color}`}>{s.value}</p>
                <div className="mt-3 h-[2px] rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${s.dot}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">{s.pct}% of total</p>
              </Link>
            </motion.div>
          ))}
        </div>

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
            <div className="bg-white border border-slate-200 rounded-xl p-6 h-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
                Status Distribution
              </p>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <DonutChart data={stats.donutData} />
                </div>
                {/* Legend */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {stats.donutData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: d.color }}
                        />
                        <span className="text-xs text-slate-500 font-medium">{d.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 tabular-nums">{d.value}</span>
                    </div>
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
            <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Time in Office
                </p>
                <Clock className="h-4 w-4 text-slate-300" />
              </div>
              <div className="flex-1 flex items-center">
                <CountdownTimer startDate="2026-05-18T00:00:00Z" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-4 pt-4 border-t border-slate-100">
                UDF government sworn in · May 18, 2026
              </p>
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
              className="group block bg-white border border-slate-200 rounded-xl p-6 h-full hover:border-slate-300 hover:shadow-sm transition-all duration-200"
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
                    {stats.mostActiveSector.count} promises tracked
                  </p>
                </div>
              </div>

              {/* Mini bar showing sector share */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Share of total</span>
                  <span className="text-[10px] font-bold text-slate-600">
                    {Math.round((stats.mostActiveSector.count / stats.total) * 100)}%
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
