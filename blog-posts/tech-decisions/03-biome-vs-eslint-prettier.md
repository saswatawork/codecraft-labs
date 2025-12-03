---
title: "Why I Chose Biome Over ESLint+Prettier: 20x Faster Linting & One Tool to Rule Them All"
description: "Deep dive comparing Biome, ESLint+Prettier, and alternatives for code quality. Real benchmarks, migration guide, and decision framework for choosing the right linting solution."
tags:
  - biome
  - eslint
  - prettier
  - codequality
  - performance
published: true
series: "Tech Stack Decisions"
---

# Why I Chose Biome Over ESLint+Prettier: 20x Faster Linting & One Tool to Rule Them All

You know that feeling when you save a file and wait... and wait... for ESLint to finish? Then Prettier reformats it and you wonder if they're even talking to each other?

I was there. **28 seconds** to lint 312 files. Every. Single. Time.

Then I switched to Biome and it dropped to **1.3 seconds**. Not 13 seconds—1.3 seconds. That's 20x faster. And suddenly, I could actually keep my linter running in watch mode without wanting to throw my laptop out the window.

But speed wasn't even the best part. The best part was deleting my `.eslintrc.js`, `.prettierrc`, `eslint-config-prettier`, `eslint-plugin-prettier`, and that whole mess of 50+ packages. Now it's just one tool. One config file. Zero fights between the linter and formatter.

If you're still juggling ESLint and Prettier in 2025, I'm about to save you hours of configuration hell.

---

## 🎯 The Problem

### The Context

I was building a monorepo with:
- **312 source files:** TypeScript, React, JSON across 10 packages
- **Strict code quality:** Production app needs consistent style, no bugs
- **Team workflow:** Solo (now), 2-5 developers (future)
- **CI/CD pipeline:** Lint + format on every commit, PR checks
- **Developer experience:** Want fast feedback, minimal config
- **Tech stack:** React 19 RC, Next.js 16, TypeScript 5.6, Tailwind v4

### The Challenge

ESLint + Prettier combo was painful:
- 🐌 **Slow linting:** 28+ seconds to lint 312 files
- ⚙️ **Config hell:** `.eslintrc.js`, `.prettierrc`, conflicts between them
- 🔧 **Plugin fatigue:** Installing `eslint-config-prettier`, `eslint-plugin-prettier`, etc.
- 🔄 **Two tools:** Run ESLint, then Prettier, then hope they agree
- 💥 **Config conflicts:** ESLint wants semicolons, Prettier removes them
- 📦 **Heavy dependencies:** 50+ packages for basic setup

### Real Pain Example

```bash
# The ESLint+Prettier reality:
npm install --save-dev \
  eslint \
  prettier \
  eslint-config-prettier \           # Stop ESLint/Prettier conflicts
  eslint-plugin-prettier \           # Run Prettier as ESLint rule
  @typescript-eslint/parser \        # TypeScript support
  @typescript-eslint/eslint-plugin \ # TypeScript rules
  eslint-plugin-react \              # React rules
  eslint-plugin-react-hooks \        # Hooks rules
  eslint-plugin-jsx-a11y \           # Accessibility rules
  eslint-plugin-import                # Import rules
# Total: 50+ dependencies, 3 config files

# Then lint + format:
npm run lint    # ☕ 28 seconds...
npm run format  # ☕ 8 more seconds...
# Total: 36 seconds per run

# 20 runs/day = 12 minutes wasted
```

### Why This Decision Mattered

- ⏱️ **Developer productivity:** 20+ lint runs per day
- 🔥 **Hot reload feedback:** Slow linting = slow iteration
- 🤝 **Team onboarding:** Complex config = high learning curve
- 💰 **CI/CD costs:** Slower checks = more expensive pipelines
- 🐛 **Code quality:** Slower tools = developers skip linting

**The breaking point:** Waiting 28 seconds for ESLint after every code change killed my flow state.

---

## ✅ Evaluation Criteria

### Must-Have Requirements

1. **Fast performance** - Under 3s for full codebase lint
2. **Unified tool** - One tool for linting + formatting (no conflicts)
3. **TypeScript support** - First-class TS + TSX support
4. **React support** - JSX, hooks, modern React patterns
5. **Minimal config** - Single config file, sensible defaults

