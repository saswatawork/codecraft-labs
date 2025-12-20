---
title: "Why I Chose Monorepo: From Copy-Paste Hell to 2.8s Builds"
description: "I had the same Button component in 3 repos. All slightly different. All breaking at different times. Here's how monorepo fixed that (and made builds 22x faster)."
tags:
  - monorepo
  - turborepo
  - architecture
  - pnpm
  - devops
published: true
series: "Tech Stack Decisions"
---

# Why I Chose Monorepo: From Copy-Paste Hell to 2.8s Builds

Friday, 11:47 PM. Portfolio site: white screen. Button component broke.

I'd updated the variant prop in my UI library repo. Pushed it. Forgot the portfolio had its own copy of Button.tsx—same name, different version, same breaking change.

Three repos. Three copies of the same component. Two of them broken.

That's when I knew: the copy-paste had to stop.

---

## TL;DR

**What I did:** Merged 3 separate repos (portfolio, web app, CLI) into one monorepo with shared packages.

**The wins:**
- Builds: 5min 23s → 2.8s (95% cache hits with Turborepo)
- Code duplication: ~40% → 0%
- Type safety: Instant across all packages (no more publish-to-test)
- DX: Change Button, see it update in 3 apps immediately

**Setup time:** 30 minutes  
**Would I do it again?** Absolutely.

**Keep reading for:** The breaking point moment, what I tried, how it actually works, and 3 gotchas that cost me 4 hours.

---

## The Problem

I'm building CodeCraft Labs—a portfolio site, a web playground, and eventually a CLI tool. React 19, TypeScript 5.6, Next.js 16, Tailwind v4. Solo dev for now, planning to bring on 2-3 people eventually.

**The multi-repo nightmare:**

**Repository #1:** `portfolio` (Next.js app)
**Repository #2:** `web-prototype` (React app)  
**Repository #3:** `ui-library` (shared components)

### What Actually Broke

I had a Button component. 230 lines. Used in both apps.

Initially: one repo, npm published as `@ccl/ui`. Worked great.

Then I needed to iterate fast. Publishing to npm every time I changed padding? Painful. So I copy-pasted Button.tsx into both apps. "Just temporarily," I told myself.

Three months later: three versions of Button.tsx, all diverged.

**The breaking change:**
```typescript
// ui-library repo (v1.2.0)
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
}

// What I changed it to (v1.3.0)
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  onClick?: () => Promise<void>; // Added async support
}
```

Updated portfolio. Deployed. Worked.

Forgot the web-prototype had its own copy. It didn't get the update. onClick handlers broke. Saturday morning: emails.

### The Real Cost

**Time waste:**
- Each shared component update: 15-20 minutes to sync across repos
- Frequency: 5-10 updates per day
- Daily cost: ~2+ hours of copy-paste coordination

**What killed me:**
- TypeScript couldn't catch cross-repo breakages (only failed after npm publish → install → build)
- Three CI/CD pipelines to maintain
- Deployment coordination ("Did I update all three?")
- Version drift anxiety

**The moment I decided to change:** 
Saturday, 2:47 AM. Fixed the Button bug in 5 minutes. Spent 2 hours questioning if I wanted to keep doing this for the next year.

---

## What I Looked At

### Option 1: Keep Multi-Repo, Use npm link

**The promise:** Symlink local packages, no publishing needed.

**Reality:** `npm link` is... not great.

Tried it for a week:
- Had to run `npm link` after every clean install
- Forgot to re-link after switching branches: "Module not found" errors
- Works on my machine, broke in CI
- Gave up

### Option 2: Git Submodules

**The promise:** Nest repos, share code via git.

**Why I skipped it:** Everyone who's used git submodules told me "don't use git submodules." Listened to them.

### Option 3: Monorepo (Turborepo + pnpm workspaces)

**The promise:** 
- One repo, multiple packages
- Import local packages like npm packages (but instant)
- TypeScript sees everything
- Build caching makes builds stupid fast

**Why I picked it:**
- pnpm workspaces handle package linking automatically (no more npm link hell)
- Turborepo caches build outputs (only rebuild what changed)
- Vercel built Turborepo, and I deploy on Vercel (figured integration would be good)

