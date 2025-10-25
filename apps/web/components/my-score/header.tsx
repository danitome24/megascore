import { Button } from "@/components/ui/button";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useScoreStore } from "@/store/score-store";

export function MyScoreHeader() {
  const { hasNFT } = useScoreStore();
  const { isUpdating, handleUpdateScore } = useUpdateScore();
  return (
    <div className="mb-8 flex flex-col justify-between border-b border-foreground/10 pb-6 sm:flex-row sm:items-center">
      <div>
        <h1 className="mb-2 text-3xl font-bold uppercase tracking-wide text-foreground">My Reputation</h1>
        <p className="text-base text-foreground/70">MegaETH Network Score</p>
      </div>
      {hasNFT && (
        <div className="mt-3 flex gap-3 sm:mt-0">
          <Button
            onClick={handleUpdateScore}
            disabled={isUpdating}
            className={`border-0 bg-mega-coral font-medium uppercase tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-mega-coral/90 ${
              isUpdating ? "cursor-not-allowed opacity-80" : "hover:scale-105 hover:shadow-lg"
            } `}
          >
            {/* You can add the icon here if needed */}
            {isUpdating ? "Updating..." : "Update Score"}
          </Button>
        </div>
      )}
    </div>
  );
}
