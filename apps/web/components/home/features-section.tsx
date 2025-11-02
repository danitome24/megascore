"use client";

import { FeatureCard } from "@/components/home/feature-card";
import { FeaturesHeader } from "@/components/home/features-header";
import { Activity, TestTube, Trophy } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="via-mega-blue/2 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-6xl">
          <FeaturesHeader />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "Track Activity",
                description:
                  "Every transaction, smart contract interaction, and testnet participation is automatically recorded and scored.",
                color: "mega-coral",
                delay: 0.2,
              },
              {
                icon: TestTube,
                title: "Pioneer Rewards",
                description:
                  "Early testnet participants receive bonus points and exclusive recognition for helping build the ecosystem.",
                color: "mega-green",
                delay: 0.4,
              },
              {
                icon: Trophy,
                title: "Verifiable Reputation",
                description:
                  "Your reputation is stored on-chain as a Soulbound NFT, making it permanent and verifiable across applications.",
                color: "mega-blue",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color as "mega-coral" | "mega-green" | "mega-blue"}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
