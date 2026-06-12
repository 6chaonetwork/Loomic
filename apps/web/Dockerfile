FROM node:22-slim AS deps

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json tsconfig.base.json ./

COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/
COPY packages/config/package.json packages/config/
COPY packages/ui/package.json packages/ui/

RUN pnpm install --frozen-lockfile --ignore-scripts

FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY packages/shared/ packages/shared/
COPY packages/config/ packages/config/
COPY packages/ui/ packages/ui/
COPY apps/web/ apps/web/

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SERVER_BASE_URL
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-$SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-$SUPABASE_ANON_KEY}
ENV NEXT_PUBLIC_SERVER_BASE_URL=$NEXT_PUBLIC_SERVER_BASE_URL

RUN pnpm --filter @loomic/config build
RUN pnpm --filter @loomic/shared build
RUN pnpm --filter @loomic/ui build
RUN node -e "console.info('[loomic:web] build env', { hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL), hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY), serverBaseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL || null })"
RUN pnpm --filter @loomic/web build

FROM node:22-slim AS production

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

WORKDIR /app

COPY --from=builder /app/apps/web/out ./out

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "dlx", "serve@latest", "out", "-l", "3000"]
