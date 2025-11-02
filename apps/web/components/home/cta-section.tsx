import { CTASectionClient } from "@/components/home/cta-section-client";
import { getMegaReputationStats } from "@/lib/external/api/stats";

export async function CTASection() {
  const stats = await getMegaReputationStats();

  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-mega-coral/5 via-transparent to-mega-blue/5" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-4xl">
          <CTASectionClient holders={stats.holders} />
        </div>
      </div>
    </section>
  );
}
