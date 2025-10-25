# Database & Persistence

## Schema & Table Conventions
- All shared types live in `apps/web/types/common.ts`.
- Type definitions should not be scattered—add types there.

## Data Fetching Strategy (Recommended)
**Hybrid Approach:**
- On user login or initial load, fetch all essential account data: profile, latest metrics, latest score, and referral info in a single query or batched request.
- For large or infrequently used data (such as metrics_history and scores_history), fetch only when the user navigates to the relevant section or requests it.
- This balances performance and responsiveness, reducing unnecessary queries and improving perceived speed.
- Use React Query or SWR to cache, prefetch, and manage background updates as needed.

**Summary:**
Fetch essentials up front, load heavy/history data on demand.

## Error Handling & Logging
- API errors: Return structured `{ status, error }` JSON (see `apps/web/app/api/score/calculate/route.ts` example).
- Console logging: Used for debugging blockchain calls (e.g., transaction fetch logs).
- Blockchain validation: Use `isAddress()` from viem before processing wallet input.