Setup took 30 minutes. Been using it for 6 months. Zero regrets.

---

## How It Actually Works

Two tools doing different jobs:

**pnpm workspaces** = package manager  
**Turborepo** = build orchestrator

### The Structure

```
codecraft-labs/
├── apps/
│   ├── portfolio/          # Next.js → Vercel
│   ├── web/                # React app → Vercel
│   └── cli/                # Node.js CLI → npm
│
├── packages/
│   ├── ui/                 # Component library
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── ...
│   │   └── package.json    # name: "@ccl/ui"
│   └── typescript-config/  # Shared tsconfig
│
├── pnpm-workspace.yaml     # Defines workspaces
├── turbo.json              # Build pipeline
└── package.json            # Root dependencies
```

### How pnpm Workspaces Link Packages

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// apps/portfolio/package.json
{
  "dependencies": {
    "@ccl/ui": "workspace:*"  // Links to packages/ui/
  }
}
```

Run `pnpm install`. That's it. pnpm creates symlinks:

```
apps/portfolio/node_modules/@ccl/ui → ../../packages/ui/
```

Now you can import:

```typescript
// apps/portfolio/src/app/page.tsx
import { Button } from '@ccl/ui';

<Button onClick={async () => {
  await saveData();
}}>
  Save
</Button>
```

TypeScript sees the real source file in `packages/ui/src/Button.tsx`. Immediate type checking. No publishing. No version mismatches.

### How Turborepo Makes Builds Fast

```json
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    }
  }
}
```

Run `turbo build`:

1. **Analyzes dependency graph:** Portfolio depends on @ccl/ui
2. **Builds in order:** @ccl/ui first, then portfolio
3. **Caches outputs:** Hashes inputs (source files, deps, config), stores outputs in `.turbo/cache/`
4. **Skips unchanged packages:** If @ccl/ui hasn't changed, uses cached build (0.3s instead of 8.2s)

**Real numbers from my project:**
- First build: 62.4s (cold, everything compiles)
- Second build: 2.8s (95% cache hit)
- Changed Button.tsx only: 8.1s (rebuilds @ccl/ui + portfolio, skips web + cli)

That's 22x faster than before.

---

## The Migration

### What I Did (30 minutes total)

**1. Created monorepo structure** (5 min)

```bash
mkdir codecraft-labs
cd codecraft-labs
pnpm init
```

Created `pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**2. Moved existing repos** (10 min)

```bash
mkdir apps packages
mv ~/old-repos/portfolio apps/
mv ~/old-repos/web apps/
mv ~/old-repos/ui-library packages/ui
```

Updated each `package.json` to use `@ccl/` scope:
```json
// packages/ui/package.json
{
  "name": "@ccl/ui",
  "version": "1.0.0"
}
```

**3. Installed Turborepo** (2 min)

```bash
pnpm add -Dw turbo
```

Created minimal `turbo.json`:
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**4. Updated imports** (10 min)

Updated imports to use workspace packages:
```typescript
import { Button } from '@ccl/ui';
```

**5. Tested**

```bash
pnpm install
turbo build
turbo dev
```

Worked. First try.

(That never happens. I was suspicious.)

### The 3 Gotchas That Cost Me 4 Hours

**Gotcha #1: Peer dependency hell**

**Symptom:** `pnpm install` failed with peer dependency errors.

**Problem:** Portfolio had React 19, web app had React 18, ui-library allowed both.

**Fix:** Align all React versions:
```bash
pnpm add react@19.0.0 react-dom@19.0.0 -w
pnpm install
```

Took 90 minutes to figure out. The error message was unhelpful.

**Gotcha #2: TypeScript path mapping**

**Symptom:** TypeScript couldn't find `@ccl/ui` types.

**Problem:** Needed explicit path mapping in tsconfig.

**Fix:**
```json
// apps/portfolio/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@ccl/*": ["../../packages/*/src"]
    }
  }
}
```

Spent 45 minutes on this. Should've read the pnpm docs first.

**Gotcha #3: Cached build was stale**

**Symptom:** Changed Button.tsx, rebuild was instant, but changes didn't show up.

