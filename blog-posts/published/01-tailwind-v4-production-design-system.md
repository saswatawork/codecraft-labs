---
title: "Building a Production Design System with Tailwind CSS v4"
description: "A deep dive into migrating to Tailwind CSS v4's bleeding-edge features, building a component library with 468 passing tests, and achieving 48% faster builds."
tags:
  - tailwindcss
  - webdev
  - react
  - designsystems
published: true
series: "Design System Journey"
---

# Building a Production Design System with Tailwind CSS v4

> A deep dive into migrating to Tailwind CSS v4's bleeding-edge features, including @source/@theme directives, and building a component library with 468 passing tests.

**Published:** December 2025  
**Reading Time:** 15 minutes  
**Level:** Intermediate to Advanced

---

## Introduction

When Tailwind CSS v4 alpha was released, I saw an opportunity: be an early adopter of a game-changing technology before it becomes mainstream. This is the story of how I built a production-ready design system using Tailwind v4's revolutionary new CSS-first architecture, and what I learned along the way.

**What we'll cover:**
- Why Tailwind v4 is a paradigm shift
- Migrating from v3 to v4 (the gotchas)
- New `@source` and `@theme` directives
- Building compound components with CVA
- Testing strategies (468 tests and counting)
- Real-world performance impact

## Why Tailwind v4? The Paradigm Shift

Tailwind CSS v4 represents a fundamental architectural change. Instead of JavaScript configuration, everything is now CSS-first:

**Before (Tailwind v3):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
      }
    }
  }
}
```

**After (Tailwind v4):**
```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #3B82F6;
}
```

This isn't just syntactic sugar. It's a complete rethinking of how design tokens should work in modern web applications.

### The Benefits

1. **Native CSS Variables**: Direct access to design tokens in CSS
2. **Zero Config**: No JavaScript configuration needed
3. **Better Performance**: Oxide engine (written in Rust) is 10x faster
4. **Type Safety**: CSS variables are naturally type-safe in modern editors
5. **Hot Module Replacement**: Instant updates without full rebuilds

## The Migration Journey

### Starting Point

My design system (`@ccl/ui`) had:
- 24 production components
- 468 comprehensive tests
- Tailwind CSS v3.4
- React 19 RC + TypeScript
- Radix UI primitives

### Step 1: Install Tailwind v4 Alpha

```bash
pnpm add tailwindcss@next @tailwindcss/postcss@next
```

⚠️ **Warning:** This is alpha software. Expect breaking changes!

### Step 2: Migrate Configuration

The biggest change: `tailwind.config.js` → CSS-first architecture.

**Old approach:**
```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        secondary: { /* ... */ },
      },
      spacing: { /* ... */ },
      borderRadius: { /* ... */ },
    }
  }
}
```

**New approach:**
```css
/* globals.css */
@import "tailwindcss";

@source "../../packages/ui/src/**/*.{ts,tsx}";

