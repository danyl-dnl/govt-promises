"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ArrowRight, BusFront, Activity, Wallet, ShieldCheck, Ship, Tractor, HardHat, GraduationCap, Scale, Landmark } from "lucide-react"
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

      <div className="relative w-full">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 pt-4 px-4 md:px-8 gap-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {spotlightPromises.map((promise, index) => (
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
                <Card className="h-full cursor-pointer hover:shadow-md transition-all duration-300 border-slate-200 bg-white flex flex-col group">
                  <CardContent className="p-6 flex flex-col h-full">
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
                    
                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-udf-blue transition-colors">
                      {promise.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">
                      {promise.description}
                    </p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-udf-blue transition-colors mt-auto">
                      View Details
                      <ArrowRight className="ml-auto h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}

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
