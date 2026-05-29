# Frontend assessment

**Live demo:** https://frontend-assessment-quantiphi.vercel.app/

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

Production build is hosted on Vercel: [https://frontend-assessment-quantiphi.vercel.app/](https://frontend-assessment-quantiphi.vercel.app/)

## AI usage

I used Cursor (AI-assisted coding) as a development aid during this assessment. I worked from the given requirements and used it to speed up scaffolding of the Next.js project structure, including routing, Zustand stores, shared UI components, and feature-based folder organization.

It also helped me implement parts of the calculator and cars flows, set up initial testing with Vitest and Playwright, and debug issues during development. AI was used as a productivity tool to assist with implementation and debugging, while the final decisions, testing, and submission quality remain my responsibility.
