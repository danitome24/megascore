import { Header } from "@/components/about/header";
import { KeyFeatures } from "@/components/about/key-features";
import { TechnicalDetails } from "@/components/about/technical-details";
import { WhatIsMegaScore } from "@/components/about/what-is-megascore";
import { WhyMegaScoreMatters } from "@/components/about/why-megascore-matters";
import { PageContainer } from "@/components/layout/page-container";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
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
