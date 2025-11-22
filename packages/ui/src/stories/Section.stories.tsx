import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { Section } from '../components/Section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Section component provides consistent spacing and container widths for page sections.
Eliminates the need for manual \`py-20 md:py-24 lg:py-28\` classes throughout your application.

## Features
- **Spacing Presets**: none, xs, sm, md, lg, xl, 2xl with responsive behavior
- **Width Variants**: full, contained, narrow, wide, ultra
- **Polymorphic**: Render as any HTML element (section, article, div, etc.)
- **TypeScript**: Full type safety with proper HTML attributes
- **Responsive**: Built-in mobile, tablet, desktop breakpoints

## Usage
\`\`\`tsx
import { Section } from '@ccl/ui'

// Default section with lg spacing and wide container
<Section>
  <h1>Content here</h1>
</Section>

// Full width hero section
<Section width="full" spacing="xl">
  <div className="bg-gradient-to-r from-blue-500 to-purple-600">
    Hero content
  </div>
</Section>

// Narrow centered article section
<Section width="narrow" spacing="md">
  <article>Article content</article>
</Section>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Vertical padding/spacing for the section',
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'contained', 'narrow', 'wide', 'ultra'],
      description: 'Container width and horizontal padding',
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Default Section</h2>
        <p className="text-gray-600">
          Large spacing (py-20 md:py-24) with wide container (max-w-7xl)
        </p>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    width: 'full',
    spacing: 'xl',
    children: (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Full Width Section</h1>
        <p className="text-xl">Perfect for hero sections and full-bleed content</p>
      </div>
    ),
  },
};

export const NarrowCentered: Story = {
  args: {
    width: 'narrow',
    spacing: 'md',
    children: (
      <article className="prose">
        <h2 className="text-3xl font-bold mb-4">Article Title</h2>
        <p className="text-gray-600 mb-4">
          Narrow sections (max-w-4xl) are perfect for long-form content like blog posts and
          articles. The centered container creates optimal reading width.
        </p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </article>
    ),
  },
};

// Spacing Variations
export const AllSpacings: Story = {
  render: () => (
    <div className="space-y-1">
      <Section spacing="none" className="bg-blue-50">
        <p className="text-center text-gray-600">None (py-0)</p>
      </Section>
      <Section spacing="xs" className="bg-purple-50">
        <p className="text-center text-gray-600">XS (py-8 md:py-12)</p>
      </Section>
      <Section spacing="sm" className="bg-green-50">
        <p className="text-center text-gray-600">SM (py-12 md:py-16)</p>
      </Section>
      <Section spacing="md" className="bg-yellow-50">
        <p className="text-center text-gray-600">MD (py-16 md:py-20)</p>
      </Section>
      <Section spacing="lg" className="bg-orange-50">
        <p className="text-center text-gray-600">LG (py-20 md:py-24) - Default</p>
      </Section>
      <Section spacing="xl" className="bg-red-50">
        <p className="text-center text-gray-600">XL (py-24 md:py-28)</p>
      </Section>
      <Section spacing="2xl" className="bg-pink-50">
        <p className="text-center text-gray-600">2XL (py-28 md:py-32)</p>
      </Section>
    </div>
  ),
};

// Width Variations
export const AllWidths: Story = {
  render: () => (
    <div className="space-y-8">
      <Section width="narrow" spacing="md">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold mb-2">Narrow (max-w-4xl)</h3>
          <p className="text-sm text-gray-600">Perfect for articles and long-form content</p>
        </div>
      </Section>

      <Section width="contained" spacing="md">
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-bold mb-2">Contained (no max-width)</h3>
          <p className="text-sm text-gray-600">Responsive horizontal padding only</p>
        </div>
      </Section>

      <Section width="wide" spacing="md">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold mb-2">Wide (max-w-7xl) - Default</h3>
          <p className="text-sm text-gray-600">Standard container for most content</p>
        </div>
      </Section>

      <Section width="ultra" spacing="md">
        <div className="bg-orange-100 p-4 rounded">
          <h3 className="font-bold mb-2">Ultra (max-w-[1920px])</h3>
          <p className="text-sm text-gray-600">For ultra-wide displays</p>
        </div>
      </Section>

      <Section width="full" spacing="md">
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-bold mb-2">Full Width</h3>
          <p className="text-sm text-gray-600">Edge-to-edge content</p>
        </div>
      </Section>
    </div>
  ),
};

// Real World Examples
export const HeroSection: Story = {
  render: () => (
    <Section width="full" spacing="xl">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Platform</h1>
          <p className="text-xl mb-8 opacity-90">
            Build amazing applications with our component library
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
            <Button size="lg" variant="outline-primary">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Section>
  ),
};

export const ContentSection: Story = {
  render: () => (
    <Section spacing="lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">Fast</h3>
          <p className="text-gray-600">Lightning-fast performance</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">Flexible</h3>
          <p className="text-gray-600">Customizable to your needs</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">Accessible</h3>
          <p className="text-gray-600">Built with accessibility in mind</p>
        </div>
      </div>
    </Section>
  ),
};

export const ArticleSection: Story = {
  render: () => (
    <Section width="narrow" spacing="md">
      <article className="prose lg:prose-xl">
        <h1>Understanding React Component Patterns</h1>
        <p className="lead text-gray-600">
          Learn about composition, render props, and hooks in modern React development.
        </p>
        <p>
          React has evolved significantly over the years, introducing various patterns and best
          practices. In this article, we'll explore the most important patterns you should know.
        </p>
        <h2>Composition Pattern</h2>
        <p>
          Composition is one of React's most powerful features, allowing you to build complex UIs
          from simple, reusable components.
        </p>
      </article>
    </Section>
  ),
};