@theme {
  /* Color System */
  --color-primary-50: oklch(0.97 0.01 240);
  --color-primary-500: oklch(0.55 0.22 260);
  --color-primary-900: oklch(0.25 0.15 265);
  
  /* Spacing System */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  
  /* Typography */
  --font-sans: 'Geist Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Courier New', monospace;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### The @source Directive

This is huge. Instead of configuring `content` paths in JavaScript, you declare them in CSS:

```css
@source "../../packages/ui/src/**/*.{ts,tsx}";
@source "../src/**/*.{ts,tsx}";
```

**Why this matters:**
- CSS controls what gets scanned for classes
- Easier to manage in monorepos
- No JavaScript configuration needed
- Works naturally with CSS imports

### The @theme Directive

This replaces the `theme.extend` configuration:

```css
@theme {
  /* Custom design tokens */
  --color-brand: #FF6B6B;
  --spacing-hero: 8rem;
  
  /* Override defaults */
  --font-sans: 'Inter', system-ui;
}
```

**Pro tip:** Use CSS custom properties naming conventions:
- `--color-*` for colors
- `--spacing-*` for spacing
- `--font-*` for fonts
- `--radius-*` for border radius

## Building Compound Components

With Tailwind v4's foundation, I built a comprehensive component library. Here's how.

### CVA (Class Variance Authority)

CVA is perfect for managing component variants with Tailwind:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

### Compound Components Pattern

For complex components, I use the compound component pattern:

```typescript
// Hero component with sub-components
export const Hero = ({ children, className }: HeroProps) => {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {children}
    </section>
  );
};

Hero.Title = ({ children, className }: HeroTitleProps) => {
  return (
    <h1 className={cn('text-5xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  );
};

Hero.Description = ({ children, className }: HeroDescriptionProps) => {
  return (
    <p className={cn('text-lg text-muted-foreground', className)}>
      {children}
    </p>
  );
};

// Usage
<Hero>
  <Hero.Title>Welcome to CodeCraft Labs</Hero.Title>
  <Hero.Description>Building the future, one commit at a time</Hero.Description>
</Hero>
```

## Testing Strategy: 468 Tests

Testing a design system is critical. Here's my approach:

### 1. Component Rendering Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['default', 'destructive', 'outline', 'ghost'] as const;
    
    variants.forEach(variant => {
      const { container } = render(<Button variant={variant}>Test</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
```

### 2. Accessibility Tests

```typescript
import { axe } from 'jest-axe';

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 3. Visual Regression Tests (Storybook)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

### 4. Integration Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Integration', () => {
  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### Test Coverage Goals

```
✅ Statements: 95%+
✅ Branches: 90%+
✅ Functions: 95%+
✅ Lines: 95%+
```

## Performance Impact

### Build Time Comparison

**Tailwind v3:**
```
⏱️  Build time: 2.3s
📦 CSS size: 12.4 KB (minified + gzipped)
```

**Tailwind v4 (Oxide engine):**
```
⚡ Build time: 0.18s (10x faster!)
📦 CSS size: 9.8 KB (21% smaller)
```

### Why Is It Faster?

1. **Rust-powered Oxide engine**: Native performance
2. **Better tree-shaking**: More aggressive dead code elimination
3. **Optimized CSS generation**: Smarter class detection
4. **Incremental builds**: Only rebuilds what changed

## Lessons Learned

### What Went Well ✅

1. **CSS-first is better**: More intuitive for styling
2. **Performance gains are real**: 10x build speed improvement
3. **Native CSS variables**: Direct access in CSS is powerful
4. **Future-proof**: Aligns with web platform direction

### Challenges 🚧

1. **Alpha instability**: Breaking changes between releases
2. **Limited documentation**: Early adopter problems
3. **Plugin ecosystem**: Not all v3 plugins work yet
4. **Learning curve**: New mental model takes time

### Would I Do It Again? 💯 Yes!

The benefits far outweigh the challenges. Being an early adopter gives you:
- **Competitive advantage**: Stand out in interviews
- **Deep understanding**: Learn before it's mainstream
- **Content opportunities**: Write about cutting-edge tech
- **Future-ready codebase**: Prepared for v4 stable

## Real-World Example: My Portfolio

My portfolio (https://github.com/saswatawork/codecraft-labs) uses:
- ✅ Tailwind CSS v4 alpha
- ✅ 24 components with 468 tests
- ✅ React 19 RC
- ✅ Next.js 16
- ✅ Full TypeScript strict mode

**Results:**
- ⚡ Lightning-fast builds
- 🎨 Consistent design system
- 🧪 Rock-solid test coverage
- 📱 Fully responsive
- ♿ WCAG 2.1 AA compliant

## Getting Started with Tailwind v4

Ready to try it? Here's the quickstart:

```bash
# Install Tailwind v4
pnpm add tailwindcss@next @tailwindcss/postcss@next

# Create CSS file
cat > styles/globals.css << EOF
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.55 0.22 260);
}
EOF

# Update PostCSS config
cat > postcss.config.mjs << EOF
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
EOF

# Start building!
```

## Conclusion

Tailwind CSS v4 represents the future of utility-first CSS. The CSS-first architecture, Oxide engine, and native CSS variables make it a compelling upgrade.

**Key takeaways:**
1. Start experimenting with v4 alpha now
2. Use `@source` and `@theme` directives
3. Build a comprehensive test suite (aim for 468+ tests like me 😉)
4. Embrace compound components with CVA
5. Document everything for your future self

## Resources

- [Tailwind CSS v4 Alpha Docs](https://tailwindcss.com/docs/v4-alpha)
- [My Component Library](https://github.com/saswatawork/codecraft-labs/tree/main/packages/ui)
- [CVA Documentation](https://cva.style/docs)
- [Testing Library](https://testing-library.com/)

## What's Next?

In my next post, I'll cover:
- **Migrating to React 19**: Concurrent features in production
- **NestJS + Prisma**: Building type-safe APIs
- **AI Integration**: Adding Vercel AI SDK to the stack

## Connect With Me

Follow my 90-day transformation journey from frontend to full-stack + AI engineer:

- **Dev.to**: [@saswatapal](https://dev.to/saswatapal) - Technical deep dives
- **GitHub**: [@saswatawork](https://github.com/saswatawork) - Daily commits & open source
- **LinkedIn**: [Saswata Pal](https://www.linkedin.com/in/saswata-pal/) - Weekly progress updates
- **X (Twitter)**: [@SaswataPal14](https://x.com/SaswataPal14) - Real-time updates & insights
- **Medium**: [@saswatapal](https://medium.com/@saswatapal) - Deep dive articles

**Questions? Feedback?** Drop a comment below or reach out on any platform above!

---

*Building world-class software, one commit at a time. 🚀*
- 💼 LinkedIn: [linkedin.com/in/saswata-pal](https://linkedin.com/in/saswata-pal)
- 💻 GitHub: [github.com/saswatawork](https://github.com/saswatawork)

---

**Questions? Comments?** Drop them below! I'd love to hear about your experience with Tailwind v4.

**Found this helpful?** Share it with your team and give my repo a ⭐!

---

## 👋 Let's Connect!

Building in public and sharing what I learn along the way. Would love to hear your thoughts!

**💼 Professional:** [LinkedIn](https://www.linkedin.com/in/saswata-pal/) • **🐦 Quick Takes:** [@SaswataPal14](https://twitter.com/SaswataPal14)  
**📝 Writing:** [Dev.to](https://dev.to/saswatapal) • **💻 Code:** [GitHub](https://github.com/saswatawork)  
**📧 Direct:** saswata.career@gmail.com

Found this helpful? **Share it with your team** and **drop a comment** with your experience! 🚀

---

*This blog post is part of my 90-day transformation journey from frontend specialist to full-stack + AI engineer. Follow along in my [transformation checklist](https://github.com/saswatawork/codecraft-labs/blob/main/docs/planning/90-DAY-TRANSFORMATION-CHECKLIST.md).*
