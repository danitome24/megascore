import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function DataGatheredSection({ scoreData }) {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl">
      <CardHeader className="border-b border-foreground/10 p-4">
        <CardTitle className="flex items-center text-lg uppercase tracking-wide">
          <BarChart3 className="w-5 h-5 mr-3 text-mega-coral" />
          Data Gathered
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-coral/5 transition-colors">
            <div className="text-2xl font-bold text-mega-coral mb-2">
              {scoreData.transactions}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Transactions
            </div>
          </div>
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-blue/5 transition-colors">
            <div className="text-2xl font-bold text-mega-blue mb-2">
              {scoreData.contractsInteracted}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Contracts
            </div>
          </div>
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-green/5 transition-colors">
            <div className="text-2xl font-bold text-mega-green mb-2">
              {scoreData.protocolsTested}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Protocols
            </div>
          </div>
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-pink/5 transition-colors">
            <div className="text-2xl font-bold text-mega-pink mb-2">
              {scoreData.activeDays}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Active Days
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-foreground/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70 uppercase tracking-wide">
                Total Volume
              </span>
              <span className="text-lg font-bold text-foreground">
                {scoreData.totalVolume}
              </span>
            </div>
          </div>
          <div className="p-4 bg-foreground/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70 uppercase tracking-wide">
                Last Activity
              </span>
              <span className="text-lg font-bold text-foreground">
                {scoreData.lastActivity}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 border border-foreground/20 rounded-lg bg-gradient-to-r from-mega-coral/5 to-mega-blue/5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-mega-coral mb-1">
                +{scoreData.weeklyGrowth}%
              </div>
              <div className="text-sm text-foreground/70 uppercase tracking-wide">
                Weekly Growth
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-mega-blue mb-1">
                +{scoreData.monthlyGrowth}%
              </div>
              <div className="text-sm text-foreground/70 uppercase tracking-wide">
                Monthly Growth
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
