"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signIn } from "next-auth/react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-udf-blue text-white p-1.5 rounded-md group-hover:bg-udf-blue-dark transition-colors">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground hidden sm:inline-block">
            Vaakiv Paalicho · <span className="text-muted-foreground font-normal">Kerala</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/promises" className="hover:text-foreground transition-colors">Promises</Link>
          <Link href="/sectors" className="hover:text-foreground transition-colors">Sectors</Link>
          <Link href="/updates" className="hover:text-foreground transition-colors">Updates</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/submit">
            <Button variant="ghost" className="hidden sm:flex text-udf-blue hover:text-udf-blue-dark hover:bg-udf-blue-bg">
              Submit Update
            </Button>
          </Link>
          {session ? (
            <div className="flex items-center gap-2 bg-slate-100 rounded-full pr-4 pl-1 py-1 border border-slate-200">
              {session.user?.image ? (
                <img src={session.user.image} alt="Profile" className="h-7 w-7 rounded-full" />
              ) : (
                <div className="h-7 w-7 rounded-full bg-udf-blue text-white flex items-center justify-center text-xs font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">
                {session.user?.name?.split(' ')[0]}
              </span>
            </div>
          ) : (
            <Button onClick={() => signIn("google")} variant="default" className="bg-udf-blue hover:bg-udf-blue-dark text-white rounded-full px-5 shadow-sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
