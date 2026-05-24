import { HeroSection } from "@/components/home/HeroSection"
import { ManifestoTicker } from "@/components/home/ManifestoTicker"
import { TrustFramework } from "@/components/home/TrustFramework"
import { BentoStats } from "@/components/home/BentoStats"
import { SpotlightRow } from "@/components/home/SpotlightRow"
import { GovTimeline } from "@/components/home/GovTimeline"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ManifestoTicker />
      <TrustFramework />
      <BentoStats />
      <SpotlightRow />
      <GovTimeline />
    </div>
  )
}
