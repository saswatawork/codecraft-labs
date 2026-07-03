# Blog Strategy — Tech Decision Series

Consolidated from 6 overlapping planning docs (July 2026 cleanup). The prior
docs organized content around a 12-week NestJS/Prisma/AI-chatbot roadmap that
was never built and is no longer the plan — that framing is dropped here.
Anything AI/RAG-related for the blog is now covered by the separate job-search
roadmap (`personal-os/apps/job_search/roadmap.md`), not this repo.

## Status

**Drafted, not yet published anywhere** (dev.to/Medium/Hashnode all still
"coming soon" — `scripts/blog-automation` has the Hashnode publishing tooling
ready to use):

1. Tailwind v4 — Production Design System *(in `blog-posts/published/`,
   actually publish-ready; rest are in `blog-posts/tech-decisions/`)*
2. Turborepo vs Nx — Monorepo
3. pnpm vs npm/yarn/bun — Package Manager
4. Biome vs ESLint/Prettier — Linting
5. Vitest vs Jest — Testing
6. React 19 vs React 18 — Framework
7. React Context vs Zustand/Jotai/Redux — State
8. Storybook vs Ladle/Histoire — Component Dev
9. Vite vs Webpack/esbuild/Rollup — Bundler
10. Next.js 16 vs Remix/Astro — Meta-framework
11. Why Monorepo Architecture — Foundation

**Still-relevant future topics** (tooling/frontend, matches the stack that's
actually here):
- Radix UI vs Headless UI vs shadcn/ui
- CVA vs Tailwind Variants vs Stitches
- Husky + Commitlint vs Lefthook
- Changesets vs Semantic Release
- VSCode/Cursor setup for React development

Dropped from the old list: NestJS vs Express, Prisma vs TypeORM, Vercel AI SDK,
OpenAI API — all tied to the abandoned backend/AI plan.

## Voice — Write Like a Person, Not a Template

**Mission:** tell the story of a real technical decision — why it mattered,
what you tried, what worked, what didn't. ~3,500–4,000 words, story-first,
sections can flow out of rigid order.

**Do:**
- Developer language over corporate jargon ("this sucked," not "suboptimal
  situation")
- Actual specifics ("hit this bug at 2am, Stack Overflow had the same
  unanswered question") over hypotheticals
- Real debugging stories — what you tried, what failed, what fixed it
- Opinions, stated plainly ("if you're using Lerna in 2025, you're stuck in
  2018")
- Varied paragraph length — don't let every section follow the same shape
- Rough, honest numbers ("saves ~2 hours/week, maybe $20K/year at $50/hr") —
  not consultant-style ROI tables
- 3–4 emojis total for the whole post, not one per heading

**Don't:**
- Claim migrations were smoother than they were
- Write "let me show you" / "here's what really transformed" transitions —
  just start the section
- Pad with a "hypothetical real example" instead of what actually happened

## Structure Reference

```
[Title]
The Problem              — your actual context, why this decision mattered
The Contenders            — 3-5 real alternatives you considered
Evaluation Criteria        — what you needed, in your own words
Deep Dive: [Alternative]    — repeat per contender, what it is / how it works / pros / cons
The Decision               — what you picked and why
Real-World Implementation  — actual code from this repo, not hypothetical
Benchmarks & Metrics        — rough real numbers
When to Choose Differently  — honest caveats
Migration Path              — the messy parts, not the sanitized version
Lessons Learned
Conclusion
Resources
```

## Publishing

`scripts/blog-automation/` has working Hashnode publishing tooling (see its
own README). Dev.to has a 10-mention limit per post — the automation already
sanitizes package-name mentions (`@ccl/ui` → zero-width-space escaped) so this
needs no manual handling.
