import { HeroSection } from "@/components/home/HeroSection"
import { ManifestoTicker } from "@/components/home/ManifestoTicker"
import { TrustFramework } from "@/components/home/TrustFramework"
import { BentoStats } from "@/components/home/BentoStats"
import { BenefitCalculator } from "@/components/home/BenefitCalculator"
import { SpotlightRow } from "@/components/home/SpotlightRow"
import { GovTimeline } from "@/components/home/GovTimeline"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ManifestoTicker />
      <TrustFramework />
      <BentoStats />
      <BenefitCalculator />
      <SpotlightRow />
      <GovTimeline />
    </div>
  )
}
