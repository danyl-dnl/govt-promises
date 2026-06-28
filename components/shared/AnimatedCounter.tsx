"use client"

import { useSpring, useTransform, motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10px" })
  const spring = useSpring(0, { duration: 1800, bounce: 0 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  return <motion.span ref={ref} className="inline-block">{display}</motion.span>
}
