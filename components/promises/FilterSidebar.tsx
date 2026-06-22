"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Status, Promise as PromiseType } from "@/types"
import { motion } from "framer-motion"
import promisesData from "@/data/promises.json"

interface FilterSidebarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: Status | "all"
  setStatusFilter: (status: Status | "all") => void
  selectedSectors: string[]
  setSelectedSectors: React.Dispatch<React.SetStateAction<string[]>>
  sectors: { id: string; name: string }[]
  sortOption: string
  setSortOption: (option: string) => void
}

export function FilterSidebar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  selectedSectors,
  setSelectedSectors,
  sectors,
  sortOption,
  setSortOption
}: FilterSidebarProps) {
  const statusCounts = React.useMemo(() => {
    const counts = { all: promisesData.length, fulfilled: 0, "in-progress": 0, evaded: 0, pending: 0 }
    ;(promisesData as PromiseType[]).forEach((p) => {
      if (p.status in counts) {
        counts[p.status as keyof typeof counts]++
      }
    })
    return counts
  }, [])
  
  const toggleSector = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId) 
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    )
  }

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || selectedSectors.length > 0

  const handleClearAll = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setSelectedSectors([])
  }

  return (
    <div className="w-full md:w-64 shrink-0 space-y-8">
      {/* Active Filters Clear Row & Pills */}
      {hasActiveFilters && (
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Active Filters</span>
            <button
              onClick={handleClearAll}
              className="text-xs font-bold text-udf-blue hover:text-udf-blue-dark transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            {searchQuery !== "" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-white shadow-sm">
                &quot;{searchQuery.slice(0, 10)}{searchQuery.length > 10 ? '...' : ''}&quot;
                <X 
                  className="h-3 w-3 ml-0.5 cursor-pointer text-slate-400 hover:text-white transition-colors" 
                  onClick={() => setSearchQuery("")} 
                />
              </span>
            )}
            
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-white shadow-sm capitalize">
                {statusFilter.replace("-", " ")}
                <X 
                  className="h-3 w-3 ml-0.5 cursor-pointer text-slate-400 hover:text-white transition-colors" 
                  onClick={() => setStatusFilter("all")} 
                />
              </span>
            )}
            
            {selectedSectors.map((sectorId) => {
              const sectorName = sectors.find(s => s.id === sectorId)?.name
              return (
                <span 
                  key={sectorId} 
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-udf-blue-bg text-udf-blue border border-udf-blue/20 shadow-sm"
                >
                  {sectorName}
                  <X 
                    className="h-3 w-3 ml-0.5 cursor-pointer text-udf-blue/60 hover:text-udf-blue transition-colors" 
                    onClick={() => toggleSector(sectorId)} 
                  />
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-slate-200 text-slate-800 focus-visible:ring-udf-blue transition-colors"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Status</h3>
        <div className="flex flex-col gap-1 w-full bg-slate-100/50 p-1 rounded-2xl border border-slate-200/40">
          {["all", "fulfilled", "in-progress", "evaded", "pending"].map((status) => {
            const isActive = statusFilter === status
            const count = statusCounts[status as keyof typeof statusCounts]
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status as Status | "all")}
                className="relative flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 cursor-pointer select-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarStatus"
                    className="absolute inset-0 bg-slate-900 rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={`z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-slate-600 hover:text-slate-900"}`}>
                  {status.replace("-", " ")}
                </span>
                <span className={`z-10 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-200 ${isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sector Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Sector</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {sectors.map((sector) => (
            <div 
              key={sector.id} 
              onClick={() => toggleSector(sector.id)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault()
                  toggleSector(sector.id)
                }
              }}
              role="checkbox"
              aria-checked={selectedSectors.includes(sector.id)}
              tabIndex={0}
              className="flex items-center gap-3 cursor-pointer group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-udf-blue focus-visible:ring-offset-2 rounded px-1 -mx-1"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${ selectedSectors.includes(sector.id) ? "bg-udf-blue border-udf-blue text-white" : "border-slate-300 bg-white group-hover:border-udf-blue " }`}>
                {selectedSectors.includes(sector.id) && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {sector.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Sort By</h3>
        <select 
          className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-udf-blue focus:border-transparent transition-all duration-300"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A-Z</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  )
}