**Problem:** Turborepo cached old output, didn't detect file change (I had modified file outside of git).

**Fix:**
```bash
turbo build --force  # Bypass cache
```

Or clear cache:
```bash
rm -rf .turbo/cache
```

Lost 90 minutes debugging this. Thought my code was broken. It was just cache.

---

## What Changed

### Before Monorepo

```bash
# Update Button component workflow
cd ui-library
# Make changes
npm version patch
npm publish
cd ../portfolio
npm install @ccl/ui@latest
npm run build  # 5min 23s
git push
cd ../web
npm install @ccl/ui@latest
npm run build  # 4min 47s
git push

# Total: 15-20 minutes, 3 repos, 3 deploys
```

### After Monorepo

```bash
# Update Button component workflow
cd packages/ui
# Make changes
turbo build  # 2.8s (cached)
git commit -m "Update Button API"
git push

# Vercel deploys both apps automatically
# Total: <3 minutes, 1 repo, 1 commit
```

### The Numbers

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Build time** | 5min 23s | 2.8s | 22x faster |
| **Code duplication** | ~40% | 0% | Eliminated |
| **Repos to manage** | 3 | 1 | 66% less |
| **Time per update** | 15-20 min | <3 min | 85% faster |
| **Type safety** | Publish-to-test | Instant | Immediate |
| **CI/CD pipelines** | 3 | 1 | Simplified |

**Time saved:** ~2 hours daily (5-10 component updates × 15-20 min each → <3 min)

Rough ROI: If you value time at $50/hr, that's $100/day = $2,000/month in saved time.

But honestly? The real win is **not having to think about it anymore**. I change Button.tsx, TypeScript catches issues instantly, deploy once, done.

---

## When to Use Monorepo

**Use monorepo if:**
- You have 2+ projects sharing code
- You're copy-pasting components between repos
- You want type safety across packages
- You value fast iteration over independent deployment

**Don't use monorepo if:**
- Single app with no shared code (unnecessary overhead)
- Completely independent projects (no shared code = no benefit)
- You need different tech stacks per project (Go backend, Python ML, Node.js frontend—monorepo doesn't help much)

**My context:** Solo dev, 3 apps, heavy code sharing, deploying on Vercel. Monorepo was perfect.

**Your context might differ.** If you have 100+ packages or a team of 50+, look at Nx instead of Turborepo (more features, more complexity).

---

## Final Thoughts

**Would I do it again?** 100% yes.

**What surprised me:**
- Setup was way easier than expected (30 minutes, actually worked first try)
- Cache hit rate stayed high (95%+) even with active development
- TypeScript catching cross-package issues instantly is addictive
- Refactoring is fearless now (rename function, TS shows all usages across all packages)

**What I'd do differently:**
- Align all dependency versions *before* starting (would've saved 90 minutes)
- Read pnpm workspace docs first (would've saved 45 minutes on path mapping)

**Biggest surprise:** Adding a new app takes <5 minutes now. Copy structure, link packages, done. Planning to add 3 more apps in next 6 months—would've been a nightmare in multi-repo.

**Bottom line:** If you're managing 2+ projects that share code, monorepo in 2025 is a no-brainer.

---

## Resources

**Official Docs:**
- [Turborepo](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

**My Code:**
- [codecraft-labs on GitHub](https://github.com/saswatawork/codecraft-labs) - Full monorepo source
- [turbo.json](https://github.com/saswatawork/codecraft-labs/blob/main/turbo.json) - My config
- [Button component](https://github.com/saswatawork/codecraft-labs/blob/main/packages/ui/src/components/button/Button.tsx) - The infamous Button.tsx

**Community:**
- [Turborepo Discord](https://turbo.build/discord)

---

**Questions?** Drop a comment or hit me up:

**Twitter:** [@saswatapal14](https://twitter.com/saswatapal14)  
**LinkedIn:** [saswata-pal](https://linkedin.com/in/saswata-pal)  
**Dev.to:** [@saswatapal](https://dev.to/saswatapal)

More tech decision breakdowns coming—React 19, Tailwind v4, Vitest, Biome.

---

*Part of the [Tech Stack Decisions](https://dev.to/saswatawork/series) series*
