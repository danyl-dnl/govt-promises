"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <div className="h-[120px] w-[120px] flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={54}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "6px",
              border: "1px solid var(--color-border, #e2e8f0)",
              backgroundColor: "var(--color-card, #ffffff)",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "6px 10px",
            }}
            itemStyle={{ color: "var(--color-foreground, #334155)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
