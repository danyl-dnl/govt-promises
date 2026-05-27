"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, animate } from "framer-motion"
import { Calculator, Check, ArrowRight, Info, HelpCircle } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/shared/StatusBadge"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

// Demographics config mapping to benefits and actual UDF manifesto promise slugs
const BENEFIT_MAPPINGS = [
  {
    id: "woman",
    label: "Female Citizen",
    labelMl: "വനിതാ പൗരൻ",
    description: "Eligible for free public transport travel schemes",
    benefitValue: 800,
    benefitLabel: "Free Bus Travel",
    promiseSlug: "free-ksrtc-bus-travel-for-women-1"
  },
  {
    id: "student",
    label: "College Girl Student",
    labelMl: "കോളേജ് വിദ്യാർത്ഥിനി",
    description: "Eligible for higher education financial assistance and stipends",
    benefitValue: 1000,
    benefitLabel: "Monthly Student Stipend",
    promiseSlug: "1-000-monthly-stipend-for-college-going-girl-students-2"
  },
  {
    id: "pensioner",
    label: "Welfare Pension Beneficiary",
    labelMl: "ക്ഷേമ പെൻഷൻ ഗുണഭോക്താവ്",
    description: "Eligible for social security, agricultural, or welfare pension hikes",
    benefitValue: 1000, // Monthly increase: from ₹2,000 to ₹3,000
    benefitLabel: "Pension Increase (₹2k to ₹3k)",
    promiseSlug: "increase-welfare-pension-to-3-000-4"
  },
  {
    id: "farmer",
    label: "Rubber Small Farmer",
    labelMl: "റബ്ബർ കർഷകൻ",
    description: "Eligible for rubber price subsidies and minimum support price hikes",
    benefitValue: 4000, // Average monthly gain assuming standard low-tier yields
    benefitLabel: "Rubber MSP Subsidy Support",
    promiseSlug: "3-support-price-for-rubber-31"
  }
]

