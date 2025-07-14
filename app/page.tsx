"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { NetworkStatsSection } from "@/components/home/network-stats-section";
import { CTASection } from "@/components/home/cta-section";
import { PageContainer } from "@/components/layout/page-container";

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection />
      <FeaturesSection />
      <NetworkStatsSection />
      <CTASection />
    </PageContainer>
  );
}
