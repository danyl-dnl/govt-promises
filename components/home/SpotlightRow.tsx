"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ArrowRight, BusFront, Activity, Wallet, ShieldCheck, Ship, Tractor, HardHat, GraduationCap, Scale, Landmark, Link2, Clock } from "lucide-react"
import Link from "next/link"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  "bus-front": <BusFront className="h-5 w-5" />,
  "activity": <Activity className="h-5 w-5" />,
  "wallet": <Wallet className="h-5 w-5" />,
  "shield-check": <ShieldCheck className="h-5 w-5" />,
  "ship": <Ship className="h-5 w-5" />,
  "tractor": <Tractor className="h-5 w-5" />,
  "hardhat": <HardHat className="h-5 w-5" />,
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  "scale": <Scale className="h-5 w-5" />,
  "landmark": <Landmark className="h-5 w-5" />,
}

export function SpotlightRow() {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // Arrange spotlight promises: p1 first, p61 second, then fill with other top promises
  const allPromises = promisesData as PromiseType[]
  const ksrtc = allPromises.find(p => p.id === 'p1')
  const vehicleMods = allPromises.find(p => p.id === 'p61')
  const otherPromises = allPromises.filter(p => p.id !== 'p1' && p.id !== 'p61')

  const spotlightPromises: PromiseType[] = []
  if (ksrtc) spotlightPromises.push(ksrtc)
  if (vehicleMods) spotlightPromises.push(vehicleMods)
  
  otherPromises.slice(0, 5 - spotlightPromises.length).forEach(p => {
    spotlightPromises.push(p)
  })

  return (
    <section className="py-16 bg-white border-b border-border overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 mb-8 flex justify-between items-end">
        <div>
          <h2 className="font-display font-bold text-3xl text-slate-900">Promises in the Spotlight</h2>
          <p className="text-muted-foreground mt-2">Key guarantees currently under active monitoring.</p>
        </div>
        <Link href="/promises" className="hidden md:flex items-center text-udf-blue font-medium hover:text-udf-blue-dark transition-colors group cursor-pointer">
          View All Promises
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 pt-4 px-4 md:px-8 gap-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {spotlightPromises.map((promise, index) => {
            const isFulfilled = promise.status === "fulfilled"
            const isInProgress = promise.status === "in-progress"
            const isEvaded = promise.status === "evaded"
            
            const cardBorderLeft = isFulfilled 
              ? "border-l-kerala-green" 
              : isInProgress 
                ? "border-l-udf-blue" 
                : isEvaded 
                  ? "border-l-evaded" 
                  : "border-l-slate-200"

            return (
              <motion.div
                key={promise.id}
                className="snap-start shrink-0 w-[280px] md:w-[320px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/promises/${promise.slug}`}>
                  <Card 
                    className={`h-full cursor-pointer hover:shadow-lg transition-all duration-300 border border-slate-200 border-l-4 ${cardBorderLeft} bg-white flex flex-col group`}
                    style={{ '--sector-color': promise.sector.color } as React.CSSProperties}
                  >
                    <CardContent className="p-6 flex-grow flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div 
                          className="p-2.5 rounded-lg text-white"
                          style={{ backgroundColor: promise.sector.color }}
                        >
                          {iconMap[promise.icon] || <ShieldCheck className="h-5 w-5" />}
                        </div>
                        <StatusBadge status={promise.status} />
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promise.sector.color }}>
                          {promise.sector.name}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-[var(--sector-color)] transition-colors">
                        {promise.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {promise.description}
                      </p>
  
                      {/* Metadata Row */}
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mb-4 flex-shrink-0">
                        <span className="flex items-center gap-1">
                          <Link2 className="h-3 w-3" />
                          {promise.sources?.length ?? 0} sources
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated {new Date(promise.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-[var(--sector-color)] transition-colors mt-auto">
                        View Details
                        <ArrowRight className="ml-auto h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}

          <div className="snap-start shrink-0 w-[280px] md:w-[320px] flex items-center justify-center p-6">
            <Link href="/promises" className="flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-udf-blue transition-colors group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-udf-blue group-hover:bg-udf-blue-bg transition-colors">
                <ArrowRight className="h-6 w-6" />
              </div>
              <span className="font-medium">See all {promisesData.length} promises</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
