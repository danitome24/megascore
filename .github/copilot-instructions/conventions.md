# Naming, Organization & Conventions

## Naming & File Organization
- **Files Named After Their Role:** `use-[feature]-[action].ts` for hooks, `[component-name].tsx` for components.
- **Paths Follow Domain:** Related features grouped under domain folders (e.g., `apps/web/components/my-score/`, `apps/web/hooks/score/`, `apps/web/lib/score/`).
- **Type Definitions Centralized:** All shared types live in `apps/web/types/common.ts`. Don't scatter interface definitions—add types there.
- **App-specific code:** Lives in `apps/web/`.
- **Shared code:** Place in `packages/` for future use across multiple apps or backend services.
- **Database migrations and config:** Located in `apps/web/supabase/`.
