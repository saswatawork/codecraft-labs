# GitHub Copilot Instructions for CodeCraft Labs

## 🏗️ Workspace Overview

**CodeCraft Labs** is a TypeScript monorepo containing:
- `apps/portfolio` - Personal portfolio (Next.js 16, React 19, Prisma, NextAuth, Sentry)
- `packages/ui` - Shared design system (`@ccl/ui`) — components, tests, Storybook

**Tech Stack:**
- Framework: Next.js 16 with App Router
- Language: TypeScript (strict mode)
- Package Manager: pnpm (workspace mode)
- Styling: Tailwind CSS v4
- Build Tool: Turbo
- Code Quality: Biome (formatter + linter)
- Database: Prisma + PostgreSQL

---

## 🎯 CRITICAL RULES

### 1. Always Use TypeScript Best Practices

```typescript
// ✅ GOOD - Proper typing
interface VideoConfig {
  title: string;
  duration: number;
  quality: 'low' | 'medium' | 'high';
}

// ❌ BAD - Using any
const config: any = { ... }
```

### 2. Creating a Shared UI Component

1. **Add to:** `packages/ui/src/components/`
2. **Export from:** `packages/ui/src/index.ts`
3. **Document:** Props with TypeScript interfaces
4. **Test:** In Storybook and with Vitest

### 3. Before Making Changes

**Ask yourself:**
- Should this be a shared component in `packages/ui` instead of living in `apps/portfolio`?
- Do I need to update TypeScript types?
- Does this touch the Prisma schema? If so, run `pnpm db:generate`.

---

## 🧪 Testing & Quality

```bash
# Format code
pnpm biome format --write .

# Lint code
pnpm biome check --write .

# Type check
pnpm typecheck

# Build all packages
pnpm build

# Run dev server for portfolio
pnpm --filter portfolio dev

# Run Storybook for the design system
pnpm --filter @ccl/ui storybook
```

### Before Committing

```bash
pnpm biome check --write .
pnpm build
pnpm test
```

---

## 🚫 NEVER DO THIS

1. **Don't use `npm` or `yarn`** - Always use `pnpm`
2. **Don't import from `../../`** - Use package aliases (`@ccl/ui`)
3. **Don't bypass TypeScript** - No `@ts-ignore` without explanation
4. **Don't hardcode API URLs** - Use environment variables
5. **Don't create inline styles** - Use Tailwind classes

---

## 💡 Helpful Commands

```bash
# Install dependencies
pnpm install

# Add dependency to a specific app/package
pnpm --filter portfolio add sharp
pnpm --filter @ccl/ui add -D @types/node

# Clean and rebuild
pnpm clean && pnpm install && pnpm build

# Check workspace structure
pnpm list --depth 0
```

---

## 📚 Quick Reference

- **Package Manager:** `pnpm`
- **Node Version:** Check `.nvmrc` or `package.json` engines
- **Frontend Dev:** `http://localhost:3000` (portfolio)
- **Linter/Formatter:** Biome
- **Build Tool:** Turbo

---

## 📌 Note on Scope

This repo used to also contain a `youtube-studio` dashboard app, a `web` portfolio
prototype, and a `create-ccl-app` CLI scaffolder — all removed. The real video
production system lives at `~/workspace/video-studio` (a separate Python repo) and
is not part of this monorepo.

## 🎯 When in Doubt

1. Check TypeScript types first
2. Look at existing similar components in `packages/ui`
3. Keep changes focused and atomic
