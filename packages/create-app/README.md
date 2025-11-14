# @ccl/create-app

CLI tool for creating new CodeCraft Labs projects from templates.

## Usage

```bash
# Interactive mode
npx @ccl/create-app

# With project name
npx @ccl/create-app my-portfolio

# With options
npx @ccl/create-app my-portfolio --template portfolio --no-install
```

## Templates

- **Portfolio** - Personal or agency portfolio website (✅ Available)
- **SaaS Dashboard** - Project management application (🚧 Coming soon)
- **E-commerce** - Online store (🚧 Coming soon)
- **Documentation** - Component documentation site (🚧 Coming soon)

## Options

- `-t, --template <template>` - Template to use (portfolio, saas, ecommerce, docs)
- `--no-install` - Skip dependency installation
- `--no-git` - Skip git initialization

## Features

- 🎨 **Full Customization** - Choose theme, sections, auth provider, CMS
- 🚀 **Fast Setup** - Get started in minutes
- 📦 **Modern Stack** - Next.js 16, React 19, TypeScript, Tailwind CSS 4
- 🔐 **Authentication Ready** - NextAuth.js, Clerk, or Supabase
- 📝 **Content Management** - MDX, Contentful, or Sanity
- 📊 **Analytics** - Vercel Analytics integration
- ♿ **Accessible** - Built with CodeCraft Labs UI components

## Portfolio Template Options

- **Theme**: Auto, Light, Dark, or Custom
- **Sections**: Hero, About, Projects, Skills, Blog, Testimonials, Contact
- **Auth**: NextAuth.js (recommended), Clerk, Supabase, or None
- **CMS**: MDX (recommended), Contentful, Sanity, or None
- **Analytics**: Vercel Analytics (optional)
- **SEO**: Full SEO optimization setup (optional)

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run locally
node dist/index.js
```

## License

MIT
