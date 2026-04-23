# syntax=docker/dockerfile:1.7

############################
# 1. Build stage
############################
FROM node:20-alpine AS build
WORKDIR /app

# Install deps with yarn (lockfile-aware; falls back gracefully on first build)
COPY package.json yarn.lock* ./
RUN if [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile; \
    else \
      yarn install; \
    fi

# Build the Vite bundle
COPY . .

# Build-time env: production builds use a same-origin /api by default;
# nginx in the runtime stage proxies that to the backend service.
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN yarn build

############################
# 2. Runtime stage (nginx)
############################
FROM nginx:1.27-alpine AS runtime

# Replace the default site with one that knows about /api
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
