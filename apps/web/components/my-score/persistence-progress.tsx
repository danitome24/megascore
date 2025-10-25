import { Card, CardContent } from "@/components/ui/card";
import { Hash } from "lucide-react";

interface PersistenceProgressProps {
  isPersisting: boolean;
}

export function PersistenceProgress({ isPersisting }: PersistenceProgressProps) {
  if (!isPersisting) return null;
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-mega-blue bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-gradient-to-r from-mega-blue to-mega-green"></div>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-mega-blue">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-2 text-xl font-bold uppercase tracking-wide text-foreground">Updating Your SBT</h3>
          <p className="mb-6 text-foreground/70">
            Please wait while we update your Soulbound Token with your new score...
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 animate-bounce rounded-full bg-mega-blue"></div>
              <div className="animation-delay-200 h-3 w-3 animate-bounce rounded-full bg-mega-blue"></div>
              <div className="animation-delay-400 h-3 w-3 animate-bounce rounded-full bg-mega-blue"></div>
            </div>
            <p className="text-sm text-foreground/60">Persisting your new achievement to the blockchain.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
