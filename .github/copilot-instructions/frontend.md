# Frontend & UI/UX

## Component Structure
- **Page Layer** (`apps/web/app/*/page.tsx`): Client components handling routing and orchestration (e.g., `apps/web/app/my-score/page.tsx` composes header, score display, NFT card, metrics breakdown).
- **Feature Sections** (`apps/web/components/my-score/`, `apps/web/components/home/`): Domain-specific UI blocks (e.g., `score-display-section.tsx` handles animation + rank badges).
- **Shared UI** (`apps/web/components/ui/`): Pre-built Radix UI + shadcn primitives. **Avoid recreating these**—compose from existing components.
- **Layout Wrapper** (`apps/web/components/layout/page-container.tsx`): Consistent padding/spacing container.

## Animation & Interaction
- Uses **Framer Motion** for smooth state transitions (see `apps/web/components/layout/sidebar-navigation.tsx` for expand/collapse, `apps/web/hooks/score/use-update-score.ts` for score number animation).
- Toast notifications via **Sonner** (`toast.loading()`, `toast.success()`, etc.).
- CSS class utilities via **clsx** for conditional styling; Tailwind for layout.

## Styling Conventions
- Custom color tokens: `mega-coral`, `mega-pink`, `mega-green`, `mega-blue` (see `apps/web/tailwind.config.ts`).
- Fixed sidebar width: 64px (collapsed) / 280px (expanded).
- Main content has `ml-16` margin (for fixed sidebar).

## Common Tasks
- **Styling Changes:** Use Tailwind classes or custom tokens in `apps/web/tailwind.config.ts`. Don't add inline styles unless necessary.
