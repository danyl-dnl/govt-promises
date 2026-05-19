"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { SectorBar } from "@/components/shared/SectorBar"
import { 
  Users, 
  HeartPulse, 
  ShieldCheck, 
  Building, 
  Sprout, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  Scale, 
  Landmark, 
  HardHat,
  ArrowRight 
} from "lucide-react"
import promisesData from "@/data/promises.json"
import { Promise as PromiseType } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  "users": <Users className="h-6 w-6" />,
  "heart-pulse": <HeartPulse className="h-6 w-6" />,
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  "building": <Building className="h-6 w-6" />,
  "sprout": <Sprout className="h-6 w-6" />,
  "briefcase": <Briefcase className="h-6 w-6" />,
  "book-open": <BookOpen className="h-6 w-6" />,
  "graduation-cap": <GraduationCap className="h-6 w-6" />,
  "dollar-sign": <DollarSign className="h-6 w-6" />,
  "scale": <Scale className="h-6 w-6" />,
  "landmark": <Landmark className="h-6 w-6" />,
  "hardhat": <HardHat className="h-6 w-6" />,
}

export default function SectorsPage() {
  const sectorStats = useMemo(() => {
    const stats: Record<string, any> = {}
    
    ;(promisesData as PromiseType[]).forEach(promise => {
      const sectorId = promise.sector.id
      if (!stats[sectorId]) {
        stats[sectorId] = {
          ...promise.sector,
          total: 0,
          fulfilled: 0,
          inProgress: 0,
          evaded: 0,
          pending: 0,
        }
      }
      
      stats[sectorId].total++
      if (promise.status === "fulfilled") stats[sectorId].fulfilled++
      else if (promise.status === "in-progress") stats[sectorId].inProgress++
      else if (promise.status === "evaded") stats[sectorId].evaded++
      else stats[sectorId].pending++
    })
    
    return Object.values(stats).map(sector => ({
      ...sector,
      completionPercent: sector.total > 0 ? Math.round(((sector.fulfilled + (sector.inProgress * 0.5)) / sector.total) * 100) : 0
    })).sort((a, b) => b.completionPercent - a.completionPercent)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">Sector Analysis</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive breakdown of UDF promises across various governmental sectors, tracking progress and completion rates.
          </p>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Overall Completion by Sector</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sectorStats}
                margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Completion Score']}
                />
                <Bar dataKey="completionPercent" radius={[4, 4, 0, 0]}>
                  {sectorStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Cards Grid */}
        <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Detailed Sectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorStats.map(sector => (
            <Link key={sector.id} href={`/promises?sector=${sector.id}`}>
              <Card className="h-full bg-white border-slate-200 hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col">
                <div 
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{ backgroundColor: sector.color }}
                />
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="p-3 rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: sector.color }}
                    >
                      {iconMap[sector.icon] || <ShieldCheck className="h-6 w-6" />}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Completion</span>
                      <p className="font-display font-bold text-2xl text-slate-900">{sector.completionPercent}%</p>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-udf-blue transition-colors">
                    {sector.name}
                  </h3>
                  <p className="font-malayalam text-sm text-slate-500 mb-6">
                    {sector.nameMl}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                      <span>Progress</span>
                      <span>{sector.fulfilled} / {sector.total} Fulfilled</span>
                    </div>
                    <SectorBar percentage={sector.completionPercent} color={sector.color} />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-udf-blue transition-colors">
                    <span>View all {sector.total} promises</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