export function BenefitCalculator() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [customValues, setCustomValues] = useState<{ [key: string]: number }>({
    woman: 800,
    student: 1000,
    pensioner: 1000,
    farmer: 4000,
  })
  const [displayValue, setDisplayValue] = useState(0)

  // Calculate targets based on selected demographics
  const { totalBenefit, matchedPromises } = useMemo(() => {
    let benefitSum = 0
    const matchedSlugs: string[] = []

    selectedIds.forEach((id) => {
      const config = BENEFIT_MAPPINGS.find((b) => b.id === id)
      if (config) {
        benefitSum += customValues[id] ?? config.benefitValue
        matchedSlugs.push(config.promiseSlug)
      }
    })

    // Fetch live promises status dynamically from the raw promises.json file
    const promisesList = (promisesData as PromiseType[]).filter((p) =>
      matchedSlugs.includes(p.slug)
    )

    return {
      totalBenefit: benefitSum,
      matchedPromises: promisesList
    }
  }, [selectedIds, customValues])

  // Framer Motion rolling number counter logic
  useEffect(() => {
    const controls = animate(displayValue, totalBenefit, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (value) => setDisplayValue(Math.round(value))
    })
    return () => controls.stop()
  }, [totalBenefit])

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-slate-50 border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
            Manifesto Impact Estimator
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto mt-3 leading-relaxed">
            Select your demographic attributes to calculate your estimated monthly savings and benefits under the UDF manifesto commitments, customize the values to match your household, and track their live execution statuses!
          </p>
        </div>

        {/* Bento Grid Panel */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 transition-colors duration-300">
          
          {/* Column 1: Demographics Selectors */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Your Categories
            </h3>
            
            <div className="flex flex-col gap-3">
              {BENEFIT_MAPPINGS.map((item) => {
                const isSelected = selectedIds.includes(item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection(item.id)}
                    className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all select-none flex flex-col gap-2 ${
                      isSelected
                        ? "border-udf-blue bg-blue-50/20 shadow-sm"
                        : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
                            isSelected
                              ? "bg-udf-blue border-udf-blue text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <p className="font-bold text-sm text-slate-800 leading-tight">
                              {item.label}
                            </p>
                            <span className="font-malayalam text-[10px] font-semibold text-slate-400">
                              {item.labelMl}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded px-2.5 py-1.5 shadow-xs shrink-0 ml-4 tabular-nums">
                        +₹{isSelected ? customValues[item.id] : item.benefitValue}/mo
                      </span>
                    </div>

                    {/* Expandable Custom Value Editor */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t border-slate-200/50 flex items-center gap-3 overflow-hidden"
                          onClick={(e) => e.stopPropagation()} // Prevent toggling when clicking input
                        >
                          <span className="text-xs font-semibold text-slate-500">Your custom value:</span>
                          <div className="relative flex items-center flex-1 max-w-[130px]">
                            <span className="absolute left-2.5 text-xs font-bold text-slate-400">₹</span>
                            <input
                              type="number"
                              value={customValues[item.id]}
                              onChange={(e) => {
                                const val = Math.max(0, parseInt(e.target.value) || 0)
                                setCustomValues((prev) => ({ ...prev, [item.id]: val }))
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-6 pr-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-udf-blue focus:ring-1 focus:ring-udf-blue transition-all"
                            />
                          </div>
                          <span className="text-[10px] text-slate-400">/ month</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            
            <div className="flex items-start gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2 transition-colors">
              <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Calculations are objective estimates based on proposed policy terms. Customize the estimated values or yields to directly fit your budget and scenario.
              </p>
            </div>
          </div>

          {/* Column 2: Total counter + Applied promises list */}
          <div className="md:col-span-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0 md:pl-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Your Monthly Benefit Estimate
              </h3>

              {/* Rolling Counter */}
              <div className="flex items-baseline gap-2.5 mb-6">
                <span 
                  className="font-display font-black text-slate-900 tracking-tight leading-none"
                  style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)" }}
                >
                  ₹{displayValue.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest pb-1.5">
                  / month
                </span>
              </div>

              {/* Matched promises */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Applicable Manifesto Guarantees
                </h4>

                <div className="relative min-h-[140px] flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {matchedPromises.length > 0 ? (
                      matchedPromises.map((promise) => {
                        const benefitInfo = BENEFIT_MAPPINGS.find(
                          (b) => b.promiseSlug === promise.slug
                        )
                        return (
                          <motion.div
                            key={promise.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 350, damping: 26 }}
                            className="bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl p-4 flex items-center justify-between transition-colors shadow-xs group"
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <span className="text-[9px] font-bold text-udf-blue uppercase tracking-wider block mb-0.5">
                                {benefitInfo?.benefitLabel} (+₹{(benefitInfo ? customValues[benefitInfo.id] : 0).toLocaleString("en-IN")}/mo)
                              </span>
                              <Link 
                                href={`/promises/${promise.slug}`}
                                className="font-bold text-sm text-slate-800 group-hover:text-udf-blue transition-colors line-clamp-1 block"
                              >
                                {promise.title}
                              </Link>
                              {promise.titleMl && (
                                <p className="font-malayalam text-xs font-medium text-slate-400 truncate mt-0.5 leading-normal">
                                  {promise.titleMl}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <StatusBadge status={promise.status} className="text-[10px]" />
                              <Link 
                                href={`/promises/${promise.slug}`}
                                className="w-7 h-7 rounded-full bg-white border border-slate-200 group-hover:border-udf-blue group-hover:text-udf-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                              >
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )
                      })
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 rounded-xl"
                      >
                        <HelpCircle className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-sm font-medium text-slate-500">No categories checked</p>
                        <p className="text-xs text-slate-400 mt-0.5">Toggle the options on the left to see benefits</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {matchedPromises.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs"
              >
                <span className="text-slate-400 font-medium">
                  Matches {matchedPromises.length} core manifesto promise{matchedPromises.length > 1 ? "s" : ""}
                </span>
                <Link 
                  href="/promises" 
                  className="font-bold text-udf-blue hover:text-udf-blue-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  Browse all promises
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
