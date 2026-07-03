# portfolio

My portfolio website built with CodeCraft Labs

## 🚀 Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Built With

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling with @source/@theme directives
- **@ccl/ui** - CodeCraft Labs component library (24 components, 468 tests)
- **MDX** - Markdown with JSX for content
- **Sentry** - Error tracking and performance monitoring
- **Vercel Analytics** - Web analytics and visitor tracking
- **Speed Insights** - Core Web Vitals monitoring

## 🎨 Features

- ✨ hero section
- ✨ about section
- ✨ projects section
- ✨ skills section
- ✨ contact section
- ✨ blog section

## 📝 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
├── public/              # Static assets
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory (see `.env.local.example`):

```env
# Sentry (Error Monitoring)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

See [MONITORING.md](./MONITORING.md) for complete setup instructions.

### Testing Monitoring

Visit `/sentry-test` to test error tracking integration.

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [CodeCraft Labs UI](https://github.com/yourusername/codecraft-labs)

## 📄 License

MIT
