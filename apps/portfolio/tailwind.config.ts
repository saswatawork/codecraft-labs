import type { Config } from 'tailwindcss';

// Using any to allow safelist property while Tailwind v4 type definitions catch up
// Tailwind will ignore unknown properties; safelist used internally by PostCSS plugin.
const config: any = {
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
    // @ts-ignore - safelist is supported by Tailwind runtime though not in current type defs
    safelist: [
      // spacing utilities used inside UI library components that might be tree-shaken
      'p-4',
      'p-5',
      'p-6',
      'p-8',
      'px-4',
      'px-6',
      'px-8',
      'py-3',
      'py-4',
      'py-6',
      // borders & radius
      'rounded-lg',
      'rounded-xl',
      'border',
      'border-gray-200',
      'border-gray-300',
      // shadows
      'shadow',
      'shadow-sm',
      'shadow-md',
      'shadow-lg',
      'shadow-xl',
      'hover:shadow-xl',
      'hover:shadow-2xl',
    ],
  },
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

export default config;
