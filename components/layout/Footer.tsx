import React from "react"
import Link from "next/link"
import { Landmark } from "lucide-react"
import { Disclaimer } from "@/components/shared/Disclaimer"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Landmark className="h-6 w-6 text-muted-foreground" />
            <span className="font-display font-semibold text-lg text-foreground">
              Vaaku Paalicho
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About Project</Link>
            <Link href="/about#methodology" className="hover:text-foreground transition-colors">Methodology</Link>
            <Link href="/submit" className="hover:text-foreground transition-colors">Submit Update</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col items-center gap-4">
          <Disclaimer />
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Vaaku Paalicho Kerala. Open source initiative.
          </p>
        </div>
      </div>
    </footer>
  )
}
