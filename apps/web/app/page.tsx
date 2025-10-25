"use client";

import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { NetworkStatsSection } from "@/components/home/network-stats-section";
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
