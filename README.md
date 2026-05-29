# Frontend assessment

Two-page Next.js app:

- `/calculator` — basic calculator with history and keyboard shortcuts
- `/cars` — used car listings with filters, sorting, and a detail modal

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

Requires Node 20+.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run test` — unit tests (Vitest)
- `npm run test:e2e` — end-to-end tests (Playwright, run `npx playwright install chromium` first)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Zustand, Framer Motion, MSW (used in tests).

Car data is served from `src/app/api/cars` using mock data in `src/mocks/data/cars.ts`. MSW handlers in `src/mocks/handlers.ts` mirror the same API for Vitest.

## Project layout

```
src/
  app/           routes + API
  components/    shared UI
  features/      calculator + cars pages
  hooks/         useCars, useDebounce
  store/         Zustand stores
  mocks/         mock data + MSW
  utils/         calculator + filter helpers
```

## Deploy

Works on Vercel with default Next.js settings. No env vars required.
