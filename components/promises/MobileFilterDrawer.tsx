"use client"

import React from "react"
import { X, Trash2 } from "lucide-react"
import { Status } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: Status | "all"
  setStatusFilter: (status: Status | "all") => void
  selectedSectors: string[]
  setSelectedSectors: React.Dispatch<React.SetStateAction<string[]>>
  sectors: { id: string; name: string }[]
  sortOption: string
  setSortOption: (option: string) => void
  resultCount: number
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter,
  selectedSectors,
  setSelectedSectors,
  sectors,
  sortOption,
  setSortOption,
  resultCount
}: MobileFilterDrawerProps) {
  
  const toggleSector = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId) 
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    )
  }

  const hasActiveFilters = statusFilter !== "all" || selectedSectors.length > 0

  const handleClearAll = () => {
    setStatusFilter("all")
    setSelectedSectors([])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Dimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 md:hidden"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col md:hidden"
          >
            {/* Drawer Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />

            {/* Header */}
            <div className="px-6 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <div className="flex items-center gap-4">
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors py-2 px-3 hover:bg-red-50 rounded-lg cursor-pointer select-none"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2.5 bg-slate-100 text-slate-500 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Status Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "fulfilled", "in-progress", "evaded", "pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status as Status | "all")}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                        statusFilter === status
                          ? "bg-slate-900 text-white shadow-xs scale-102"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sectors Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Sectors ({sectors.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
                  {sectors.map((sector) => {
                    const isSelected = selectedSectors.includes(sector.id)
                    return (
                      <div
                        key={sector.id}
                        onClick={() => toggleSector(sector.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          isSelected
                            ? "bg-udf-blue/5 border-udf-blue text-udf-blue font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xs leading-tight">{sector.name}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? "bg-udf-blue border-udf-blue text-white scale-110"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sort By Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Sort By
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "newest", label: "Newest First" },
                    { value: "oldest", label: "Oldest First" },
                    { value: "az", label: "Alphabetical" },
                    { value: "status", label: "By Status" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortOption(option.value)}
                      className={`px-3 py-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        sortOption === option.value
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with CTA */}
            <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-slate-100 bg-white rounded-b-3xl shrink-0">
              <button
                onClick={onClose}
                className="w-full py-3 bg-udf-blue hover:bg-udf-blue-dark text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all text-center cursor-pointer select-none"
              >
                {resultCount > 0 ? `Show ${resultCount} Promises` : "No Promises Found"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
