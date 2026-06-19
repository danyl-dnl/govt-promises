import React from "react"
import { notFound } from "next/navigation"
import { DetailHeader } from "@/components/promise/DetailHeader"
import { EvidenceTimeline } from "@/components/promise/EvidenceTimeline"
import { Disclaimer } from "@/components/shared/Disclaimer"
import { HorizontalCard } from "@/components/promises/HorizontalCard"
import { StickyDetailTOC } from "@/components/promise/StickyDetailTOC"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

interface PromiseDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return promisesData.map((promise) => ({
    slug: promise.slug,
  }))
}

export default async function PromiseDetailPage({ params }: PromiseDetailPageProps) {
  const { slug } = await params
  const promise = (promisesData as PromiseType[]).find((p) => p.slug === slug)

  if (!promise) {
    notFound()
  }

  // Find related promises in the same sector (excluding the current one)
  const relatedPromises = (promisesData as PromiseType[])
    .filter((p) => p.sector.id === promise.sector.id && p.id !== promise.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div id="commitment">
        <DetailHeader promise={promise} />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - TOC */}
        <div className="hidden lg:block lg:col-span-2">
          <StickyDetailTOC />
        </div>

        {/* Middle Column - Content */}
        <div className="lg:col-span-7">
          <div id="evidence-trail" className="mb-10 scroll-mt-24">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-6">Evidence & Timeline</h2>
            <EvidenceTimeline sources={promise.sources} promiseId={promise.id} />
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-200">
            <Disclaimer className="text-left mx-0" />
            <div className="mt-6">
              <a href={`/submit?promiseId=${promise.id}`} className="text-sm font-semibold text-udf-blue hover:text-udf-blue-dark transition-colors">
                Submit a correction or update for this promise →
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - Related Promises */}
        <div className="lg:col-span-3">
          {relatedPromises.length > 0 && (
            <div id="related-promises" className="sticky top-24 scroll-mt-24">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs font-semibold">Related Promises</h3>
              <div className="flex flex-col gap-4">
                {relatedPromises.map((relatedPromise) => (
                  <HorizontalCard key={relatedPromise.id} promise={relatedPromise} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
