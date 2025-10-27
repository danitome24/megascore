export function Header() {
  return (
    <div className="mb-12 space-y-6">
      <div className="flex flex-col justify-between border-b border-foreground/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-wider text-foreground">About MegaScore</h1>
          <p className="text-lg text-foreground/70">The on-chain reputation system for MegaETH pioneers</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-mega-blue/20 bg-mega-blue/5 p-4">
          <div className="font-mono text-3xl font-bold text-mega-blue">∞</div>
          <div className="text-sm uppercase tracking-wide text-foreground/70">Scalable Reputation</div>
        </div>
        <div className="rounded-lg border border-mega-green/20 bg-mega-green/5 p-4">
          <div className="font-mono text-3xl font-bold text-mega-green">100%</div>
          <div className="text-sm uppercase tracking-wide text-foreground/70">On-Chain Verified</div>
        </div>
      </div>
    </div>
  );
}
