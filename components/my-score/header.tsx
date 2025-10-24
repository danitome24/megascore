import { Button } from "@/components/ui/button";
import { useUpdateScore } from "@/hooks/score/use-update-score";

export function MyScoreHeader() {
  const { isUpdating, handleUpdateScore } = useUpdateScore();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
          My Reputation
        </h1>
        <p className="text-base text-foreground/70">MegaETH Network Score</p>
      </div>
      <div className="flex gap-3 mt-3 sm:mt-0">
        <Button
          onClick={handleUpdateScore}
          disabled={isUpdating}
          className={`
            bg-mega-coral hover:bg-mega-coral/90 text-white border-0
            uppercase tracking-wide font-medium transition-all duration-300 ease-in-out
            ${
              isUpdating
                ? "cursor-not-allowed opacity-80"
                : "hover:scale-105 hover:shadow-lg"
            }
          `}
        >
          {/* You can add the icon here if needed */}
          {isUpdating ? "Updating..." : "Update Score"}
        </Button>
      </div>
    </div>
  );
}
