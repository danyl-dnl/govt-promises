import React from "react"
import { BenefitCalculator } from "@/components/home/BenefitCalculator"
import { Calculator, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impact Calculator | UDF Promise Tracker",
  description: "Calculate your estimated monthly savings and benefits from the UDF manifesto election promises.",
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 mb-8 select-none">
          <Link href="/" className="hover:text-udf-blue transition-colors cursor-pointer">Home</Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <span className="text-slate-800">Impact Calculator</span>
        </nav>

        {/* Header Block */}
        <div className="mb-12 text-left bg-white rounded-2xl border border-slate-200/60 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-3 flex items-center gap-2.5">
              <span className="bg-udf-blue-bg p-2 rounded-lg text-udf-blue inline-flex">
                <Calculator className="h-6 w-6" />
              </span>
              Citizen Benefit Calculator
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              An interactive estimation tool to calculate the direct monthly value, savings, and subsidies applicable to your household based on UDF election commitments.
            </p>
          </div>
          
          <div className="shrink-0 text-left md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-xs text-slate-400 font-medium">
            <span className="block uppercase tracking-wider text-[10px] text-slate-400 mb-0.5">Focus Areas</span>
            <span className="block text-slate-600 font-semibold mb-1">Women Welfare, Agriculture & Education</span>
            <span className="block">Version 1.0 (Live Sync)</span>
          </div>
        </div>

        {/* Interactive Benefit Calculator Widget */}
        <div className="-mx-4 md:mx-0">
          <BenefitCalculator />
        </div>
        
      </div>
    </div>
  )
}
