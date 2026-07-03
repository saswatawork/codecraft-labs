# CodeCraft Labs 🧪

A small monorepo hosting my personal portfolio site and its design system.

## What's In Here

```
codecraft-labs/
├── apps/
│   └── portfolio/           Personal portfolio (Next.js 16, React 19, Prisma, Sentry)
├── packages/
│   └── ui/                  Design system (@ccl/ui) — components, tests, Storybook
└── tools/
    └── typescript-config/   Shared TS configs
```

This repo previously carried a `youtube-studio` dashboard app, a duplicate `web`
portfolio prototype, and a `create-ccl-app` CLI scaffolder. All three were cut:
`youtube-studio`'s real counterpart is the production video pipeline at
`~/workspace/video-studio`, which this repo doesn't need to duplicate; `web` was
superseded by `apps/portfolio`; `create-app` was unused tooling unrelated to the
portfolio.

## Getting Started

```bash
pnpm install
pnpm prepare        # git hooks

pnpm dev             # start portfolio dev server
pnpm build           # build everything
pnpm test            # run tests
pnpm check           # biome format + lint
```

### Working on the portfolio
```bash
pnpm --filter portfolio dev
pnpm --filter @ccl/ui storybook
```

## Documentation

- [Complete documentation index →](./docs/README.md)
- [Design System Analysis](./docs/architecture/DESIGN_SYSTEM_ANALYSIS.md)
- [Portfolio Monitoring Guide](./apps/portfolio/MONITORING.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)

**Component library:** [Storybook deployed](https://ccl-ui.vercel.app)

## Contact

**Saswata Pal**
- Email: saswata.career@gmail.com
- LinkedIn: [linkedin.com/in/saswatapal](https://linkedin.com/in/saswatapal)
- GitHub: [github.com/saswatawork](https://github.com/saswatawork)
