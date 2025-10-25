# Backend & API

## API Location
- All API endpoints are implemented as Next.js Route Handlers under `apps/web/app/api/`.
- Example: The score calculation endpoint is at `apps/web/app/api/score/calculate/route.ts`.
- Follow Next.js App Router conventions for API structure and HTTP method handling.

## Library Code
- All backend and utility libraries are in `apps/web/lib/`.
- Organize by domain: e.g., `apps/web/lib/score/`, `apps/web/lib/mappers/`.
- Place pure functions, data mappers, and business logic here for reuse across API routes and components.

## Data Flow Pipeline
The typical data flow is:
1. **Hook** (e.g., `apps/web/hooks/score/use-update-score.ts`) triggers a data fetch or mutation from the UI.
2. **API Call** is made to a Next.js Route Handler in `apps/web/app/api/`.
3. **Libraries** in `apps/web/lib/` handle business logic, data mapping, and calculations.
4. **API Return**: The API handler returns the result to the frontend, which updates the UI.

## Web3 Integration
- Use `wagmi` and `viem` for wallet and blockchain interactions.
- Provider setup is in `apps/web/components/providers/web3-provider.tsx`.
- Wallet connection state via `useAccount()` (wagmi).
- Blockchain validation with `isAddress()` (viem).

## Notes
- Keep API logic thin; delegate business logic to libraries in `lib/`.
- Use shared types from `apps/web/types/common.ts` for all API and lib code.
