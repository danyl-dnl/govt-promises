"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { FilterSidebar } from "@/components/promises/FilterSidebar"
import { HorizontalCard } from "@/components/promises/HorizontalCard"
import { EmptyState } from "@/components/promises/EmptyState"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType, Status } from "@/types"

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
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">All Promises</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse, filter, and search through the complete ledger of UDF election promises. 
            Currently tracking {promisesData.length} commitments.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
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

          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="mb-2 text-sm text-slate-500 font-medium">
              Showing {filteredPromises.length} result{filteredPromises.length !== 1 ? 's' : ''}
            </div>
            
            {filteredPromises.length > 0 ? (
              filteredPromises.map((promise) => (
                <HorizontalCard key={promise.id} promise={promise} />
              ))
            ) : (
              <EmptyState />
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
