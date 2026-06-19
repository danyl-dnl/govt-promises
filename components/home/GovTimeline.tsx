"use client"

import React from "react"
import { motion } from "framer-motion"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

const timelineEvents = [
  {
    date: "MAY 18, 2026",
    title: "Oath of Office",
    description: "The new UDF cabinet officially takes oath at the Central Stadium, Thiruvananthapuram.",
    status: "fulfilled"
  },
  {
    date: "MAY 18, 2026",
    title: "First Cabinet Decisions",
    description: "Approved free bus travel for women and raised ASHA workers' honorarium by ₹3,000.",
    status: "fulfilled"
  },
  {
    date: "MAY 19, 2026",
    title: "NYAY Scheme Data Collection",
    description: "Finance department initiates BPL data collection for the direct cash transfer scheme.",
    status: "in-progress"
  },
  {
    date: "MAY 20, 2026",
    title: "Landmark Cabinet Decisions",
    description: "Cabinet recommended KPSC rank list extensions, officially scrapped the controversial SilverLine project, announced a 100-day action plan, and approved a ₹5 lakh medical negligence compensation.",
    status: "fulfilled"
  },
  {
    date: "MAY 21, 2026",
    title: "Cabinet Portfolio Allocation",
    description: "Official portfolio distribution approved by the Governor. CM V.D. Satheesan retains Finance, Law, and Ports, while Ramesh Chennithala is assigned Home and K. Muraleedharan gets Health.",
    status: "fulfilled"
  },
  {
    date: "MAY 23, 2026",
    title: "Delhi Governance Meet",
    description: "CM V.D. Satheesan visits New Delhi to coordinate with central leaders on welfare rollouts, legislative strategy, and high-priority infrastructure development.",
    status: "fulfilled"
  },
  {
    date: "MAY 29, 2026",
    title: "First Policy Address",
    description: "Governor Rajendra Vishwanath Arlekar delivers the policy address to the Assembly, outlining the UDF's 'Vision 2031' roadmap and key welfare guarantees.",
    status: "fulfilled"
  },
  {
    date: "JUN 01, 2026",
    title: "100-Day Action Plan Launch",
    description: "The UDF government's 100-day action plan formally commences across all departments to execute priority manifesto promises.",
    status: "in-progress"
  },
  {
    date: "JUN 04, 2026",
    title: "Financial White Paper Tabled",
    description: "CM V.D. Satheesan tables the Financial White Paper in the Assembly, detailing the state's fiscal health and liabilities.",
    status: "fulfilled"
  },
  {
    date: "JUN 15, 2026",
    title: "Priyadarshini Scheme Launched",
    description: "The flagship 'Priyadarshini' free KSRTC travel scheme for all women and transgender persons officially launches across Kerala, fulfilling the first major 'Indira Guarantee' of the UDF manifesto.",
    status: "fulfilled"
  },
  {
    date: "JUN 19, 2026",
    title: "State Budget Presentation",
    description: "Expected presentation of the revised State Budget for the 2026-27 financial year and the separate Agricultural Budget, with key welfare scheme allocations expected.",
    status: "pending"
  }
]

export function GovTimeline() {
  // Get latest 5 promise updates
  const recentPromiseUpdates = (promisesData as PromiseType[])
    .flatMap(p => {
      if (!p.updates) return []
      return p.updates.map(u => ({
        ...u,
        promiseTitle: p.title
      }))
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map(u => {
      const d = new Date(u.date)
      const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
      const day = d.getDate().toString().padStart(2, '0')
      return {
        date: `${month} ${day}, ${d.getFullYear()}`,
        rawDate: d.getTime(),
        title: `Update: ${u.promiseTitle}`,
        description: u.summary || u.title,
        status: "in-progress"
      }
    })

  const allEvents = [
    ...timelineEvents.map(e => ({ ...e, rawDate: new Date(e.date).getTime() })), 
    ...recentPromiseUpdates
  ].sort((a, b) => b.rawDate - a.rawDate)

  return (
    <section className="py-20 bg-slate-50 border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">Governance Timeline</h2>
          <p className="text-muted-foreground mt-2">Key milestones and policy implementations since day one.</p>
        </div>

        <div className="relative ml-4 md:ml-[120px]">
          {/* Timeline background base line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 origin-top" />
          
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-udf-blue via-kerala-green to-slate-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {allEvents.map((event, index) => {
            const isFulfilled = event.status === "fulfilled"
            const isInProgress = event.status === "in-progress"
            
            let bulletColor = "bg-slate-300 "
            if (isFulfilled) {
              bulletColor = "bg-kerala-green "
            } else if (isInProgress) {
              bulletColor = "bg-udf-blue "
            }

            return (
              <motion.div 
                key={index}
                className="mb-10 relative pl-8 md:pl-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className={`absolute w-4 h-4 rounded-full -left-[7px] top-1 border-4 border-white ${bulletColor} shadow-sm z-10`} />
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
                  {/* Date label - styled as a bold press-dateline badge */}
                  <div className="md:absolute md:-left-[140px] md:top-1 md:w-[100px] md:text-right">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-slate-800 text-white text-[9px] font-bold tracking-wider uppercase font-mono shadow-sm">
                      {event.date}
                    </span>
                  </div>
                  
                  <div className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex-1 ml-0 hover:shadow-md transition-all duration-300 border-l-4 ${
                    isFulfilled 
                      ? "border-l-kerala-green" 
                      : isInProgress 
                        ? "border-l-udf-blue" 
                        : "border-l-slate-200"
                  }`}>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