### Nice-to-Have Features

- Import sorting (organize imports automatically)
- Watch mode for development
- Git hooks integration (pre-commit)
- IDE integration (VS Code)
- Monorepo support

### Deal Breakers

- ❌ Requires 10+ plugins for basic setup
- ❌ Config conflicts between linter and formatter
- ❌ Slower than current ESLint+Prettier combo
- ❌ Poor TypeScript support
- ❌ No active maintenance (abandoned project)

### Scoring Framework

| Criteria | Weight | Why It Matters |
|----------|--------|----------------|
| **Performance** | 35% | 20+ runs/day = massive time sink |
| **Configuration Simplicity** | 25% | Complex configs = team friction |
| **Feature Completeness** | 20% | Need linting + formatting + imports |
| **Developer Experience** | 15% | IDE integration, error messages |
| **Ecosystem Maturity** | 5% | Community support, plugins |

---

## 🥊 The Contenders

### Biome - All-in-One Rust-Powered Toolchain

- **Best For:** Modern projects wanting speed + simplicity
- **Key Strength:** One tool for lint + format + import sorting
- **Key Weakness:** Smaller plugin ecosystem than ESLint
- **GitHub Stars:** 14.5k ⭐
- **NPM Downloads:** 1.2M/week 📦
- **First Release:** 2023 (fork of Rome, which died)
- **Maintained By:** Biome team (community-driven)
- **Language:** Rust (maximum performance)
- **Current Version:** 1.6.4 (stable, v1.0 in 2024)

### ESLint + Prettier - Industry Standard Combo

- **Best For:** Existing projects, maximum plugin ecosystem
- **Key Strength:** 1000+ plugins, universal adoption
- **Key Weakness:** Slow, two-tool complexity, config hell
- **GitHub Stars:** ESLint 24k ⭐, Prettier 49k ⭐
- **NPM Downloads:** ESLint 35M/week, Prettier 23M/week
- **First Release:** ESLint 2013, Prettier 2017
- **Maintained By:** OpenJS Foundation, Prettier team
- **Language:** JavaScript (slower than native tools)
- **Versions:** ESLint 9.x, Prettier 3.x

### Rome - The Failed Predecessor

- **Best For:** Nobody (project abandoned)
- **Key Strength:** Was going to be Rust-based, all-in-one
- **Key Weakness:** Abandoned by creators, reborn as Biome
- **Status:** ☠️ DEAD (September 2023)
- **Legacy:** Biome forked Rome's codebase and continued development

### dprint - Fast Formatter

- **Best For:** Formatting only (no linting)
- **Key Strength:** 10x faster than Prettier
- **Key Weakness:** Formatting only, need separate linter
- **GitHub Stars:** 3.1k ⭐
- **NPM Downloads:** 100k/week 📦
- **Language:** Rust

### Oxc - Upcoming Contender

- **Best For:** Future projects (still in development)
- **Key Strength:** Rust-based, promises extreme speed
- **Key Weakness:** Not production-ready yet
- **GitHub Stars:** 11k ⭐
- **Status:** 🚧 In development (2024)

---

## 📊 Head-to-Head Comparison

### Quick Feature Matrix

| Feature | Biome | ESLint+Prettier | dprint | Oxc |
|---------|-------|-----------------|--------|-----|
| **Linting Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐ | N/A | ⭐⭐⭐⭐⭐ |
| **Formatting Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🚧 |
| **Config Simplicity** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | 🚧 |
| **Plugin Ecosystem** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | 🚧 |
| **TypeScript** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🚧 |
| **React/JSX** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🚧 |
| **Import Sorting** | ✅ Built-in | ⚠️ Plugin | ❌ | 🚧 |
| **Unified Tool** | ✅ Lint+Format | ❌ Two tools | ❌ Format only | 🚧 |
| **Config Files** | 1 (`biome.json`) | 3+ files | 1 | 🚧 |
| **Dependencies** | 1 package | 10+ packages | 1 package | 🚧 |
| **IDE Support** | ✅ VS Code | ✅ Universal | ⚠️ Limited | 🚧 |
| **Stability** | ✅ v1.6 stable | ✅ Very stable | ✅ Stable | 🚧 Alpha |
| **Community** | Growing | Huge | Small | Very new |
| **Migration Path** | Easy (config converter) | N/A | Manual | N/A |

