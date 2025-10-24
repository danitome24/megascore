# MegaScore Codebase Guide for AI Agents

## Project Overview

**MegaScore** is a Web3 reputation system for the MegaETH testnet. It calculates on-chain reputation scores (0-1000+) based on user wallet activity (transactions, contracts deployed, NFTs minted) and surfaces them through a Next.js dashboard with wallet connection, leaderboards, and NFT minting mechanics.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Wagmi v2 (Web3), Viem, React Hook Form, TanStack Query, ConnectKit, Radix UI.

## Architecture Principles

### Data Flow Pipeline

Score calculation follows a **strict pipeline**: `fetchTransactions()` → `txsToMetrics()` → `calculate()` → UI display.

1. **Data Source Layer** (`/lib/fetchers/transactions.ts`): Fetches on-chain data from HyperSync API (MegaETH testnet) using wallet address as the single entry point.
2. **Mapper Layer** (`/lib/mappers/txs-to-metrics.ts`): Transforms raw blockchain data into normalized `Metrics` objects. Extracts transaction counts, active weeks, unique contracts, NFT/contract deployment info.
3. **Scoring Layer** (`/lib/score/calculate/score.ts`): Pure function applying weighted formula to metrics. Base 1000 + weighted components + bonuses (contract deployment +200, recent activity +150).
4. **API Layer** (`/app/api/score/calculate/route.ts`): GET endpoint orchestrating the pipeline. Currently hardcoded to example wallet for demo.

**Key Contract:** All score data flows through `Address` → `TransactionApiResponse` → `Metrics` → `Score` type transformations (see `/types/common.ts`).

### Component Structure

- **Page Layer** (`/app/*/page.tsx`): Client components handling routing and orchestration (e.g., `/app/my-score/page.tsx` composes header, score display, NFT card, metrics breakdown).
- **Feature Sections** (`/components/my-score/`, `/components/home/`): Domain-specific UI blocks (e.g., `score-display.tsx` handles animation + rank badges).
- **Shared UI** (`/components/ui/`): Pre-built Radix UI + shadcn primitives. **Avoid recreating these**—compose from existing components.
- **Layout Wrapper** (`/components/layout/page-container.tsx`): Consistent padding/spacing container.

### Web3 Integration

- **Provider Setup** (`/components/providers/web3-provider.tsx`): Single provider wrapping entire app, configured for `megaethTestnet` with ConnectKit UI overlay.
- **Wagmi/Viem Usage**: Use `useAccount()` from wagmi for connected wallet state; prefer `viem` for utility functions (e.g., `isAddress()`).
- **ConnectKit** handles wallet connection UI—don't build custom connect dialogs.

## Key Patterns & Conventions

### Naming & File Organization

- **Files Named After Their Role:** `use-[feature]-[action].ts` for hooks, `[component-name].tsx` for components.
- **Paths Follow Domain:** Related features grouped under domain folders (`/components/my-score/`, `/hooks/score/`, `/lib/score/`).
- **Type Definitions Centralized:** All shared types live in `/types/common.ts`. Don't scatter interface definitions—add types there.

### Animation & Interaction

- Uses **Framer Motion** for smooth state transitions (see `sidebar-navigation.tsx` for expand/collapse, `use-update-score.ts` for score number animation).
- Toast notifications via **Sonner** (`toast.loading()`, `toast.success()`, etc.).
- CSS class utilities via **clsx** for conditional styling; Tailwind for layout.

### Error Handling & Logging

- API errors: Return structured `{ status, error }` JSON (see `route.ts` example).
- Console logging: Used for debugging blockchain calls (e.g., transaction fetch logs).
- Blockchain validation: Use `isAddress()` from viem before processing wallet input.

### Styling Conventions

- Custom color tokens used: `mega-coral`, `mega-pink`, `mega-green`, `mega-blue` (Tailwind config).
- Fixed sidebar width: 64px (collapsed) / 280px (expanded).
- Main content has `ml-16` margin (accounting for fixed sidebar).

## Critical Development Workflows

### Local Development

```bash
pnpm dev         # Start Next.js dev server (port 3000)
pnpm build       # Production build
pnpm lint        # Run Next lint
```

### Debugging Score Calculation

1. Set wallet address in `/app/api/score/calculate/route.ts` (currently hardcoded).
2. Call `GET /api/score/calculate` to test pipeline.
3. Inspect `/lib/mappers/txs-to-metrics.ts` for metric extraction logic; metrics shape matches `types/common.ts#Metrics`.

### Adding New Metrics

1. Add field to `Metrics` type in `/types/common.ts`.
2. Extract field in `txsToMetrics()` function in `/lib/mappers/txs-to-metrics.ts`.
3. Apply weight in `calculate()` function in `/lib/score/calculate/score.ts`.
4. Display in UI component (e.g., `data-gathered-section.tsx`).

### Web3 Integration Points

- Wallet connection state: Query `useAccount()` hook (wagmi).
- Transaction data: Fetched server-side from HyperSync API; client never fetches directly.
- Mock data currently used in `/app/my-score/page.tsx` for demo—replace with actual API calls when backend ready.

## Integration Points & External Dependencies

- **HyperSync API** (`https://megaeth-testnet.hypersync.xyz/query`): Blockchain data source. Requires properly formed query body (see `transactions.ts#fetchTransactions` for structure).
- **ConnectKit + Wagmi**: Wallet connection. Config in `web3-provider.tsx` specifies MegaETH testnet RPC endpoint.
- **Next.js API Routes**: `/app/api/score/calculate` is the single scoring endpoint.

## Important File References

- **Type Definitions:** `/types/common.ts`
- **Score Algorithm:** `/lib/score/calculate/score.ts`
- **Data Fetching:** `/lib/fetchers/transactions.ts`
- **Data Transformation:** `/lib/mappers/txs-to-metrics.ts`
- **Page Entry Points:** `/app/my-score/page.tsx`, `/app/leaderboard/page.tsx`, `/app/about/page.tsx`
- **Web3 Setup:** `/components/providers/web3-provider.tsx`
- **UI Primitives:** `/components/ui/` (Radix UI components—don't edit directly)

## Common Tasks

**Update Score Formula:** Modify weights in `/lib/score/calculate/score.ts#calculate()` function.

**Add Leaderboard Feature:** Check `/components/leaderboard/` for existing list component; wire up with ranking data via hook (see `/hooks/leaderboard/` for pattern).

**Debug API Issues:** Check HyperSync query structure in `transactions.ts`; logs available in server console during `pnpm dev`.

**Styling Changes:** Use Tailwind classes or custom tokens in `tailwind.config.ts`. Don't add inline styles unless necessary.
