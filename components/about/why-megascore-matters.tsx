import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function WhyMegaScoreMatters() {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-pink via-mega-blue to-mega-green"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Users className="w-6 h-6 mr-3 text-mega-pink" />
          Why MegaScore Matters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-foreground/10 rounded-lg">
            <h4 className="font-bold mb-3 text-mega-coral uppercase tracking-wide">
              For Users
            </h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Showcase your MegaETH expertise and commitment</li>
              <li>• Gain recognition as an early adopter and pioneer</li>
              <li>• Access to exclusive opportunities and rewards</li>
              <li>• Portable reputation across MegaETH applications</li>
            </ul>
          </div>
          <div className="p-4 border border-foreground/10 rounded-lg">
            <h4 className="font-bold mb-3 text-mega-green uppercase tracking-wide">
              For the Ecosystem
            </h4>
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
