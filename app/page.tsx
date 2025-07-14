"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Activity,
  TestTube,
  Trophy,
  Square,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Wallet,
  BarChart3,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { NetworkStatsSection } from "@/components/home/network-stats-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <NetworkStatsSection />
      <CTASection />
    </div>
  );
}
