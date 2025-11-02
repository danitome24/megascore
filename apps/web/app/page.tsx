import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { NetworkStatsSection } from "@/components/home/network-stats-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <NetworkStatsSection />
      <CTASection />
    </>
  );
}
