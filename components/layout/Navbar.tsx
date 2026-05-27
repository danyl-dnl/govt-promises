"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Landmark, Menu, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const isAdmin = session?.user?.email?.toLowerCase() === "danyldt07@gmail.com"

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
        scrolled || isOpen
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <div className="bg-udf-blue text-white p-1.5 rounded-md group-hover:bg-udf-blue-dark transition-colors">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground sm:hidden">
            Vaaku Paalicho
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-foreground hidden sm:inline-block">
            Vaaku Paalicho · <span className="text-muted-foreground font-normal">Kerala</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/promises" className="hover:text-foreground transition-colors">Promises</Link>
          <Link href="/sectors" className="hover:text-foreground transition-colors">Sectors</Link>
          <Link href="/updates" className="hover:text-foreground transition-colors">Updates</Link>
          <Link href="/impact" className="hover:text-foreground transition-colors">Impact</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          {isAdmin && (
            <Link 
              href="/admin/submissions" 
              className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 transition-all border border-amber-200/50 bg-amber-50/40 rounded-full px-3 py-1 hover:bg-amber-50 hover:border-amber-300"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">

          <Link href="/submit">
            <Button variant="ghost" className="hidden sm:flex text-udf-blue hover:text-udf-blue-dark hover:bg-udf-blue-bg">
              Submit Update
            </Button>
          </Link>

          {session ? (
            <div className="flex items-center gap-2 sm:bg-slate-100 rounded-full sm:pr-4 sm:pl-1 sm:py-1 sm:border sm:border-slate-200">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border border-slate-200 sm:border-none shadow-sm sm:shadow-none"
                  unoptimized
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-udf-blue text-white flex items-center justify-center text-xs font-bold border border-slate-200 sm:border-none shadow-sm sm:shadow-none">
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

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-1.5 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-border shadow-lg overflow-hidden w-full absolute top-16 left-0 z-40"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-base font-semibold text-slate-700">
              <Link 
                href="/promises" 
                onClick={() => setIsOpen(false)}
                className="hover:text-udf-blue py-2 border-b border-slate-100 transition-colors"
              >
                Promises
              </Link>
              <Link 
                href="/sectors" 
                onClick={() => setIsOpen(false)}
                className="hover:text-udf-blue py-2 border-b border-slate-100 transition-colors"
              >
                Sectors
              </Link>
              <Link 
                href="/updates" 
                onClick={() => setIsOpen(false)}
                className="hover:text-udf-blue py-2 border-b border-slate-100 transition-colors"
              >
                Updates
              </Link>
              <Link 
                href="/impact" 
                onClick={() => setIsOpen(false)}
                className="hover:text-udf-blue py-2 border-b border-slate-100 transition-colors"
              >
                Impact
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className="hover:text-udf-blue py-2 border-b border-slate-100 transition-colors"
              >
                About
              </Link>
              
              {isAdmin && (
                <Link 
                  href="/admin/submissions" 
                  onClick={() => setIsOpen(false)}
                  className="text-amber-600 hover:text-amber-700 py-2 border-b border-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              
              <Link 
                href="/submit" 
                onClick={() => setIsOpen(false)}
                className="mt-2 w-full"
              >
                <Button className="w-full bg-udf-blue hover:bg-udf-blue-dark text-white rounded-lg py-2.5 shadow-sm">
                  Submit Update
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

