# Monorepo Structure & Conventions

- The MegaScore project uses a pnpm monorepo for code organization and dependency management.
- App-specific code lives in `apps/` (e.g., `apps/web` for the Next.js frontend).
- Shared utilities, types, and future backend logic should go in `packages/` (currently empty, but reserved for shared code).
- Database migrations and Supabase config are located in `apps/web/supabase/`.
- Shared types for database models live in `apps/web/types/common.ts`.
- Workspace configuration is managed by `pnpm-workspace.yaml` and `tsconfig.base.json` at the root.
- Reference shared code in apps using workspace imports (see `tsconfig.base.json` and app-level `tsconfig.json` for path setup).
