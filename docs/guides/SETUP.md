# Setup Guide

## Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0

## Install

```bash
git clone git@github.com:saswatawork/codecraft-labs.git
cd codecraft-labs
pnpm install
pnpm prepare   # installs git hooks (husky)
```

## Develop

```bash
pnpm --filter portfolio dev      # portfolio at localhost:3000
pnpm --filter @ccl/ui storybook  # design system storybook
```

## Common Commands

```bash
pnpm build       # build everything (turbo)
pnpm test        # run tests
pnpm typecheck   # typecheck everything
pnpm check       # biome format + lint
pnpm db:generate # regenerate Prisma client for portfolio
```

## Structure

```
codecraft-labs/
├── apps/portfolio/    # Next.js portfolio site (Prisma, NextAuth, Sentry)
├── packages/ui/       # @ccl/ui design system, consumed by portfolio
└── tools/typescript-config/  # shared tsconfig bases
```
