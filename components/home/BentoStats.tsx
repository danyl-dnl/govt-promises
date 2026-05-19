"use client"

import React, { useMemo } from "react"
import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonutChart } from "@/components/shared/DonutChart"
import { CountdownTimer } from "@/components/shared/CountdownTimer"
import { CheckCircle2, HeartPulse } from "lucide-react"
import promisesData from "@/data/promises.json"

const cardHoverVariants: Variants = {
  resting: { scale: 1, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
  hover: { scale: 1.015, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }
}

export function BentoStats() {
  const stats = useMemo(() => {
    let fulfilled = 0;
    let inProgress = 0;
    let evaded = 0;
    let pending = 0;
    const sectorCounts: Record<string, number> = {};
    promisesData.forEach(p => {
      if (p.status === 'fulfilled') fulfilled++;
      else if (p.status === 'in-progress') inProgress++;
      else if (p.status === 'evaded') evaded++;
      else pending++;

      const sectorName = p.sector.name;
      sectorCounts[sectorName] = (sectorCounts[sectorName] || 0) + 1;
    });

    let maxSectorName = "Health";
    let maxSectorCount = 0;
    Object.entries(sectorCounts).forEach(([name, count]) => {
      if (count > maxSectorCount) {
        maxSectorCount = count;
        maxSectorName = name;
      }
    });
    
    return {
      fulfilled,
      inProgress,
      evaded,
      pending,
      donutData: [
        { name: "Fulfilled", value: fulfilled, color: "#15803D" },
        { name: "In Progress", value: inProgress, color: "#2563EB" },
        { name: "Evaded", value: evaded, color: "#DC2626" },
        { name: "Pending", value: pending, color: "#6B7280" },
      ],
      mostActiveSector: {
        name: maxSectorName,
        count: maxSectorCount
      }
    };
  }, []);

  return (
    <section className="py-16 bg-slate-50 border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Project Overview</h2>
          <p className="text-muted-foreground mt-2">Live statistics on the status of {promisesData.length} core promises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Large Cell: Donut Chart */}
          <motion.div 
            className="md:col-span-2 lg:col-span-2 md:row-span-2"
            variants={cardHoverVariants}
            initial="resting"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="h-full flex flex-col bg-white border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-slate-700">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center p-6">
                <DonutChart data={stats.donutData} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Medium Cell: Days in Office */}
          <motion.div 
            className="md:col-span-1 lg:col-span-2"
            variants={cardHoverVariants}
            initial="resting"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="h-full flex flex-col justify-center bg-white border-slate-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-udf-blue" />
              <CardHeader className="pb-4">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Time in Office</CardTitle>
              </CardHeader>
              <CardContent>
                <CountdownTimer startDate="2026-05-18T00:00:00Z" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Medium Cell: Most Active Sector (Static for now as Health) */}
          <motion.div 
            className="md:col-span-1 lg:col-span-1"
            variants={cardHoverVariants}
            initial="resting"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="h-full flex flex-col justify-center bg-kerala-green-light border-kerala-green/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wider text-kerala-green">Most Active Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-white p-3 rounded-full shadow-sm text-kerala-green">
                    {/* Render icon dynamically if possible, falling back to HeartPulse */}
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-xl text-slate-900">{stats.mostActiveSector.name}</p>
                    <p className="text-xs text-kerala-green font-medium">Tracking {stats.mostActiveSector.count} promises</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Small Cells: Individual Counts */}
          <motion.div 
            variants={cardHoverVariants} initial="resting" whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="h-full bg-white border-slate-200 flex flex-col justify-center">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Fulfilled</p>
                  <p className="font-display font-bold text-3xl text-kerala-green">{stats.fulfilled}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-kerala-green/20" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Spacer cell for grid perfection on lg screens */}
          <motion.div 
            className="hidden lg:block lg:col-span-2 xl:hidden"
            variants={cardHoverVariants} initial="resting" whileHover="hover"
          />
          
        </div>
      </div>
    </section>
  )
}
