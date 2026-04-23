# Frontend

React 18 + TypeScript + Vite, with Redux Toolkit, Material UI, Tailwind CSS, and Axios.
Package manager: **Yarn**.

## Quick start

```bash
yarn install
yarn dev             # http://localhost:5173
yarn build
yarn preview

yarn test            # Vitest in watch mode
yarn test:run        # Single run
yarn test:ui         # Vitest UI
yarn test:coverage   # v8 coverage report -> ./coverage
```

The dev server proxies `/api/*` to the Spring Boot backend at `http://localhost:8080`
(see `vite.config.ts`). To override the API host in production, set `VITE_API_BASE_URL`.

## Structure

```
src/
├── app/store.ts                 Redux store + typed hooks
├── features/
│   ├── counter/counterSlice.ts  Pure Redux slice
│   └── api/
│       ├── axiosClient.ts       Configured axios instance
│       └── messageSlice.ts      Async thunk → GET /api/hello
├── components/
│   ├── Counter.tsx
│   └── HelloFromBackend.tsx     Calls Spring Boot
├── App.tsx
├── main.tsx                     Provider + ThemeProvider mounted here
└── index.css                    Tailwind directives
```

## Testing

Vitest + React Testing Library + jsdom. Configuration lives in
`vitest.config.ts` and reuses the Vite build config (path aliases, plugins).

```
src/
├── test/
│   ├── setup.ts                jest-dom matchers + cleanup
│   └── renderWithProviders.tsx Helper that mounts components with Redux + MUI
├── features/counter/counterSlice.test.ts
├── features/api/messageSlice.test.ts   (mocks axios)
└── components/Counter.test.tsx
```

## Notes on Tailwind + MUI

`tailwind.config.js` disables Tailwind's `preflight` and scopes utilities
under `#root` (`important: '#root'`) so Tailwind's resets don't fight with
MUI's `CssBaseline`. Use Tailwind for layout/spacing and MUI for components.
