"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Layers, ClipboardCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

const frameworkCards = [
  {
    icon: <ClipboardCheck className="h-6 w-6 text-udf-blue" />,
    title: "100% Manifesto Sourced",
    titleMl: "പൂർണ്ണമായും മാനിഫെസ്റ്റോ അധിഷ്ഠിതം",
    description: "Every single tracked commitment is directly extracted from the official UDF 2026 Election Manifesto. No rumors, no political spin, and no external bias.",
    bgClass: "bg-blue-50/50  hover:bg-blue-50/80  border-blue-100 ",
    iconBg: "bg-blue-100 "
  },
  {
    icon: <Layers className="h-6 w-6 text-indigo-600" />,
    title: "Objective Status Lifecycle",
    titleMl: "സുതാര്യമായ പുരോഗതി ഘട്ടങ്ങൾ",
    description: "Promises transition objectively through Pending, In Progress, Fulfilled, or Evaded statuses based strictly on legislative and physical execution progress.",
    bgClass: "bg-indigo-50/50  hover:bg-indigo-50/80  border-indigo-100 ",
    iconBg: "bg-indigo-100 "
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-kerala-green" />,
    title: "Strict 3-Tier Verification",
    titleMl: "കർശനമായ 3-ഘട്ട പരിശോധന",
    description: "Every status transition is backed by publicly verifiable links classified into Tiers: Gazette Orders (Tier 1), CMO Press Releases (Tier 2), or Credible Media Wires (Tier 3).",
    bgClass: "bg-kerala-green-bg  hover:bg-kerala-green-bg/80  border-emerald-100 ",
    iconBg: "bg-emerald-100 "
  }
]

export function TrustFramework() {
  return (
    <section className="py-16 bg-slate-50/30 border-b border-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-udf-blue" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Methodology & Transparency</span>
          </div>
          
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
            How We Track Government Commitments
          </h2>
          <p className="font-malayalam text-lg text-slate-500 font-semibold mt-1">
            സുതാര്യവും നിഷ്പക്ഷവുമായ നിരീക്ഷണ പ്രക്രിയ
          </p>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto mt-3 leading-relaxed">
            Vaaku Paalicho is a non-partisan citizen ledger. We do not judge or express opinions; we simply present verified public facts to keep citizens objectively informed.
          </p>
        </div>

        {/* Bento/Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {frameworkCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${card.bgClass} shadow-sm`}
            >
              <div>
                <div className={`p-3 rounded-xl w-fit ${card.iconBg} mb-6 shadow-sm`}>
                  {card.icon}
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 leading-snug mb-1">
                  {card.title}
                </h3>
                <p className="font-malayalam text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  {card.titleMl}
                </p>
                
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {index === 2 && (
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center">
                  <Link 
                    href="/about#methodology" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-kerala-green uppercase tracking-wider hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    Explore Evidence Tiers
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
