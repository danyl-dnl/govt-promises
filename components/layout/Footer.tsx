import React from "react"
import Link from "next/link"
import { Landmark } from "lucide-react"
import { Disclaimer } from "@/components/shared/Disclaimer"

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 mt-auto">
      {/* Gradient top border in Kerala flag colors/brand colors */}
      <div className="h-1 w-full bg-gradient-to-r from-green-600 via-udf-blue to-green-600" />
      
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="h-8 w-8 text-udf-blue" />
              <span className="font-display font-bold text-2xl text-white">
                Vaaku Paalicho
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              An independent, evidence-based ledger tracking the core election promises made by the UDF in Kerala. Built for transparency, trusted by citizens.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">Pages</h4>
            <div className="flex flex-col gap-4 md:gap-3 text-sm font-medium">
              <Link href="/promises" className="hover:text-white hover:translate-x-1 transition-all">All Promises</Link>
              <Link href="/sectors" className="hover:text-white hover:translate-x-1 transition-all">Sectors</Link>
              <Link href="/updates" className="hover:text-white hover:translate-x-1 transition-all">Live Updates</Link>
              <Link href="/impact" className="hover:text-white hover:translate-x-1 transition-all">Benefit Calculator</Link>
            </div>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">Project</h4>
            <div className="flex flex-col gap-4 md:gap-3 text-sm font-medium">
              <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all">About Us</Link>
              <Link href="/about#methodology" className="hover:text-white hover:translate-x-1 transition-all">Methodology</Link>
              <Link href="/submit" className="hover:text-white hover:translate-x-1 transition-all">Submit Evidence</Link>
              <a href="https://github.com/danyl-dnl/govt-promises" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all">GitHub Repo</a>
            </div>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500 max-w-2xl text-center md:text-left">
            <Disclaimer />
          </div>
          <p className="text-xs font-medium text-slate-400 shrink-0">
            © {new Date().getFullYear()} Vaaku Paalicho Kerala.
          </p>
        </div>
      </div>
    </footer>
  )
}
