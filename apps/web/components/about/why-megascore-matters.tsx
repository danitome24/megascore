import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Lightbulb, TrendingUp, Users } from "lucide-react";

export function WhyMegaScoreMatters() {
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-pink via-mega-blue to-mega-green"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Users className="mr-3 h-6 w-6 text-mega-pink" />
          Why MegaScore Matters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <p className="text-foreground/80">
          MegaScore bridges the gap between on-chain activity and real-world value. In a decentralized ecosystem,
          reputation is everything. Our system creates a transparent, immutable record of your contributions.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-mega-coral/20 bg-gradient-to-br from-mega-coral/5 to-transparent p-5">
            <div className="mb-3 flex items-center space-x-2">
              <Award className="h-5 w-5 text-mega-coral" />
              <h4 className="font-bold uppercase tracking-wide text-mega-coral">For Users</h4>
            </div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>✓ Showcase your MegaETH expertise and commitment</li>
              <li>✓ Gain recognition as an early adopter and pioneer</li>
              <li>✓ Access exclusive opportunities and rewards</li>
              <li>✓ Build portable reputation across MegaETH applications</li>
              <li>✓ Compete on a transparent global leaderboard</li>
            </ul>
          </div>
          <div className="rounded-lg border border-mega-green/20 bg-gradient-to-br from-mega-green/5 to-transparent p-5">
            <div className="mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-mega-green" />
              <h4 className="font-bold uppercase tracking-wide text-mega-green">For the Ecosystem</h4>
            </div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>✓ Incentivize genuine network participation</li>
              <li>✓ Identify and reward valuable community members</li>
              <li>✓ Create a transparent merit-based system</li>
              <li>✓ Foster long-term ecosystem growth and engagement</li>
              <li>✓ Build trust through on-chain verification</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start space-x-4 rounded-lg border border-mega-blue/20 bg-mega-blue/5 p-4">
          <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-mega-blue" />
          <div>
            <p className="mb-1 text-sm font-semibold text-mega-blue">The Future of Reputation</p>
            <p className="text-sm text-foreground/70">
              MegaScore reimagines how communities recognize and reward their most active members. It's not just about
              numbers—it's about creating a thriving ecosystem where contributions matter.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
