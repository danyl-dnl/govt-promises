"use client"

import React from "react"
import { motion } from "framer-motion"

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
    status: "in-progress"
  },
  {
    date: "JUN 01, 2026",
    title: "First Policy Address",
    description: "Expected Governor's address outlining the legislative agenda and welfare rollout timeline.",
    status: "pending"
  },
  {
    date: "JUL 10, 2026",
    title: "State Budget Presentation",
    description: "Expected presentation of the revised State Budget and the separate Agricultural Budget.",
    status: "pending"
  }
]

export function GovTimeline() {
  return (
    <section className="py-20 bg-slate-50 border-b border-border">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Governance Timeline</h2>
          <p className="text-muted-foreground mt-2">Key milestones and policy implementations since day one.</p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-[120px]">
          {timelineEvents.map((event, index) => {
            const isFulfilled = event.status === "fulfilled"
            const isInProgress = event.status === "in-progress"
            
            let bulletColor = "bg-slate-300"
            let borderColor = "border-slate-200"
            if (isFulfilled) {
              bulletColor = "bg-kerala-green"
              borderColor = "border-kerala-green"
            } else if (isInProgress) {
              bulletColor = "bg-udf-blue"
              borderColor = "border-udf-blue"
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
                <div className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 border-4 border-white ${bulletColor} shadow-sm z-10`} />
                
                {/* Connecting Line override for fulfilled/progress */}
                {(isFulfilled || isInProgress) && (
                  <div className={`absolute w-0.5 h-full -left-[1px] top-4 ${bulletColor} opacity-50 z-0`} />
                )}

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0">
                  {/* Date label - absolutely positioned on desktop to the left */}
                  <div className="md:absolute md:-left-[140px] md:top-0.5 md:w-[100px] md:text-right">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isFulfilled ? 'text-kerala-green' : isInProgress ? 'text-udf-blue' : 'text-slate-400'}`}>
                      {event.date}
                    </span>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex-1 ml-0 hover:shadow-md transition-shadow">
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
