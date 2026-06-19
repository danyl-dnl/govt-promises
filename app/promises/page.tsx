"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { FilterSidebar } from "@/components/promises/FilterSidebar"
import { MobileFilterDrawer } from "@/components/promises/MobileFilterDrawer"
import { HorizontalCard } from "@/components/promises/HorizontalCard"
import { EmptyState } from "@/components/promises/EmptyState"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType, Status } from "@/types"
import { Search, SlidersHorizontal, X } from "lucide-react"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
}

// Extract unique sectors from data
const uniqueSectors = Array.from(new Set(promisesData.map((p) => p.sector.id))).map((id) => {
  return promisesData.find((p) => p.sector.id === id)!.sector
})

function PromisesPageContent() {
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("newest")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const activeFilterCount = (statusFilter !== "all" ? 1 : 0) + selectedSectors.length

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileDrawerOpen])

  // Sync state with URL search parameters on mount and when they change
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const sectorParam = searchParams.get("sector")
    const statusParam = searchParams.get("status")
    const searchParam = searchParams.get("q") || searchParams.get("search")
    const sortParam = searchParams.get("sort")

    if (sectorParam) {
      const sectorsList = sectorParam.split(",")
      setSelectedSectors(sectorsList)
    } else {
      setSelectedSectors([])
    }
    
    if (statusParam && ["fulfilled", "in-progress", "evaded", "pending", "all"].includes(statusParam)) {
      setStatusFilter(statusParam as Status | "all")
    } else {
      setStatusFilter("all")
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    } else {
      setSearchQuery("")
    }

    if (sortParam && ["newest", "oldest", "az", "status"].includes(sortParam)) {
      setSortOption(sortParam)
    } else {
      setSortOption("newest")
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [searchParams])

  const filteredPromises = useMemo(() => {
    return (promisesData as PromiseType[])
      .filter((promise) => {
        // Search filter
        const matchesSearch = 
          promise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          promise.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Status filter
        const matchesStatus = statusFilter === "all" || promise.status === statusFilter
        
        // Sector filter
        const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(promise.sector.id)
        
        return matchesSearch && matchesStatus && matchesSector
      })
      .sort((a, b) => {
        // Sort logic
        if (sortOption === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        } else if (sortOption === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        } else if (sortOption === "az") {
          return a.title.localeCompare(b.title)
        } else if (sortOption === "status") {
          const statusOrder = { fulfilled: 1, "in-progress": 2, evaded: 3, pending: 4 }
          return statusOrder[a.status] - statusOrder[b.status]
        }
        return 0
      })
  }, [searchQuery, statusFilter, selectedSectors, sortOption])

  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20 transition-colors duration-300">
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedSectors={selectedSectors}
        setSelectedSectors={setSelectedSectors}
        sectors={uniqueSectors}
        sortOption={sortOption}
        setSortOption={setSortOption}
        resultCount={filteredPromises.length}
      />
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">All Promises</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse, filter, and search through the complete ledger of UDF election promises. 
            Currently tracking {promisesData.length} commitments.
          </p>
        </div>

        {/* Mobile Toolbar */}
        <div className="w-full md:hidden space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search promises..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-udf-blue transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              <span>Filter & Sort</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center bg-udf-blue text-white text-[10px] font-bold h-5 px-1.5 rounded-full min-w-5">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-medium">Active:</span>
              {statusFilter !== "all" && (
                <span className="px-2.5 py-1 bg-udf-blue/10 text-udf-blue text-xs font-semibold rounded-lg flex items-center gap-1">
                  {statusFilter.replace("-", " ")}
                  <X className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setStatusFilter("all")} />
                </span>
              )}
              {selectedSectors.map(sectorId => {
                const sName = uniqueSectors.find(s => s.id === sectorId)?.name
                return (
                  <span key={sectorId} className="px-2.5 py-1 bg-udf-blue/10 text-udf-blue text-xs font-semibold rounded-lg flex items-center gap-1">
                    {sName}
                    <X className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => {
                      setSelectedSectors(prev => prev.filter(id => id !== sectorId))
                    }} />
                  </span>
                )
              })}
              <button 
                onClick={() => { setStatusFilter("all"); setSelectedSectors([]) }}
                className="text-xs text-slate-500 hover:text-slate-800 underline ml-auto transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <FilterSidebar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                selectedSectors={selectedSectors}
                setSelectedSectors={setSelectedSectors}
                sectors={uniqueSectors}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="mb-2 text-sm text-slate-500 font-medium">
              Showing {filteredPromises.length} result{filteredPromises.length !== 1 ? 's' : ''}
            </div>
            
            {filteredPromises.length > 0 ? (
              <motion.div
                key={`${searchQuery}-${statusFilter}-${selectedSectors.join(",")}-${sortOption}`} // Drive full re-animation on updates
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-4"
              >
                {filteredPromises.map((promise) => (
                  <HorizontalCard key={promise.id} promise={promise} />
                ))}
              </motion.div>
            ) : (
              <EmptyState onClearFilters={() => { setSearchQuery(""); setStatusFilter("all"); setSelectedSectors([]) }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PromisesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center transition-colors duration-300">
        <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
          Loading promises...
        </div>
      </div>
    }>
      <PromisesPageContent />
    </Suspense>
  )
}
