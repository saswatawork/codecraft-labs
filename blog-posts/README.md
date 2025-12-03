# Blog Posts Organization 📝

This directory contains all blog content organized by status and category.

## Directory Structure

```
blog-posts/
├── published/          # Ready-to-publish or already published posts
├── drafts/            # Work-in-progress blog posts
├── strategy/          # Blog strategy and planning documents
├── tech-decisions/    # Technology decision blog posts
└── README.md          # This file
```

---

## 📂 Folders Explained

### `/published/`
**Purpose:** Completed blog posts ready for publishing or already published  
**Naming Convention:** `##-descriptive-title.md` (e.g., `01-tailwind-v4-production-design-system.md`)  
**Status:** Final version, edited, ready for dev.to/Medium/LinkedIn

**Current Posts:**
- ✅ `01-tailwind-v4-production-design-system.md` - Week 1 post (2000+ words, ready to publish)

---

### `/drafts/`
**Purpose:** Work-in-progress blog posts, extended versions, or ideas  
**Naming Convention:** `descriptive-title.md` or `descriptive-title-EXTENDED.md`  
**Status:** Not ready for publishing, needs editing/completion

**Current Drafts:**
- 🚧 `tailwind-v4-production-design-system-EXTENDED.md` - Extended version with additional sections

---

### `/strategy/`
**Purpose:** Blog planning, content strategy, and roadmap documents  
**What goes here:**
- Content calendars
- Blog series outlines
- Publishing checklists
- Metrics tracking
- Topic brainstorming

**Move these files here:**
- `BLOG-CONTENT-STRATEGY.md` (from docs/planning)
- `BLOG-TOPICS-SUMMARY.md` (from docs/planning)
- `BLOG-CONTENT-ROADMAP-VISUAL.md` (from docs/planning)

---

### `/tech-decisions/`
**Purpose:** Technology stack decision blog posts ("Why X over Y" series)  
**Naming Convention:** `##-tech-vs-tech-decision.md` (e.g., `01-turborepo-vs-nx.md`)  
**Status:** Write as technologies are implemented

**Planned Posts (24 total):**
1. Turborepo vs Nx vs Lerna
2. pnpm vs npm vs Yarn vs Bun
3. Vite vs Webpack vs Turbopack
4. Biome vs ESLint+Prettier
5. Husky+Commitlint vs alternatives
6. TypeScript Strict Mode
7. React 19 RC vs React 18
8. Next.js 16 vs Remix vs Astro
9. Tailwind v4 vs v3 (can reference published post)
10. Radix UI vs Headless UI
11. CVA vs Stitches
12. Lucide vs Heroicons
13. Context vs Zustand vs Redux
14. Vitest vs Jest
15. Storybook 10 vs Ladle
16. TypeScript+Biome quality stack
17. VSCode setup & extensions
18. Terminal: Zsh+Starship
19. Changesets versioning
20. Commander CLI
21. NestJS vs Express (Week 3+)
22. Prisma vs TypeORM (Week 3+)
23. NextAuth vs Clerk (Week 4+)
24. Vercel+Railway deployment (Week 12+)

---

## 📋 Blog Series Overview

### Series 1: 90-Day Transformation Journey (12 posts)
**Location:** `/published/` and `/drafts/`  
**Naming:** `##-descriptive-title.md` (01-12)  
**Status:** Post 01 complete, 11 remaining  
**Timeline:** December 2025 - February 2026

**Posts:**
1. ✅ Tailwind v4 Production Design System (Week 1)
2. 📋 Docker Multi-Stage Builds (Week 2)
3. 📋 NestJS Backend Architecture (Week 3)
4. 📋 Prisma + PostgreSQL Setup (Week 4)
5. 📋 Redis Caching Strategy (Week 5)
6. 📋 BullMQ Job Queue (Week 6)
7. 📋 Vercel AI SDK Integration (Week 7)
8. 📋 OpenAI API Implementation (Week 8)
9. 📋 Vector Embeddings & RAG (Week 9)
10. 📋 AI Chat Interface (Week 10)
11. 📋 Security & Performance (Week 11)
12. 📋 Launch & Retrospective (Week 12)

