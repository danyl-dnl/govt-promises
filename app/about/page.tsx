import React from "react"
import { ShieldCheck, BookOpen, AlertCircle } from "lucide-react"
import { Disclaimer } from "@/components/shared/Disclaimer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">About the Tracker</h1>
          <p className="text-muted-foreground text-lg">
            Understanding our mission, methodology, and the standards we uphold to ensure transparency.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-udf-blue-bg p-3 rounded-xl text-udf-blue">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-slate-900">Our Mission</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Vaaku Paalicho is an independent, citizen-driven initiative designed to track the election promises made by the United Democratic Front (UDF) in Kerala. Our goal is to foster civic engagement and hold elected representatives accountable to their manifesto commitments.
              </p>
              <p>
                We believe that democracy functions best when citizens have access to clear, unbiased, and verifiable information regarding the performance of their government.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-kerala-green-light p-3 rounded-xl text-kerala-green">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-slate-900">Methodology & Sources</h2>
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Every promise tracked on this platform is sourced directly from the official UDF 2026 Election Manifesto. The status of each promise is updated based exclusively on publicly verifiable evidence.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-6">
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Evidence Tiers</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="font-bold text-kerala-green w-16 shrink-0">Tier 1</span>
                    <span><strong>Official Gazette & GOs:</strong> Government Orders, Gazette notifications, and passed legislative bills. (Highest Reliability)</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-udf-blue w-16 shrink-0">Tier 2</span>
                    <span><strong>Govt Press Releases:</strong> Official statements from the Chief Minister's Office (CMO) or departmental press releases.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-slate-500 w-16 shrink-0">Tier 3</span>
                    <span><strong>National Wire & News:</strong> Reports from recognized, credible journalism platforms and wire agencies (PTI, UNI).</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-500">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-slate-900">FAQ</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Is this website affiliated with the government?</h3>
                <p className="text-slate-600">No. Vaaku Paalicho is strictly an independent, non-partisan citizen initiative. We are not affiliated with the Election Commission of India, the Government of Kerala, or the UDF.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">How can I suggest a correction?</h3>
                <p className="text-slate-600">If you find inaccurate information or have new evidence regarding a promise, please use our <a href="/submit" className="text-udf-blue hover:underline">Submit Update</a> form. All submissions require verifiable Tier 1-3 links to be considered.</p>
              </div>
            </div>
          </section>
          
          <div className="pt-8">
            <Disclaimer className="mx-0 text-left" />
          </div>
        </div>
      </div>
    </div>
  )
}
