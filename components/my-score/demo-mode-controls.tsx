import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Hash, X, Eye, Zap } from "lucide-react";

export function DemoModeControls({
  demoMode,
  setScoreIncrease,
  setScoreIncreased,
  setShowMintOption,
  setShowPersistOption,
  setIsMinting,
  setIsPersisting,
  setScoreIncreaseZero,
  setScoreIncreasedFalse,
  setShowMintOptionFalse,
  setShowPersistOptionFalse,
}) {
  if (!demoMode) return null;
  return (
    <Card className="bg-background border-2 border-mega-green/50 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-green to-mega-blue"></div>
      <CardHeader className="border-b border-foreground/10 p-4">
        <CardTitle className="flex items-center text-lg uppercase tracking-wide text-mega-green">
          <Zap className="w-5 h-5 mr-3" />
          Demo Mode - Test SBT Functionality
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => {
              setScoreIncrease(25);
              setScoreIncreased(true);
              setShowMintOption(true);
            }}
            className="bg-mega-coral hover:bg-mega-coral/90 text-white border-0 uppercase tracking-wide"
            // ...existing code...
          >
            <Trophy className="w-4 h-4 mr-2" />
            Test Mint SBT
          </Button>
          <Button
            onClick={() => {
              setScoreIncrease(15);
              setScoreIncreased(true);
              setShowPersistOption(true);
            }}
            className="bg-mega-blue hover:bg-mega-blue/90 text-white border-0 uppercase tracking-wide"
            // ...existing code...
          >
            <Hash className="w-4 h-4 mr-2" />
            Test Persist Score
          </Button>
          <Button
            onClick={() => {
              setShowMintOptionFalse();
              setShowPersistOptionFalse();
              setScoreIncreasedFalse();
              setScoreIncreaseZero();
              setIsMinting(false);
              setIsPersisting(false);
            }}
            variant="outline"
            className="border-foreground/20 text-foreground/70 hover:bg-foreground/5 uppercase tracking-wide"
          >
            <X className="w-4 h-4 mr-2" />
            Reset State
          </Button>
          <div className="text-sm text-foreground/60 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Demo mode for testing SBT flows
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
