"use client"

import React, { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import { Session } from "next-auth"
import Image from "next/image"
import { motion } from "framer-motion"
import { Send, AlertCircle, FileText, Link as LinkIcon, CheckCircle2, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Disclaimer } from "@/components/shared/Disclaimer"

function SubmitForm({ session }: { session: Session }) {
  const searchParams = useSearchParams()
  const defaultPromiseId = searchParams.get('promiseId') || ""
  
  const [promiseId, setPromiseId] = useState(defaultPromiseId)
  const [evidenceUrl, setEvidenceUrl] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate network request since there is no backend connected yet
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleResetForm = () => {
    setEvidenceUrl("")
    setDetails("")
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="bg-kerala-green-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
          <CheckCircle2 className="h-10 w-10 text-kerala-green" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Thank you for your contribution!</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Our editorial team will review your submitted evidence. If it is verified and credible, the promise tracker will be updated.
        </p>
        <button 
          onClick={handleResetForm}
          className="bg-udf-blue hover:bg-udf-blue-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Submit Another Update
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Read-only Auth profile badge */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
              unoptimized
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-500 font-bold">{session.user?.name?.charAt(0) || "U"}</span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-slate-900">{session.user?.name}</p>
            <p className="text-xs text-slate-500">{session.user?.email}</p>
          </div>
        </div>
        <button 
          type="button" 
          onClick={() => signOut()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <LogOut className="h-3 w-3" />
          Sign Out
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-400" />
          Promise ID (Optional)
        </label>
        <input 
          type="text" 
          value={promiseId}
          onChange={(e) => setPromiseId(e.target.value)}
          placeholder="e.g. UDF-2026-001"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-udf-blue focus:ring-1 focus:ring-udf-blue outline-none transition-all bg-slate-50 text-slate-900"
        />
        <p className="text-xs text-muted-foreground">If you are submitting evidence for a specific promise, enter its ID.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-slate-400" />
          Evidence URL / Source Link
        </label>
        <input 
          required
          type="url" 
          value={evidenceUrl}
          onChange={(e) => setEvidenceUrl(e.target.value)}
          placeholder="https://news-site.com/article"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-udf-blue focus:ring-1 focus:ring-udf-blue outline-none transition-all bg-white text-slate-900"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-slate-400" />
          Details & Context
        </label>
        <textarea 
          required
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Please describe the update, cabinet decision, or GO number associated with this evidence..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-udf-blue focus:ring-1 focus:ring-udf-blue outline-none transition-all resize-none bg-white text-slate-900"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-udf-blue hover:bg-udf-blue-dark text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Evidence
          </>
        )}
      </button>
    </form>
  )
}

function AuthWrapper() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-5 w-5 animate-spin" /> Checking authentication...
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="text-center py-12">
        <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-display font-bold text-slate-900 mb-2">Sign in Required</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          To maintain the integrity of this tracker and prevent spam, we require users to authenticate with Google before submitting evidence. 
        </p>
        <button 
          onClick={() => signIn("google")}
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-3 mx-auto shadow-sm cursor-pointer"
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
    )
  }

  if (!session) return null
  return <SubmitForm session={session} />
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-4">Submit Evidence</h1>
          <p className="text-lg text-muted-foreground">
            Help keep the tracker accurate. Submit news reports, government orders, or official data.
          </p>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm mb-8 transition-colors duration-300">
          <CardHeader className="pb-4 border-b border-slate-100 mb-6">
            <CardTitle className="text-xl text-slate-900">Correction & Update Form</CardTitle>
            <CardDescription>All submissions are manually verified by our editorial team before publishing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-pulse flex items-center gap-2 text-muted-foreground"><AlertCircle className="h-5 w-5" /> Loading...</div></div>}>
              <AuthWrapper />
            </Suspense>
          </CardContent>
        </Card>
        
        <Disclaimer />
      </div>
    </div>
  )
}
