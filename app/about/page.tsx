import { PageContainer } from "@/components/layout/page-container";
import { WhatIsMegaScore } from "@/components/about/what-is-megascore";
import { KeyFeatures } from "@/components/about/key-features";
import { WhyMegaScoreMatters } from "@/components/about/why-megascore-matters";
import { TechnicalDetails } from "@/components/about/technical-details";
import { Header } from "@/components/about/header";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Header />
          <WhatIsMegaScore />
          <KeyFeatures />
          <WhyMegaScoreMatters />
          <TechnicalDetails />
        </div>
      </div>
    </PageContainer>
  );
}
