import { Header } from "@/components/about/header";
import { KeyFeatures } from "@/components/about/key-features";
import { WhatIsMegaScore } from "@/components/about/what-is-megascore";
import { WhyMegaScoreMatters } from "@/components/about/why-megascore-matters";

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Header />
          <WhatIsMegaScore />
          <KeyFeatures />
          <WhyMegaScoreMatters />
        </div>
      </div>
    </>
  );
}
