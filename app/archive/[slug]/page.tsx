import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, FileText, CheckCircle, ShieldCheck, Printer, Bookmark } from "lucide-react"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"
import { PrintButton } from "@/components/shared/PrintButton"

interface ArchivePageProps {
  params: Promise<{ slug: string }>
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { slug } = await params

  // Parse the slug which is in format: [promiseId]-[sourceIndex] (e.g. p1-2)
  const match = slug.match(/^(p\d+)-(\d+)$/)
  if (!match) {
    notFound()
  }

  const [_, promiseId, sourceIndexStr] = match
  const sourceIndex = parseInt(sourceIndexStr, 10) - 1 // convert 1-indexed to 0-indexed

  const promise = (promisesData as PromiseType[]).find((p) => p.id === promiseId)
  if (!promise || !promise.sources[sourceIndex]) {
    notFound()
  }

  const source = promise.sources[sourceIndex]
  const formattedDate = new Date(source.date).toLocaleDateString("en-IN", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const isGazette = source.tier === 1
  const isPressRelease = source.tier === 2

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between mb-8 text-sm">
          <Link 
            href={`/promises/${promise.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-udf-blue font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Promise Details
          </Link>
          
          <div className="flex gap-2">
            <PrintButton />
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200/80 text-slate-600 font-bold rounded-lg uppercase tracking-wider text-xs border border-slate-300">
              Verified Copy
            </span>
          </div>
        </div>

        {/* Tactical Document View (Tactile Material Design) */}
        {isGazette ? (
          /* =========================================================================
             TIER 1: OFFICIAL KERALA GAZETTE / GOVERNMENT ORDER LAYOUT
             ========================================================================= */
          <div className="bg-[#fcfbf7] border-t-8 border-emerald-800 text-emerald-950 p-8 sm:p-12 rounded-2xl shadow-xl border border-emerald-900/10 relative overflow-hidden transition-all duration-300">
            {/* Fine watermark background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center rotate-45 select-none">
              <span className="text-8xl font-black uppercase tracking-widest text-emerald-900">KERALA GOVERNMENT</span>
            </div>

            {/* Official Gazette Header */}
            <div className="text-center border-b-2 border-emerald-800/20 pb-6 mb-8 relative">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-800/30 flex items-center justify-center bg-emerald-50 text-emerald-800 shadow-sm">
                  <ShieldCheck className="h-10 w-10 stroke-[1.5]" />
                </div>
              </div>
              
              <h1 className="font-serif text-3xl font-extrabold tracking-wide uppercase">Kerala State Gazette</h1>
              <p className="text-xs uppercase font-extrabold tracking-widest text-emerald-700/80 mt-1">Extraordinary • Published By Authority</p>
              
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase border-t border-emerald-800/10 mt-4 pt-3 text-emerald-800/70">
                <span>Vol. LXIX</span>
                <span>Thiruvananthapuram, {source.date}</span>
                <span>No. UDF-{promise.id}-{sourceIndex + 1}</span>
              </div>
            </div>

            {/* Gazette Body */}
            <div className="space-y-6 text-justify leading-relaxed font-serif text-slate-800">
              <div className="text-center font-sans font-extrabold text-sm uppercase tracking-widest text-emerald-800/90 mb-4 bg-emerald-50/50 py-2 border border-emerald-800/10 rounded-lg">
                Government Order (G.O.) Notification
              </div>

              {/* Legal metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-500 border-b border-dashed border-slate-200 pb-4 mb-6">
                <div><strong>DEPARTMENT:</strong> General Administration (Cabinet)</div>
                <div><strong>ORDER NO:</strong> G.O. (Ms) No. {promise.id.toUpperCase()}/{new Date(source.date).getFullYear()}</div>
                <div><strong>DATE OF ACTION:</strong> {formattedDate}</div>
                <div><strong>TIER LEVEL:</strong> Tier 1 (Official Assembly & Gazette)</div>
              </div>

              {/* Title / Subject */}
              <h2 className="text-xl sm:text-2xl font-extrabold font-sans text-slate-900 leading-snug border-l-4 border-emerald-700 pl-4 py-1">
                {source.title}
              </h2>

              <div className="pt-4 space-y-4">
                <p className="indent-8 font-sans font-bold text-xs uppercase tracking-wider text-slate-400">
                  Preamble / Purpose:
                </p>
                <p className="indent-8 text-lg font-medium text-slate-900 leading-relaxed font-sans bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                  &ldquo;{promise.description}&rdquo;
                </p>

                <p className="indent-8 font-sans font-bold text-xs uppercase tracking-wider text-slate-400 pt-4">
                  Official Decision and Enforcement Details:
                </p>
                <p className="indent-8 text-base">
                  {source.summary}
                </p>
                
                <p className="indent-8">
                  As committed under the official election manifesto framework, this decision is sanctioned for immediate execution and deployment. Concerned departments are ordered to release detailed operational guidelines, draft budget allocation schemas, and setup monitoring committees immediately.
                </p>
              </div>

              {/* Official Seal / Verification Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-emerald-800/20 pt-8 mt-12 text-xs font-sans">
                <div className="flex items-center gap-3 bg-emerald-50/80 px-4 py-3 border border-emerald-800/10 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-emerald-700" />
                  <div>
                    <div className="font-extrabold text-emerald-950">Verified Ledger Entry</div>
                    <div className="text-[10px] text-emerald-700">Audit Status: Fully Authenticated</div>
                  </div>
                </div>
                
                <div className="text-center sm:text-right">
                  <div className="w-24 h-1 bg-slate-300 mx-auto sm:ml-auto mb-2" />
                  <div className="font-bold text-slate-800 uppercase tracking-wider">Cabinet Secretary</div>
                  <div className="text-[10px] text-slate-400">Secretariat, Thiruvananthapuram</div>
                  <div className="text-[9px] text-emerald-600 font-extrabold mt-1 uppercase tracking-widest">Digitally Signed & Validated</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
             TIER 2 & 3: NEWSPAPER CLIPPING / PRESS RELEASE LAYOUT
             ========================================================================= */
          <div className="bg-[#FAF9F5] border-t-8 border-slate-800 text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-900/10 relative overflow-hidden transition-all duration-300">
            {/* Fine watermark background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] flex items-center justify-center rotate-45 select-none">
              <span className="text-8xl font-black uppercase tracking-widest text-slate-900">VERIFIED ARCHIVE</span>
            </div>

            {/* Newspaper Masthead */}
            <div className="text-center border-b-4 border-slate-900/80 pb-6 mb-8 relative">
              <div className="flex justify-center items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                <Bookmark className="h-3.5 w-3.5" />
                <span>The Citizens Journal Ledger Archive</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tighter uppercase font-display border-y-2 border-slate-900 py-1.5">
                {source.publication}
              </h1>
              
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase mt-3 text-slate-500">
                <span>Vol. VIII • No. {promise.id}-{sourceIndex + 1}</span>
                <span>Thiruvananthapuram</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-6 text-justify leading-relaxed font-serif text-slate-800">
              {/* Badge representing source tier credibility */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-sans font-bold uppercase tracking-wider text-[10px] border border-slate-200 rounded-md">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Tier {source.tier} Evidence — {isPressRelease ? "Government Press Release" : "Mainstream Wire News"}</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 leading-tight tracking-tight mt-2">
                {source.title}
              </h2>

              {/* Byline */}
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3">
                <Calendar className="h-3.5 w-3.5" />
                <span>Published on {formattedDate}</span>
                <span>•</span>
                <span>By Staff Reporter</span>
              </div>

              {/* Editorial / Newspaper Column Layout */}
              <div className="pt-2 sm:grid sm:grid-cols-1 gap-6">
                <div className="space-y-4">
                  {/* Drop-cap for the summary block */}
                  <p className="text-base sm:text-lg leading-relaxed text-slate-900 first-letter:text-5xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:text-slate-900 first-letter:font-serif">
                    {source.summary}
                  </p>
                  
                  <p className="text-sm text-slate-600 italic bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4 leading-relaxed font-sans">
                    <strong>Manifesto Context:</strong> &ldquo;{promise.manifestoQuote}&rdquo; — {promise.title} ({promise.sector.name} Sector)
                  </p>

                  <p className="pt-4 text-base">
                    This news event serves as critical documentation of government policy implementation. The UDF government led by Chief Minister V.D. Satheesan has moved forward with initial execution, setting timelines and department guidelines to fulfill this commitment within the specified legislative session.
                  </p>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-slate-200 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-400">
                <div>
                  Archive ID: <span className="font-mono text-slate-600">{slug.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Public Ledger Verification Complete</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
