# ProjectX

Full-stack starter:

- **frontend/** — React 18 + TypeScript + Vite + Redux Toolkit + Material UI + Tailwind + Axios (Yarn)
- **backend/** — Java 17 + Spring Boot 3.2 (Maven)

The two pieces are wired so the React app can call the Spring Boot API
out-of-the-box, both in dev (via the Vite proxy) and in prod (via
`VITE_API_BASE_URL` / CORS).

```
ProjectX/
├── frontend/      # Vite SPA on :5173
└── backend/       # Spring Boot API on :8080
```

## Run it

In one terminal:

```bash
cd backend
./mvnw spring-boot:run        # http://localhost:8080
```

In another:

```bash
cd frontend
yarn install
yarn dev                      # http://localhost:5173
```

Open <http://localhost:5173>, type a name, and click **Call /api/hello**.
You should see a greeting and timestamp returned by Spring Boot.

## How the integration works

1. **Vite dev proxy** (`frontend/vite.config.ts`) forwards any request starting
   with `/api` from `:5173` → `http://localhost:8080`. No CORS needed in dev.
2. **Axios client** (`frontend/src/features/api/axiosClient.ts`) uses
   `baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'`, so the path
   `/hello` becomes `/api/hello` and hits the proxy.
3. **Redux thunk** (`frontend/src/features/api/messageSlice.ts`) dispatches the
   call and stores the response in the `message` slice.
4. **Spring controller** (`backend/.../HelloController.java`) maps
   `GET /api/hello` and returns a `MessageDto` (`{ message, timestamp }`) — the
   same shape the frontend expects.
5. **CORS** (`backend/.../CorsConfig.java`) whitelists
   `http://localhost:5173` so direct cross-origin calls also work (e.g. if you
   bypass the proxy by setting `VITE_API_BASE_URL=http://localhost:8080`).

## Docker deployment

Both services have multi-stage Dockerfiles and a top-level `docker-compose.yml`:

```bash
docker compose up --build
# frontend:  http://localhost:8081
# backend:   http://localhost:8080  (also reachable as /api/* via the frontend)
```

What happens:

1. **backend image** — Maven builds the fat jar in a build stage, then the
   runtime stage runs it on `eclipse-temurin:17-jre-jammy` as a non-root user.
   Health-checked via `/actuator/health`.
2. **frontend image** — `node:20-alpine` runs `yarn build`, the resulting
   `dist/` is copied into `nginx:1.27-alpine`. Nginx serves the SPA, gzips
   assets, caches hashed `/assets/*` for a year, and reverse-proxies `/api/*`
   to the `backend` service on the compose network — so the browser only
   talks to one origin and CORS is a non-issue in this setup.
3. `frontend` waits for `backend` to be healthy before starting.

To build images individually:

```bash
docker build -t projectx-backend  ./backend
docker build -t projectx-frontend ./frontend --build-arg VITE_API_BASE_URL=/api
```

## Next steps

- Add more slices under `frontend/src/features/` and matching controllers/services
  under `backend/src/main/java/com/example/demo/`.
- Add Spring Security + JWT, then plumb the token through the axios request
  interceptor.
- For deployment, build the frontend (`yarn build`) and serve the `dist/`
  folder either from a CDN or from Spring Boot's `static/` resources.
