# Repository Guidelines

## Project Structure & Module Organization

The Vite + Vue 3 source code lives under `src/`. `App.vue`, `main.ts`, and `router/index.ts` bootstrap the UI, register Pinia, and configure page-level guards. Routed views stay in `src/pages/` (e.g., `LoginPage.vue`, `SignupPage.vue`, `MainPage.vue`), shared state in `src/stores/`, and HTTP helpers in `src/api/` (`http.ts` centralizes Axios + token refresh). Static assets belong in `src/assets/`, while framework-managed files sit in `public/`. Production bundles are emitted to `dist/`, and configuration lives at the repo root (`vite.config.ts`, `tsconfig.*`, `eslint.config.js`, `vercel.json`).

## Build, Test, and Development Commands

- `npm install` — install dependencies and regenerate `package-lock.json` when packages change.
- `npm run dev` — launch the Vite dev server with HMR at `http://localhost:5173`.
- `npm run build` — run `vue-tsc -b` for type checking, then produce the optimized bundle in `dist/`.
- `npm run preview` — serve the last build locally to sanity check production behavior.
- `npm run lint` — execute ESLint (Vue + TS rules); append `-- --fix` for safe auto-fixes.

## Coding Style & Naming Conventions

Prefer `<script setup lang="ts">` blocks with TypeScript types for API payloads. Use 2-space indentation, double quotes, and PascalCase for components/pages (`LoginPage.vue`). Pinia stores follow `useXxxStore.ts`, export typed getters/actions, and never persist tokens outside memory. Keep component-specific styles scoped, colocate utilities with their consumers, and rely on Prettier + ESLint to enforce formatting before committing.

## Testing Guidelines

Automated tests are not wired yet. Document manual verification steps in PRs (e.g., email login, social login, logout) and attach console/network captures when diagnosing regressions. If you add automated tests later, prefer Vitest + Vue Testing Library, co-locate `*.spec.ts` files next to the component, and mock Axios using adapters.

## Commit & Pull Request Guidelines

Follow the existing conventional-style prefixes observed in `git log` (`Feat:`, `Fix:`, `Docs:`). Keep commit subjects under 70 characters and describe the user-facing impact first. Every PR should include: a short summary, screenshots or terminal output for key flows, linked issues, environment/setup notes (e.g., required `.env.local`), and a checklist of commands/tests run. Ensure `npm run lint` and `npm run build` pass before requesting review.

## Environment & Security Notes

`import.meta.env.VITE_API_URL` must point to the backend domain, and Axios runs with `withCredentials`, so never hardcode hostnames or leak tokens to `localStorage`. All authenticated routes must go through router guards; unauthenticated users should always be redirected to `/login`.
