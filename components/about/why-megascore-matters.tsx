import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

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
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-foreground/10 p-4">
            <h4 className="mb-3 font-bold uppercase tracking-wide text-mega-coral">For Users</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Showcase your MegaETH expertise and commitment</li>
              <li>• Gain recognition as an early adopter and pioneer</li>
              <li>• Access to exclusive opportunities and rewards</li>
              <li>• Portable reputation across MegaETH applications</li>
            </ul>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4">
            <h4 className="mb-3 font-bold uppercase tracking-wide text-mega-green">For the Ecosystem</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Incentivize genuine network participation</li>
              <li>• Identify and reward valuable community members</li>
              <li>• Create a merit-based reputation system</li>
              <li>• Foster long-term ecosystem growth</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