### Series 2: Tech Stack Decisions (24 posts)
**Location:** `/tech-decisions/`  
**Naming:** `##-tech-vs-tech.md` (01-24)  
**Status:** Planning complete, write as implementing  
**Timeline:** Ongoing throughout 90 days

---

## ✍️ Writing Workflow

### For Transformation Journey Posts
1. **Draft** → Write in `/drafts/` as `WIP-week-#-topic.md`
2. **Edit** → Refine, add code examples, metrics
3. **Finalize** → Move to `/published/` with number prefix
4. **Publish** → Post to dev.to, Medium, LinkedIn
5. **Track** → Update metrics in strategy documents

### For Tech Decision Posts
1. **Research** → Document alternatives, pros/cons
2. **Draft** → Write in `/tech-decisions/` as `##-tech-vs-tech.md`
3. **Benchmark** → Add real performance metrics
4. **Publish** → Can publish immediately (no weekly schedule)
5. **Update** → Revise when tech versions change

---

## 📊 Publishing Checklist

Before moving a post to `/published/`:

- [ ] **Content Complete:** 2000+ words, all sections written
- [ ] **Code Examples:** Real code from your project
- [ ] **Metrics/Benchmarks:** Actual numbers, not estimates
- [ ] **SEO Optimized:** Title, description, tags chosen
- [ ] **Links Working:** All internal/external links verified
- [ ] **Images/Diagrams:** Added and optimized (if applicable)
- [ ] **Proofread:** Grammar, spelling, formatting checked
- [ ] **Front Matter:** Title, description, tags, series set
- [ ] **Call-to-Action:** Engagement prompt at end

---

## 🎯 Quick Actions

### Start a New Transformation Post
```bash
# Create draft for Week 2
touch blog-posts/drafts/WIP-week-2-docker-multi-stage.md
```

### Start a New Tech Decision Post
```bash
# Create tech decision post
touch blog-posts/tech-decisions/01-turborepo-vs-nx.md
```

### Move Draft to Published
```bash
# Once editing complete
mv blog-posts/drafts/WIP-week-2-docker.md blog-posts/published/02-docker-multi-stage-builds.md
```

### Check Blog Status
```bash
# List all blog files organized
tree blog-posts/
```

---

## 📈 Metrics Tracking

Track in `/strategy/` documents:
- **Views per post:** dev.to, Medium, LinkedIn
- **Engagement:** Reactions, comments, shares
- **Traffic sources:** Direct, search, social
- **Follower growth:** Weekly increase
- **SEO ranking:** Target keywords position

---

## 🔗 Related Documents

- `TECH-STACK-DECISION-BLOGS.md` - Tech decision blog planning (in docs/planning, consider moving to strategy/)
- `BLOG-CONTENT-STRATEGY.md` - Master content strategy (in docs/planning, consider moving to strategy/)
- `BLOG-TOPICS-SUMMARY.md` - Quick reference guide (in docs/planning, consider moving to strategy/)
- `BLOG-CONTENT-ROADMAP-VISUAL.md` - Visual timeline (in docs/planning, consider moving to strategy/)

---

## 🚀 Next Steps

1. **Move strategy docs** from `docs/planning/` to `blog-posts/strategy/`:
   ```bash
   mv docs/planning/BLOG-*.md blog-posts/strategy/
   mv docs/planning/TECH-STACK-DECISION-BLOGS.md blog-posts/strategy/
   ```

2. **Publish Week 1 post** - `01-tailwind-v4-production-design-system.md` to dev.to

3. **Start Week 2 draft** - Docker multi-stage builds

4. **Write first tech decision post** - "Turborepo vs Nx" (foundation is already built)

---

**Last Updated:** December 1, 2025  
**Maintained By:** Your Name  
**Blog Series Started:** Week 1 of 90-Day Transformation
