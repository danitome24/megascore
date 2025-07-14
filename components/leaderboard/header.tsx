import { Trophy } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
          Leaderboard
        </h1>
        <p className="text-base text-foreground/70">
          Top 50 MegaETH Network Performers
        </p>
      </div>
    </div>
  );
}
