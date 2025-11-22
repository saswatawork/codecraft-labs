# @ccl/ui - CodeCraft Labs Component Library

> Enterprise-grade React component library built with TypeScript, Tailwind CSS v4, and Radix UI

## 🎨 Overview

A comprehensive design system featuring 50+ production-ready components with excellent TypeScript support, accessibility, and performance.

## ✨ Features

- 🧩 **50+ Components** - Buttons, Cards, Forms, Navigation, and more
- 🎯 **Compound Components** - Hero, Card with flexible composition patterns
- 🎨 **Design Token System** - Colors, spacing, typography, shadows, radius
- 📐 **Layout Primitives** - Section, Stack, Grid for consistent layouts
- 🔤 **Typography System** - Modular scale with perfect ratios
- 🎭 **20+ Variants** - Button, Badge with tone system (blue, purple, green, orange)
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📦 **Tree-shakeable** - Optimized bundle size (157 KB)
- 🧪 **Well-tested** - 355 tests with 95%+ coverage
- 📚 **Documented** - Comprehensive Storybook stories
- 🔒 **Type-safe** - 100% TypeScript with strict mode

## 📦 Installation

```bash
pnpm add @ccl/ui
```

## 🚀 Quick Start

```tsx
import { Button, Hero, Card, Section, Stack, Grid } from '@ccl/ui';
import '@ccl/ui/styles';

function App() {
  return (
    <Section spacing="2xl">
      <Hero variant="gradient-bold">
        <Hero.Badge>✨ New Feature</Hero.Badge>
        <Hero.Title>Build Beautiful Interfaces</Hero.Title>
        <Hero.Description>
          Production-ready components with excellent DX
        </Hero.Description>
        <Hero.Actions>
          <Button size="lg" variant="primary" tone="blue">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </Hero.Actions>
      </Hero>

      <Grid columns={3} gap="lg">
        <Card>
          <Card.Header>
            <Card.Title>Feature One</Card.Title>
            <Card.Description>Description here</Card.Description>
          </Card.Header>
          <Card.Content>Content goes here</Card.Content>
          <Card.Footer>
            <Button>Action</Button>
          </Card.Footer>
        </Card>
        {/* More cards... */}
      </Grid>
    </Section>
  );
}
```

## 🧩 Component Categories

### Core Components
- **Button** - 12 variants with tone system
- **Badge** - 9 variants with contextual colors
- **Input** - Form inputs with validation states
- **Avatar** - User avatars with fallbacks
- **Card** - Flexible content containers
- **Dialog** - Modal dialogs with Radix UI

### Layout Primitives
- **Section** - Page sections with consistent spacing
- **Stack** - Vertical/horizontal layouts with gap control
- **Grid** - CSS Grid with responsive columns
- **Container** - Content width containers

### Composition Components
- **Hero** - Hero sections with compound pattern
- **Navigation** - Responsive navigation bars
- **ProjectCard** - Featured project displays
- **SectionHeading** - Section headers with eyebrow

### Utilities
- **ErrorBoundary** - Error handling boundaries
- **Stat** - Metric displays with tone colors

## 🎨 Design Token System

### Colors
```tsx
// Semantic colors
colors.semantic.primary
colors.semantic.success
colors.semantic.warning
colors.semantic.danger

// Contextual tones
colors.tones.blue[500]
colors.tones.purple[500]
colors.tones.green[500]
colors.tones.orange[500]

// Gradients
colors.gradients.blue
colors.gradients.purple
```

### Spacing
```tsx
// 4px baseline scale
spacing.scale[1] // 4px
spacing.scale[2] // 8px
spacing.scale[4] // 16px
spacing.scale[8] // 32px

// Section spacing
spacing.section.sm // 3rem
spacing.section.md // 4rem
spacing.section.lg // 6rem
spacing.section.xl // 8rem
spacing.section['2xl'] // 10rem
```

### Typography
```tsx
// Modular scale (1.25 ratio)
typography.scale.xs
typography.scale.sm
typography.scale.base
typography.scale.lg
typography.scale.xl
typography.scale['2xl']
typography.scale['3xl']
typography.scale['4xl']
typography.scale['5xl']
typography.scale['6xl']
```

## 🎯 Component Patterns

### Compound Components
Components like Hero and Card support compound patterns for flexible composition:

```tsx
// Hero compound pattern
<Hero variant="gradient" spacing="xl">
  <Hero.Badge>Announcement</Hero.Badge>
  <Hero.Title>Main Heading</Hero.Title>
  <Hero.Description>Supporting text</Hero.Description>
  <Hero.Actions>
    <Button>CTA</Button>
  </Hero.Actions>
  <Hero.Stats>
    <Stat value="100+" label="Users" />
  </Hero.Stats>
</Hero>

// Card compound pattern
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

### Tone System
Buttons and Badges support contextual tones:

```tsx
<Button variant="primary" tone="blue">Blue Action</Button>
<Button variant="primary" tone="purple">Purple Action</Button>
<Button variant="primary" tone="green">Success</Button>
<Button variant="primary" tone="orange">Warning</Button>

<Badge variant="soft" tone="blue">Status</Badge>
<Badge variant="outline" tone="green">Active</Badge>
```

## 📐 Layout System

### Section Component
Consistent page section spacing:

```tsx
<Section spacing="2xl" width="wide">
  {/* Content */}
</Section>
```

**Spacing options:** `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`  
**Width options:** `full`, `contained`, `narrow`, `wide`, `ultra`

### Stack Component
Flexible vertical/horizontal layouts:

```tsx
<Stack direction="vertical" spacing="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

**Direction:** `vertical`, `horizontal`  
**Spacing:** `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`  
**Align:** `start`, `center`, `end`, `stretch`, `baseline`

### Grid Component
Responsive CSS Grid layouts:

```tsx
<Grid columns={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Columns:** `1`, `2`, `3`, `4`, `5`, `6`, `auto`, `auto-fill`  
**Gap:** `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

## 🧪 Testing

We maintain 95%+ test coverage with 355 comprehensive tests:

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:ui           # Interactive UI
pnpm test:coverage     # Coverage report
```

## 📚 Documentation

Explore all components in Storybook:

```bash
pnpm storybook
```

Visit: http://localhost:6006

## 🏗️ Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test

# Lint & format
pnpm lint
pnpm format
```

## 📊 Bundle Size

| Build | Size | Gzipped |
|-------|------|---------|
| ESM | 157.07 KB | 30.91 KB |
| CJS | 70.61 KB | 20.97 KB |

Optimized with tree-shaking support.

## 🎨 Storybook Stories

- **14 Hero Stories** - Various layouts and compositions
- **15+ Button Stories** - All variants and tones
- **12+ Badge Stories** - Color and variant combinations
- **10+ Card Stories** - Including compound pattern
- **8+ Section Stories** - Real-world usage
- **9+ Stack Stories** - Layout examples
- **10+ Grid Stories** - Responsive patterns

## 🔧 Tech Stack

- **React 19 RC** - Latest features
- **TypeScript 5.6** - Strict mode
- **Tailwind CSS v4** - Utility styling
- **Radix UI** - Accessible primitives
- **CVA** - Variant management
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Storybook 8** - Documentation

## 📝 License

MIT © CodeCraft Labs

## 🤝 Contributing

This is a showcase project. For inquiries:
- 📧 saswata.career@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/saswatapal)
- 🐱 [GitHub](https://github.com/saswatawork)

---

Built with ❤️ by Saswata Pal
