import { Card, CardContent } from "@/components/ui/card";
import { Hash } from "lucide-react";

interface PersistenceProgressProps {
  isPersisting: boolean;
}

export function PersistenceProgress({
  isPersisting,
}: PersistenceProgressProps) {
  if (!isPersisting) return null;
  return (
    <Card className="bg-background border-2 border-mega-blue shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-blue to-mega-green animate-pulse"></div>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-mega-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground uppercase tracking-wide mb-2">
            Updating Your SBT
          </h3>
          <p className="text-foreground/70 mb-6">
            Please wait while we update your Soulbound Token with your new
            score...
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce animation-delay-400"></div>
            </div>
            <p className="text-sm text-foreground/60">
              Persisting your new achievement to the blockchain.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