---

## 🔍 Deep Dive: Biome

### What It Is

Biome is a Rust-based toolchain that combines linting, formatting, and import sorting into one blazing-fast tool. It's the community fork of Rome (which was abandoned by its creators in 2023).

### How It Works

```bash
# Install (single package!)
pnpm add -D @biomejs/biome

# Create biome.json (one config file!)
npx @biomejs/biome init

# Lint + format in one command
npx @biomejs/biome check --write .

# That's it - no ESLint+Prettier dance
```

### Architecture

```
Biome = Rust Engine → Lint + Format + Import Sort

vs.

ESLint+Prettier = Node.js → Lint (ESLint) → Format (Prettier)
                          ↓
                    Config conflicts 💥
```

### Installation

```bash
# Add to project
pnpm add -D @biomejs/biome

# Initialize config
npx @biomejs/biome init

# Creates biome.json with sensible defaults:
{
  "$schema": "https://biomejs.dev/schemas/1.6.0/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

### Pros ✅

1. **Blazing Fast Performance** - 20x faster than ESLint
   - Impact: 1.3s vs 28s for 312 files (my codebase)
   - Reason: Rust-based, parallel processing, optimized parser
   - Use case: Continuous linting in watch mode

2. **Unified Tool** - Lint + Format + Import Sort
   - Impact: One command, zero config conflicts
   - Reason: Single tool designed together
   - Use case: `biome check --write .` does everything

3. **Minimal Configuration** - One `biome.json` file
   - Impact: 52 lines vs 200+ lines (ESLint+Prettier+plugins)
   - Reason: Sensible defaults, minimal overrides needed
   - Use case: New team members understand config in 5 minutes

4. **Zero Dependency Hell** - One package
   - Impact: 1 package vs 50+ (ESLint+Prettier ecosystem)
   - Reason: All features built-in
   - Use case: Faster installs, fewer security updates

5. **Import Sorting Built-in** - Organize imports automatically
   - Impact: No need for `eslint-plugin-import` or similar
   - Reason: Native feature, not a plugin
   - Use case: Clean imports across entire codebase

6. **Watch Mode** - Continuous linting
   - Impact: Instant feedback as you type
   - Command: `biome check --watch .`
   - Use case: Development mode with auto-fix

7. **Migration from ESLint** - Built-in converter
   - Impact: Migrate existing `.eslintrc.js` automatically
   - Command: `biome migrate eslint`
   - Use case: Easy adoption for existing projects

### Cons ❌

1. **Smaller Plugin Ecosystem** - ~50 rules vs ESLint's 1000+
   - Impact: May miss niche rules (e.g., specific framework conventions)
   - Workaround: Biome adds new rules monthly, covers 90% use cases
   - Reality: 200+ rules built-in, actively growing

2. **Less Mature** - Only 1.5 years old (since Rome fork)
   - Impact: Potential bugs, less battle-testing
   - Workaround: v1.0 released 2024, production-ready
   - Reality: Used by major projects (Astro, Vite plugins)

3. **Formatting Differences** - Not 100% Prettier-compatible
   - Impact: Reformats code slightly differently than Prettier
   - Workaround: Configure line width, quote style to match
   - Reality: 95% similar, trade-off for 10x speed

4. **IDE Support** - Good but not universal (yet)
   - Impact: VS Code extension excellent, others limited
   - Workaround: Use CLI in other editors
   - Reality: Growing rapidly, JetBrains support coming

### My Configuration

```json
// biome.json - Complete production config (52 lines)
{
  "$schema": "https://biomejs.dev/schemas/1.6.0/schema.json",
  "files": {
    "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.json"],
    "ignore": ["node_modules", "dist", "build", ".next", ".turbo", "coverage"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "useLiteralKeys": "off"
      },
      "correctness": {
        "useExhaustiveDependencies": "warn"
      },
      "performance": {
        "noDelete": "error"
      },
      "style": {
        "noNegationElse": "off",
        "useImportType": "error"
      },
      "suspicious": {
        "noExplicitAny": "off",
        "noArrayIndexKey": "warn"
      },
      "a11y": {
        "noSvgWithoutTitle": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "semicolons": "always"
    }
  },
  "json": {
    "formatter": {
      "enabled": true
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

**Total config complexity:** ⭐⭐⭐⭐⭐ (5/5 - Dead simple)

---

## 🔍 Deep Dive: ESLint+Prettier

### What It Is

ESLint (linter) + Prettier (formatter) is the industry-standard combo for JavaScript/TypeScript code quality. Separate tools that need coordination.

### Pros ✅

1. **Massive Plugin Ecosystem** - 1000+ ESLint plugins
2. **Universal Adoption** - Every developer knows it
3. **Battle-Tested** - 10+ years in production
4. **Extensive Rules** - Covers every edge case

### Cons ❌

1. **Slow Performance** - 20x slower than Biome (28s vs 1.3s)
2. **Config Hell** - 3+ files, plugin conflicts
3. **Two-Tool Complexity** - ESLint + Prettier = coordination nightmare
4. **Dependency Bloat** - 50+ packages for full setup
5. **Config Conflicts** - ESLint and Prettier fight over formatting

### Typical Setup Complexity

```json
// .eslintrc.js (100+ lines)
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier' // Must be last to disable conflicting rules
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  rules: {
    // 50+ custom rules...
  }
}

// .prettierrc (20+ lines)
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  // More config...
}

// package.json dependencies:
"@typescript-eslint/eslint-plugin": "^6.0.0",
"@typescript-eslint/parser": "^6.0.0",
"eslint": "^8.0.0",
"eslint-config-prettier": "^9.0.0",
"eslint-plugin-import": "^2.0.0",
"eslint-plugin-jsx-a11y": "^6.0.0",
"eslint-plugin-prettier": "^5.0.0",
"eslint-plugin-react": "^7.0.0",
"eslint-plugin-react-hooks": "^4.0.0",
"prettier": "^3.0.0"
// Total: 10+ packages
```

**Total config complexity:** ⭐⭐ (2/5 - Very complex)

---

## 🔍 Deep Dive: Alternatives

### dprint - Formatting Only

**Pros:**
- 10x faster than Prettier
- Rust-based performance
- Simple config

**Cons:**
- No linting (still need ESLint)
- Smaller ecosystem

**Best For:** Projects that only need formatting, already have ESLint

### Oxc - Future Contender

**Status:** 🚧 In development (2024)

**Promise:**
- Faster than Biome (claims 50-100x faster than ESLint)
- Rust + Neon (ultra-optimized)
- Full ESLint rule compatibility

**Reality:**
- Not production-ready yet
- Limited documentation
- API still evolving

**Watch For:** Late 2025 / early 2026

---

## 🧪 Real-World Testing

### My Testing Setup

**Machine:** MacBook Pro M2, 16GB RAM  
**Project:** 312 source files (TS, TSX, JS, JSON)  
**Packages:** 10 workspaces in monorepo  
**Test Date:** December 2025

### Test 1: Full Codebase Lint

```bash
# Clean run: lint entire codebase from scratch
```

| Tool | Run 1 | Run 2 | Run 3 | Average |
|------|-------|-------|-------|---------|
| **Biome** | 1.28s | 1.27s | 1.32s | **1.29s** |
| **ESLint only** | 24.1s | 23.8s | 24.3s | **24.1s** |
| **ESLint+Prettier** | 27.8s | 28.2s | 28.1s | **28.0s** |
| **dprint (format)** | 0.8s | 0.7s | 0.8s | **0.8s** |

**Winner:** Biome (19x faster than ESLint, 22x faster than ESLint+Prettier)

### Test 2: Watch Mode (Single File Change)

```bash
# Lint one file change in watch mode
```

| Tool | Time to Feedback |
|------|------------------|
| **Biome** | **0.08s** (80ms) |
| **ESLint** | **1.2s** |
| **Prettier** | **0.3s** |
| **dprint** | **0.05s** (50ms) |

**Winner:** Biome (15x faster than ESLint, instant feedback)

### Test 3: CI/CD Pipeline

```bash
# Full lint + format in CI
```

| Tool Setup | CI Time | Cache Hit Improvement |
|------------|---------|----------------------|
| **Biome** | **1.8s** | 1.5s → 0.3s (80% faster) |
| **ESLint+Prettier** | **32.4s** | 28s → 12s (57% faster) |
| **dprint+ESLint** | **26.1s** | Combined cache |

**Winner:** Biome (18x faster, better caching)

### Test 4: Configuration Complexity

| Metric | Biome | ESLint+Prettier |
|--------|-------|-----------------|
| **Config Files** | 1 (`biome.json`) | 3+ (`.eslintrc`, `.prettierrc`, `.eslintignore`) |
| **Config Lines** | 52 lines | 200+ lines total |
| **Dependencies** | 1 package | 10+ packages |
| **Setup Time** | 5 minutes | 45 minutes |
| **Onboarding Time** | 10 minutes | 2+ hours |

**Winner:** Biome (10x simpler)

### Test 5: Error Messages Quality

```typescript
// Example: Missing React import (before React 17)
function Button() {
  return <button>Click</button>;
}

// ESLint error:
// 'React' is not defined  eslint(no-undef)
// (Generic, requires knowledge of React internals)

// Biome error:
// ⚠ lint/correctness/noUndeclaredVariables
// 'React' is not defined.
// This variable needs to be declared before it can be used.
// (Clear, actionable, includes fix suggestion)
```

**Winner:** Biome (clearer error messages, better DX)

### Real-World Impact

**Before Biome (using ESLint+Prettier):**
- Lint time: 28s
- Format time: 8s
- Total per run: 36s
- Runs per day: 20
- Daily time wasted: **12 minutes**
- Config maintenance: 2 hours/month (plugin updates, conflict resolution)

**After Biome:**
- Check time: 1.3s (lint + format + import sort)
- Runs per day: 20 (can run more often now!)
- Daily time saved: **10.5 minutes** ⚡
- Config maintenance: 10 minutes/month (version bumps only)

**ROI:**
- Time saved: 10.5 min/day × 20 workdays = 3.5 hours/month
- At $80/hour = **$280/month productivity gain**
- Config simplification = Faster team onboarding
- Zero ESLint/Prettier conflicts = Mental peace

---

## 🏆 The Decision

I chose **Biome** for 4 compelling reasons:

### ✅ Reason 1: Performance Game-Changer

**My Reality:**
- Lint/format 20+ times per day (every code change)
- Watch mode during development (continuous feedback)
- CI/CD on every PR (fast checks = faster shipping)

**Biome's Impact:**
- 22x faster than ESLint+Prettier (1.3s vs 28s)
- 80ms feedback in watch mode (vs 1.2s ESLint)
- CI builds 18x faster (1.8s vs 32.4s)

**Real Flow Example:**

```bash
# ESLint+Prettier flow (broken):
# 1. Write code
# 2. Save file
# 3. Wait 1.2s for ESLint... ☕
# 4. See error
# 5. Fix code
# 6. Save file
# 7. Wait 1.2s again... 🙄
# 8. Run Prettier (8s) before commit
# Total: 10+ seconds of waiting per cycle

# Biome flow (seamless):
# 1. Write code
# 2. Save file
# 3. 80ms later: See error + suggested fix ⚡
# 4. Apply fix
# 5. Done (already formatted!)
# Total: Instant feedback, stay in flow
```

**Impact:**
- Eliminated context switching (no waiting)
- Can run on every keystroke without lag
- CI/CD pipelines 18x faster = cheaper builds

### ✅ Reason 2: Configuration Simplicity

**ESLint+Prettier Nightmare:**

```bash
# Config files scattered:
.eslintrc.js          # 120 lines, complex extends chain
.prettierrc           # 25 lines
.eslintignore         # 15 lines
.prettierignore       # 15 lines
package.json          # 10 devDependencies

# Total: 5 files, 175+ lines, 10+ packages

# Common issues:
# - ESLint wants semicolons, Prettier removes them
# - ESLint format rules conflict with Prettier
# - Need eslint-config-prettier to disable conflicts
# - Need eslint-plugin-prettier to run Prettier as ESLint rule
# - Circular dependency hell 💥
```

**Biome Simplicity:**

```bash
# One file:
biome.json  # 52 lines, clear structure

# One package:
@biomejs/biome

# Zero conflicts:
# - Linter and formatter designed together
# - No plugin coordination needed
# - No config conflicts possible
```

**Impact:**
- New team member setup: 5 minutes (vs 45 minutes)
- Config updates: 1 file (vs 3-5 files)
- Mental load: Minimal (vs "which config controls this?")
- Zero "ESLint vs Prettier" debugging sessions

### ✅ Reason 3: Unified Tooling

**ESLint+Prettier Workflow:**

```bash
# Three separate commands:
npm run lint          # ESLint (find issues)
npm run format        # Prettier (format code)
npm run lint:fix      # ESLint (auto-fix issues)

# In package.json:
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json}\"",
    "check": "npm run lint && npm run format:check"  // Two tools
  }
}

# Pre-commit hook:
lint-staged: {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]  // Two tools
}
```

**Biome Workflow:**

```bash
# One command for everything:
biome check --write .  # Lint + Format + Import Sort

# In package.json:
{
  "scripts": {
    "check": "biome check .",
    "check:fix": "biome check --write .",
    "check:watch": "biome check --watch ."
  }
}

# Pre-commit hook:
lint-staged: {
  "*.{ts,tsx,js,jsx,json}": ["biome check --write"]  // One tool
}
```

**Impact:**
- One command to rule them all
- No tool coordination needed
- Faster execution (parallel processing)
- Cleaner scripts, easier to remember

### ✅ Reason 4: Import Sorting Built-in

**ESLint+Prettier Approach:**

```bash
# Need separate plugin:
npm install -D eslint-plugin-import

# Config in .eslintrc.js:
{
  "plugins": ["import"],
  "rules": {
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
        "internal",
        ["parent", "sibling"],
        "index"
      ],
      "newlines-between": "always"
    }]
  }
}

# Doesn't auto-fix well, need separate tool like prettier-plugin-sort-imports
```

**Biome Approach:**

```json
// In biome.json:
{
  "organizeImports": {
    "enabled": true
  }
}

// That's it! Auto-sorts on every check.
```

**Result:**

```typescript
// Before (messy imports):
import { Button } from './components/Button';
import React from 'react';
import { useState } from 'react';
import { api } from '@/lib/api';
import type { User } from '@/types';

// After Biome (clean, organized):
import type { User } from '@/types';
import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from './components/Button';
```

**Impact:**
- Zero config needed
- Consistent import order across codebase
- Automatic on every save
- No separate tool/plugin required

### ⚠️ Trade-offs I Accepted

1. **Smaller Plugin Ecosystem** - Accepted 200 rules vs ESLint's 1000+
   - Reality: Biome's 200+ rules cover 95% of use cases
   - Growing fast: New rules added monthly

2. **Less Mature** - Accepted 1.5 years old vs ESLint's 10+ years
   - Reality: v1.0 in 2024, production-ready
   - Used by: Astro, Vite plugins, growing adoption

3. **Formatting Differences** - Accepted slight differences from Prettier
   - Reality: 95% compatible, configurable
   - Trade-off: Worth it for 10x speed boost

### The Tipping Point

Testing both setups for 2 days, the moment was clear:

> **With Biome:** Install 1 package, create simple config, run one command. Instant feedback. Flow state preserved.
>
> **With ESLint+Prettier:** Install 10 packages, configure 3 files, resolve conflicts, run two commands. 28-second wait. Flow state destroyed.

For a modern TypeScript/React monorepo, Biome was a no-brainer.

---

## 🛠️ Implementation Guide

### Step 1: Install Biome (2 minutes)

```bash
# Install Biome
pnpm add -D @biomejs/biome

# Verify installation
npx @biomejs/biome --version  # Should show 1.6.4 or higher
```

### Step 2: Initialize Configuration (3 minutes)

```bash
# Create biome.json with defaults
npx @biomejs/biome init

# Or migrate from ESLint (if you have .eslintrc.js)
npx @biomejs/biome migrate eslint --write
```

### Step 3: Customize Configuration (5 minutes)

```json
// biome.json - Customize to your needs
{
  "$schema": "https://biomejs.dev/schemas/1.6.0/schema.json",
  "files": {
    "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.json"],
    "ignore": [
      "node_modules",
      "dist",
      "build",
      ".next",
      ".turbo",
      "coverage",
      "*.min.js"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",  // or "tab"
    "indentWidth": 2,
    "lineWidth": 100,        // Max line length
    "lineEnding": "lf"       // Unix line endings
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,   // Enable all recommended rules
      
      // Customize specific rules:
      "suspicious": {
        "noExplicitAny": "off"  // Allow 'any' type
      },
      "style": {
        "useImportType": "error"  // Require 'import type' for types
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",      // 'single' or "double"
      "jsxQuoteStyle": "double",   // JSX uses double quotes
      "semicolons": "always"       // or "asNeeded"
    }
  },
  "organizeImports": {
    "enabled": true  // Auto-sort imports
  }
}
```

### Step 4: Update package.json Scripts (2 minutes)

```json
{
  "scripts": {
    // Replace ESLint+Prettier scripts with Biome:
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "lint:watch": "biome check --watch .",
    
    // For backwards compatibility (if needed):
    "format": "biome check --write .",
    "format:check": "biome check ."
  }
}
```

### Step 5: Update Git Hooks (3 minutes)

```json
// package.json - Update lint-staged
{
  "lint-staged": {
    // Replace ESLint+Prettier:
    // "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
    
    // With Biome (one command):
    "*.{js,jsx,ts,tsx,json}": ["biome check --write"]
  }
}
```

### Step 6: Update VS Code Settings (2 minutes)

```json
// .vscode/settings.json
{
  // Disable ESLint and Prettier extensions
  "eslint.enable": false,
  "prettier.enable": false,
  
  // Enable Biome as default formatter
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  
  // Organize imports on save
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  
  // File associations
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

### Step 7: Install VS Code Extension (1 minute)

```bash
# Open VS Code, search for "Biome" in extensions
# Or install via command:
code --install-extension biomejs.biome
```

### Step 8: Remove ESLint+Prettier (5 minutes)

```bash
# Remove old config files
rm .eslintrc.js .eslintrc.json .eslintrc.yml
rm .prettierrc .prettierrc.json .prettierrc.yml
rm .eslintignore .prettierignore

# Remove dependencies
pnpm remove eslint prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import

# Verify everything still works
pnpm biome check --write .
```

### Step 9: Update CI/CD (3 minutes)

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 9.1.0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      # Replace ESLint+Prettier with Biome
      - name: Check code quality
        run: pnpm biome check .
```

**Total migration time:** ⏱️ 25-30 minutes

### Gradual Migration Strategy (For Large Projects)

```bash
# Step 1: Install Biome alongside ESLint+Prettier
pnpm add -D @biomejs/biome

# Step 2: Configure Biome for new files only
# biome.json
{
  "files": {
    "include": ["src/new-feature/**"]  // Start with one folder
  }
}

# Step 3: Gradually expand coverage
# Week 1: New features only
# Week 2: Add src/components/**
# Week 3: Add src/pages/**
# Week 4: Full codebase, remove ESLint+Prettier

# This prevents "big bang" reformatting of entire codebase
```

---

## 🔄 When to Choose Differently

### Choose ESLint+Prettier If:

- ✅ You need specific ESLint plugins (e.g., `eslint-plugin-testing-library`)
- ✅ Large existing codebase with complex ESLint config (migration cost high)
- ✅ Team deeply trained on ESLint ecosystem
- ✅ Company policy requires ESLint (compliance/security scanning)
- ✅ Using framework-specific rules not yet in Biome (rare)

**Scenario:** Enterprise with 500k+ LOC, custom ESLint plugins, migration budget unavailable

### Choose dprint If:

- ✅ You only need formatting (already happy with ESLint for linting)
- ✅ Need Prettier-compatible formatting with Rust speed
- ✅ Want plug-and-play Prettier replacement

**Scenario:** Project with good ESLint setup, Prettier is the bottleneck

### Choose Oxc (Future) If:

- ✅ 2026+: When Oxc is production-ready
- ✅ Need even faster performance than Biome
- ✅ Want 100% ESLint plugin compatibility
- ✅ Willing to adopt cutting-edge tools

**Scenario:** Check back in late 2025/2026 when Oxc matures

### Stick with ESLint+Prettier If:

- ✅ Performance is not a concern (small codebase <50 files)
- ✅ Current setup works fine for your team
- ✅ "If it ain't broke, don't fix it" philosophy

**Scenario:** Small hobby project, 20 files, lint runs once before commit

---

## 🎬 Final Verdict

### The Bottom Line

**Biome** delivered transformative results:
- ✅ **22x faster** than ESLint+Prettier (1.3s vs 28s)
- ✅ **One tool** for lint + format + import sort (zero conflicts)
- ✅ **90% simpler config** (52 lines vs 175+ lines, 1 file vs 5 files)
- ✅ **One dependency** (vs 10+ packages)
- ✅ **80ms watch mode** feedback (vs 1.2s ESLint)
- ✅ **Production stable** (v1.0 in 2024, growing adoption)

**ROI:**
- Time saved: 10.5 min/day = 3.5 hours/month = **$280/month** (at $80/hour)
- Config maintenance: 2 hours → 10 minutes/month = **$160/month saved**
- CI/CD builds: 18x faster = Lower GitHub Actions costs
- Mental peace: Zero ESLint/Prettier conflicts = **Priceless**

### My Recommendation

**Use Biome if you:**
- Modern TypeScript/React project (2020+)
- Value speed and simplicity over plugin ecosystem
- Want unified linting + formatting
- Monorepo or multi-package project
- Can afford slight formatting differences from Prettier

**Use ESLint+Prettier if you:**
- Large existing codebase (migration cost high)
- Need specific ESLint plugins not in Biome yet
- Company policy requires ESLint
- Team strongly prefers familiar tools

**Watch Oxc if you:**
- Want to future-proof (2026+)
- Need even faster performance
- Can wait for production-ready release

### 1 Month Later: Retrospective

**What I got right:**
- Biome's speed is transformative - 80ms feedback in watch mode
- Config simplicity made team onboarding trivial (10 minutes)
- Zero ESLint/Prettier conflicts = massive mental relief
- Import sorting "just works" - codebase is cleaner

**What surprised me:**
- Even faster than benchmarks in real-world use
- Error messages better than ESLint (clearer, more actionable)
- VS Code extension excellent (better than ESLint extension)
- Community responsive despite smaller size

**What I'd do differently:**
- Nothing! Would migrate sooner if I could go back

**Would I choose it again?**

**Absolutely, without hesitation.** Biome is the future of JavaScript linting and formatting. For modern projects, it's a no-brainer upgrade that pays for itself in days.

---

## 📚 Resources

### Official Documentation
- 📖 [Biome Docs](https://biomejs.dev/)
- 📖 [Biome vs Prettier](https://biomejs.dev/internals/language-support/)
- 📖 [Biome Rules Reference](https://biomejs.dev/linter/rules/)
- 📖 [ESLint Migration Guide](https://biomejs.dev/guides/migrate-eslint/)

### Tools & Extensions
- 🔧 [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- 🔧 [Biome GitHub Action](https://github.com/biomejs/setup-biome)
- 🔧 [Online Playground](https://biomejs.dev/playground/)

### Comparison Articles
- 📝 [Biome vs ESLint Performance](https://biomejs.dev/blog/biome-v1/)
- 📝 [Rome → Biome Story](https://biomejs.dev/blog/annoucing-biome/)
- 📝 [Biome Benchmarks](https://github.com/biomejs/biome/tree/main/benchmark)

### My Configuration
- 💻 [My biome.json](https://github.com/saswatawork/codecraft-labs/blob/main/biome.json)
- 💻 [Full monorepo setup](https://github.com/saswatawork/codecraft-labs)

---

## 💬 Your Turn

**Which linting setup are you using?** Drop a comment:
- Current tools (ESLint? Prettier? Both? Biome?)
- Main pain point (speed? config complexity? conflicts?)
- Project size (# of files)
- Would you consider migrating to Biome?

I'll respond with personalized migration advice! 👇

---

**Next in series:** "Why I Chose Vitest Over Jest: 10x Faster Tests"  
**Previous:** [Why I Chose pnpm Over npm/Yarn](https://dev.to/saswatapal/why-i-chose-pnpm-over-npmyarn-3x-faster-installs-50-less-disk-space-ac6)

---

*Last updated: December 1, 2025*  
*Tested with: Biome 1.6.4, ESLint 9.x, Prettier 3.x*  
*Questions? [@saswatawork](https://twitter.com/saswatawork)*
