"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  AlertCircle,
  FileText,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Mail,
  User,
  LogOut,
  RefreshCw,
  Search,
} from "lucide-react"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

interface Submission {
  id: string
  promiseId: string | null
  evidenceUrl: string
  details: string
  status: "pending" | "approved" | "rejected"
  submittedBy: {
    name: string
    email: string
    image: string | null
  }
  createdAt: string
  lastUpdatedBy?: string
  lastUpdatedAt?: string
}

export default function AdminSubmissionsPage() {
  const { data: session, status: authStatus } = useSession()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/submissions")
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403) {
          setError("ACCESS_DENIED")
        } else {
          setError(data.error || "Failed to load submissions.")
        }
        return
      }

      setSubmissions(data.submissions || [])
    } catch (err) {
      console.error("Failed to load submissions:", err)
      setError("An unexpected error occurred while loading submissions.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchSubmissions()
    } else if (authStatus === "unauthenticated") {
      setIsLoading(false)
    }
  }, [authStatus])

  // Update submission status
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected" | "pending") => {
    setIsUpdating(id)
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed to update submission status.")
        return
      }

      // Update state locally
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
      )
    } catch (err) {
      console.error("Failed to update status:", err)
      alert("An unexpected error occurred.")
    } finally {
      setIsUpdating(null)
    }
  }

  // Lookup promise details from promises.json
  const promiseMap = useMemo(() => {
    const map = new Map<string, PromiseType>()
    ;(promisesData as PromiseType[]).forEach((p) => {
      map.set(p.id, p)
    })
    return map
  }, [])

  // Aggregate statistics for metrics grid
  const stats = useMemo(() => {
    let pending = 0
    let approved = 0
    let rejected = 0
    submissions.forEach((sub) => {
      if (sub.status === "pending") pending++
      else if (sub.status === "approved") approved++
      else if (sub.status === "rejected") rejected++
    })
    return { total: submissions.length, pending, approved, rejected }
  }, [submissions])

  // Filtered and searched list
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesFilter = filter === "all" || sub.status === filter
      
      const targetPromise = sub.promiseId ? promiseMap.get(sub.promiseId) : null
      const promiseTitle = targetPromise ? targetPromise.title.toLowerCase() : ""
      const promiseTitleMl = targetPromise ? targetPromise.titleMl.toLowerCase() : ""

      const matchesSearch =
        searchQuery === "" ||
        sub.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.evidenceUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.submittedBy.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.promiseId && sub.promiseId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        promiseTitle.includes(searchQuery.toLowerCase()) ||
        promiseTitleMl.includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [submissions, filter, searchQuery, promiseMap])

  // 1. Loading Authentication or Initial Fetch
  if (authStatus === "loading" || (authStatus === "authenticated" && isLoading && submissions.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw className="h-10 w-10 text-udf-blue animate-spin" />
          <p className="text-slate-500 font-medium text-sm animate-pulse">
            Verifying administrative access and loading database...
          </p>
        </div>
      </div>
    )
  }

  // 2. Unauthenticated Login Screen
  if (authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 shadow-sm max-w-md w-full rounded-2xl p-8 text-center">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Authorized administrative access is required to view and manage citizen evidence submissions. Please log in with your whitelisted Google account.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  // 3. Authenticated but Access Denied (Not whitelisted)
  if (error === "ACCESS_DENIED") {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
        <div className="bg-white border border-red-100 shadow-sm max-w-lg w-full rounded-2xl p-8 text-center">
          <div className="bg-red-50 border border-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            You are logged in as <strong className="text-slate-950 font-semibold">{session?.user?.email}</strong>. 
            This email is not whitelisted in the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 text-xs">ADMIN_EMAILS</code> environment variable.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-left text-xs leading-relaxed text-slate-600">
            <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">To gain access:</span>
            Add your Google email address to the <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">ADMIN_EMAILS</code> list inside the [.env.local](file:///d:/udf-promises-anti/.env.local) file in your workspace, and restart the development server.
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => signOut()}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
            <Link
              href="/"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tracker
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 4. Regular Error Screen
  if (error && error !== "ACCESS_DENIED") {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 shadow-sm max-w-md w-full rounded-2xl p-8 text-center">
          <div className="bg-red-50 text-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="font-bold text-slate-900 text-lg mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button
            onClick={fetchSubmissions}
            className="bg-udf-blue hover:bg-udf-blue-dark text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer text-sm"
          >
            Retry Fetch
          </button>
        </div>
      </div>
    )
  }

  // 5. Success Dashboard UI
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Vaaku Paalicho</p>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded px-1.5 py-0.5">Admin Active</span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">Submissions Control Panel</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              disabled={isLoading}
              className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer disabled:opacity-50"
              title="Reload Submissions"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-1.5 text-xs">
              <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {session?.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full" />
                ) : (
                  <User className="h-3 w-3 text-slate-500" />
                )}
              </div>
              <span className="font-bold text-slate-700 hidden sm:inline">{session?.user?.name}</span>
              <button 
                onClick={() => signOut()}
                className="text-slate-400 hover:text-slate-900 transition-colors ml-1 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic metrics card grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Received", value: stats.total, color: "text-slate-900", bg: "bg-white", border: "border-slate-200" },
            { label: "Pending Review", value: stats.pending, color: "text-amber-600", bg: "bg-amber-50/20", border: "border-amber-100" },
            { label: "Approved Evidence", value: stats.approved, color: "text-emerald-700", bg: "bg-emerald-50/20", border: "border-emerald-100" },
            { label: "Rejected / Spam", value: stats.rejected, color: "text-rose-600", bg: "bg-rose-50/20", border: "border-rose-100" },
          ].map((card, i) => (
            <div key={i} className={`rounded-xl border p-5 ${card.bg} ${card.border} transition-colors`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
              <p className={`text-2xl md:text-3xl font-display font-extrabold ${card.color} tabular-nums`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Filter and Search actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex border-b border-slate-200/80 p-0.5 bg-slate-100 rounded-lg w-fit">
            {[
              { id: "all", label: "All Submissions" },
              { id: "pending", label: "Pending" },
              { id: "approved", label: "Approved" },
              { id: "rejected", label: "Rejected" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search details, emails, promise IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:border-udf-blue focus:ring-1 focus:ring-udf-blue outline-none transition-all bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Submissions list rendering */}
        {isLoading && submissions.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <RefreshCw className="h-8 w-8 text-udf-blue animate-spin" />
            <p className="text-slate-400 text-sm">Synchronizing ledger...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl py-20 px-4 text-center">
            <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">No Submissions Found</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any evidence submissions matching the selected filters or search parameters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredSubmissions.map((sub, idx) => {
                const targetPromise = sub.promiseId ? promiseMap.get(sub.promiseId) : null

                return (
                  <motion.div
                    key={sub.id}
                    layoutId={sub.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30, delay: Math.min(idx * 0.03, 0.3) }}
                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl p-5 md:p-6 transition-all shadow-sm"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      
                      {/* Left Block: Contributor details & Context */}
                      <div className="flex-1 space-y-4">
                        
                        {/* Status + Metadata */}
                        <div className="flex flex-wrap items-center gap-3">
                          
                          {/* Badge Status */}
                          {sub.status === "pending" && (
                            <span className="flex items-center gap-1 text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-100 rounded px-2 py-0.5 uppercase tracking-wide">
                              <Clock className="h-3 w-3" />
                              Pending Review
                            </span>
                          )}
                          {sub.status === "approved" && (
                            <span className="flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-2 py-0.5 uppercase tracking-wide">
                              <CheckCircle className="h-3 w-3" />
                              Approved & Active
                            </span>
                          )}
                          {sub.status === "rejected" && (
                            <span className="flex items-center gap-1 text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-100 rounded px-2 py-0.5 uppercase tracking-wide">
                              <XCircle className="h-3 w-3" />
                              Rejected / Spam
                            </span>
                          )}

                          {/* Created Date */}
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span className="text-slate-300 text-xs hidden sm:inline">•</span>

                          {/* Promise reference mapping */}
                          {targetPromise ? (
                            <Link
                              href={`/promises/${targetPromise.slug}`}
                              className="group flex items-center gap-1.5 text-xs text-udf-blue font-semibold hover:underline"
                            >
                              <FileText className="h-3.5 w-3.5 text-slate-400 group-hover:text-udf-blue transition-colors" />
                              <span>{targetPromise.id}: {targetPromise.title}</span>
                            </Link>
                          ) : sub.promiseId ? (
                            <span className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">
                              ID: {sub.promiseId} (Not matched)
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 italic">
                              General update suggestion
                            </span>
                          )}

                        </div>

                        {/* Evidence description / context */}
                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 transition-colors">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Context & details</p>
                          <p className="text-sm text-slate-700 leading-relaxed font-ui whitespace-pre-wrap">{sub.details}</p>
                        </div>

                        {/* Clickable External Evidence URL */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Source link:</span>
                          <a
                            href={sub.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-udf-blue hover:underline flex items-center gap-1 max-w-sm sm:max-w-xl truncate group"
                          >
                            <span className="truncate">{sub.evidenceUrl}</span>
                            <ExternalLink className="h-3 w-3 shrink-0 text-slate-400 group-hover:text-udf-blue transition-colors" />
                          </a>
                        </div>

                      </div>

                      {/* Right Block: Action Buttons + Contributor Profile */}
                      <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-stretch sm:items-center lg:items-end gap-5 lg:self-stretch min-w-[220px] shrink-0 border-t sm:border-t-0 lg:border-t-0 pt-4 sm:pt-0 border-slate-100">
                        
                        {/* Contributor Profile */}
                        <div className="flex items-center gap-3 lg:text-right">
                          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center flex-shrink-0">
                            {sub.submittedBy.image ? (
                              <img src={sub.submittedBy.image} alt={sub.submittedBy.name} className="w-full h-full" />
                            ) : (
                              <User className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-tight">{sub.submittedBy.name}</p>
                            <a
                              href={`mailto:${sub.submittedBy.email}`}
                              className="text-[10px] text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 lg:justify-end"
                            >
                              <Mail className="h-2.5 w-2.5" />
                              {sub.submittedBy.email}
                            </a>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 w-full sm:w-auto lg:w-full mt-auto">
                          
                          {/* Approve/Active switch */}
                          {sub.status !== "approved" ? (
                            <button
                              onClick={() => handleUpdateStatus(sub.id, "approved")}
                              disabled={isUpdating === sub.id}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(sub.id, "pending")}
                              disabled={isUpdating === sub.id}
                              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Clock className="h-3.5 w-3.5" />
                              Mark Pending
                            </button>
                          )}

                          {/* Reject switch */}
                          {sub.status !== "rejected" ? (
                            <button
                              onClick={() => handleUpdateStatus(sub.id, "rejected")}
                              disabled={isUpdating === sub.id}
                              className="flex-1 bg-white border border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60 text-red-600 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Reject
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(sub.id, "pending")}
                              disabled={isUpdating === sub.id}
                              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Clock className="h-3.5 w-3.5" />
                              Mark Pending
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  )
}
