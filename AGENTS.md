# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`. Entry points (`main.tsx`, `App.tsx`) wire React Router and global Zustand auth state. Feature pages sit under `src/pages`, shared state inside `src/stores`, and REST helpers in `src/api` (see `http.ts` for the Axios client and token refresh logic). Assets belong in `src/assets`, while global styles live in `App.css` and `index.css`. Public files live in `public/`, while production builds emit to `dist/`. Tooling config sits at the repo root (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`).

## Build, Test, and Development Commands
- `npm install` — install dependencies defined in `package.json`.
- `npm run dev` — start the Vite dev server with hot reload; use for day-to-day feature work.
- `npm run build` — type-check via `tsc -b` then create an optimized Vite bundle in `dist/`.
- `npm run preview` — serve the last build locally to validate production behavior.
- `npm run lint` — run ESLint across the repo; append `-- --fix` before committing style-only fixes.

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, and double quotes as in existing files. Components and hooks should be PascalCase (e.g., `LoginPage`, `OAuthCallbackPage`), while Zustand stores follow `useXxxStore`. Keep UI under `pages` or feature folders and colocate helpers with consumers. Format using Prettier defaults and keep ESLint clean; prefer descriptive prop and state names over abbreviations.

## Testing Guidelines
Automated tests are not wired yet, so log manual verification steps in your PR until a Vitest setup is introduced. When adding tests, co-locate `*.test.tsx` files beside the component or place shared suites under `src/__tests__`. Mock HTTP calls via Axios interceptors or dependency injection, and name specs using the `should <behavior>` pattern so failures read well.

## Commit & Pull Request Guidelines
Follow the existing conventional-style prefixes (`Feat:`, `Fix:`, `Docs:`, etc.) seen in `git log`. Keep subjects under 70 characters and describe the user-facing outcome first. Each PR should include: a short summary, screenshots or CLI output for key flows (e.g., login/logout), notes on env requirements, and a checklist of manual tests executed. Reference related issues or TODOs, and ensure lint/build commands pass before requesting review.

## Environment & Security Notes
`src/api/http.ts` expects `VITE_API_URL` in `.env.local`; never hardcode API hosts. Because Axios runs with `withCredentials`, guard new endpoints against CSRF and respect secure cookie policies. Avoid storing tokens outside the in-memory Zustand store, and always redirect unauthenticated users through the `/login` route when adding pages.
