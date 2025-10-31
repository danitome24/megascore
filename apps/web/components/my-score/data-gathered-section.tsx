import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScoreStore } from "@/store/score-store";
import { BarChart3 } from "lucide-react";

export function DataGatheredSection() {
  const { currentMetrics: metrics } = useScoreStore();

  if (!metrics) {
    return null;
  }
  return (
    <Card className="border-2 border-foreground/20 bg-background shadow-xl">
      <CardHeader className="border-b border-foreground/10 p-4">
        <CardTitle className="flex items-center text-lg uppercase tracking-wide">
          <BarChart3 className="mr-3 h-5 w-5 text-mega-coral" />
          Data Gathered
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-coral/5">
            <div className="mb-2 text-2xl font-bold text-mega-coral">{metrics.transactions}</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Transactions</div>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-blue/5">
            <div className="mb-2 text-2xl font-bold text-mega-blue">{metrics.uniqueContractsInteractedWith}</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Contracts</div>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-green/5">
            <div className="mb-2 text-2xl font-bold text-mega-green">{metrics.maxConsecutiveActiveWeeks}</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Consecutive Active Weeks</div>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-pink/5">
            <div className="mb-2 text-2xl font-bold text-mega-pink">{metrics.weeksSinceFirstTransaction}</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Age of Wallet</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-foreground/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wide text-foreground/70">Total Transactions</span>
              <span className="text-lg font-bold text-foreground">{metrics.transactions}</span>
            </div>
          </div>
          <div className="rounded-lg bg-foreground/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wide text-foreground/70">Last Activity</span>
              <span className="text-lg font-bold text-foreground">
                {new Date(metrics.lastActiveDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 p-4 border border-foreground/20 rounded-lg bg-gradient-to-r from-mega-coral/5 to-mega-blue/5">
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
        </div> */}
      </CardContent>
    </Card>
  );
}
