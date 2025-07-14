export function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
          About MegaScore
        </h1>
        <p className="text-base text-foreground/70">
          Understanding the MegaETH Reputation System
        </p>
      </div>
    </div>
  );
}
