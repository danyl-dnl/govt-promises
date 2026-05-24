"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Status } from "@/types"

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
      {/* Active Filters Clear Row */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Active Filters</span>
          <button
            onClick={handleClearAll}
            className="text-xs font-bold text-udf-blue hover:text-udf-blue-dark transition-colors cursor-pointer"
          >
            Clear All
          </button>
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
        <div className="flex flex-wrap gap-2">
          {["all", "fulfilled", "in-progress", "evaded", "pending"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as Status | "all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors cursor-pointer ${ statusFilter === status ? "bg-slate-800 text-white " : "bg-slate-100 text-slate-600 hover:bg-slate-200 " }`}
            >
              {status.replace("-", " ")}
            </button>
          ))}
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
