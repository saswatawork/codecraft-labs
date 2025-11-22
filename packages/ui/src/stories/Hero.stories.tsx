import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Hero } from '../components/Hero';

/**
 * # Hero Component
 *
 * A flexible hero section component with compound component pattern for building impactful hero sections.
 *
 * ## Features
 * - 🎨 Multiple variants: default, gradient, gradient-bold, dark, light
 * - 📐 Flexible alignment: left, center, right
 * - 📏 Consistent spacing system: sm to 2xl
 * - 🧩 Compound components for flexible composition
 * - ♿ Accessible with proper semantic HTML
 * - 🎯 Integrates with design token system
 *
 * ## Compound Components
 * - `Hero.Badge` - Announcement or status badge
 * - `Hero.Title` - Main heading with level support (h1-h6)
 * - `Hero.Description` - Supporting description text
 * - `Hero.Actions` - Call-to-action buttons
 * - `Hero.Content` - Additional content wrapper
 * - `Hero.Stats` - Grid for displaying statistics
 */
const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default centered hero with all compound components
 */
export const Default: Story = {
  render: () => (
    <Hero>
      <Hero.Badge>✨ New Feature</Hero.Badge>
      <Hero.Title>Build Beautiful Interfaces</Hero.Title>
      <Hero.Description>
        A comprehensive design system built with React, TypeScript, and Tailwind CSS. Create
        stunning, accessible, and performant user interfaces.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary">
          Get Started
        </Button>
        <Button size="lg" variant="outline">
          View Docs
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Gradient background variant with bold styling
 */
export const GradientBold: Story = {
  render: () => (
    <Hero variant="gradient-bold">
      <Hero.Badge>🚀 Launch Week</Hero.Badge>
      <Hero.Title>Ship Faster with Confidence</Hero.Title>
      <Hero.Description>
        Production-ready components with comprehensive test coverage, built-in accessibility, and
        excellent performance out of the box.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary" tone="purple">
          Start Building
        </Button>
        <Button size="lg" variant="ghost">
          Learn More →
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Dark variant for contrast
 */
export const Dark: Story = {
  render: () => (
    <Hero variant="dark">
      <Hero.Badge>🌙 Dark Mode Ready</Hero.Badge>
      <Hero.Title>Design System Excellence</Hero.Title>
      <Hero.Description>
        Every component is crafted with attention to detail, from micro-interactions to
        comprehensive documentation.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary">
          Explore Components
        </Button>
        <Button size="lg" variant="outline-primary">
          View Stories
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Light variant with subtle background
 */
export const Light: Story = {
  render: () => (
    <Hero variant="light">
      <Hero.Title>Clean & Minimal</Hero.Title>
      <Hero.Description>
        Sometimes less is more. Our light variant provides a clean backdrop for your content to
        shine.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="soft">
          Get Started
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Left-aligned hero - great for landing pages
 */
export const LeftAligned: Story = {
  render: () => (
    <Hero align="left" variant="gradient">
      <Hero.Badge>👋 Welcome</Hero.Badge>
      <Hero.Title>Developer-First Design System</Hero.Title>
      <Hero.Description>
        Built by developers, for developers. Every component is designed to be intuitive,
        well-documented, and a joy to use.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary" tone="blue">
          Read the Docs
        </Button>
        <Button size="lg" variant="ghost-primary">
          View on GitHub →
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Right-aligned hero
 */
export const RightAligned: Story = {
  render: () => (
    <Hero align="right" variant="gradient">
      <Hero.Badge>📱 Responsive</Hero.Badge>
      <Hero.Title>Works Everywhere</Hero.Title>
      <Hero.Description>
        From mobile to desktop, our components adapt beautifully to any screen size.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="outline-primary">
          See Examples
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Hero with statistics - perfect for showcasing metrics
 */
export const WithStats: Story = {
  render: () => (
    <Hero variant="gradient-bold">
      <Hero.Badge>⚡ Performance</Hero.Badge>
      <Hero.Title>Built for Speed</Hero.Title>
      <Hero.Description>
        Optimized bundle size, excellent Web Vitals, and 95%+ test coverage. Ship with confidence.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary" tone="green">
          View Metrics
        </Button>
        <Button size="lg" variant="ghost">
          Read More
        </Button>
      </Hero.Actions>
      <Hero.Stats>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">153KB</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Bundle</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">95%+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Test Coverage</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">349</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tests Passing</div>
        </div>
      </Hero.Stats>
    </Hero>
  ),
};

/**
 * Compact hero with small spacing
 */
export const CompactSpacing: Story = {
  render: () => (
    <Hero spacing="sm">
      <Hero.Title level={2}>Quick Start Guide</Hero.Title>
      <Hero.Description>
        Get up and running in minutes with our comprehensive documentation.
      </Hero.Description>
      <Hero.Actions>
        <Button size="md" variant="primary">
          Get Started
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Spacious hero with extra-large spacing
 */
export const SpaciousLayout: Story = {
  render: () => (
    <Hero spacing="2xl" variant="gradient">
      <Hero.Badge>🎨 Design First</Hero.Badge>
      <Hero.Title>Make Every Pixel Count</Hero.Title>
      <Hero.Description>
        Carefully crafted spacing, typography, and color systems ensure your interfaces look
        beautiful at every breakpoint.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary">
          Explore Design Tokens
        </Button>
        <Button size="lg" variant="outline">
          View Guidelines
        </Button>
      </Hero.Actions>
    </Hero>
  ),
};

/**
 * Hero with custom content section
 */
export const WithCustomContent: Story = {
  render: () => (
    <Hero variant="gradient-bold">
      <Hero.Badge>🎯 Feature Complete</Hero.Badge>
      <Hero.Title>Everything You Need</Hero.Title>
      <Hero.Description>
        From basic buttons to complex navigation systems, we've got you covered.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary" tone="purple">
          Browse Components
        </Button>
      </Hero.Actions>
      <Hero.Content>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Badge variant="soft" tone="blue">
            TypeScript
          </Badge>
          <Badge variant="soft" tone="purple">
            React 19
          </Badge>
          <Badge variant="soft" tone="green">
            Tailwind CSS
          </Badge>
          <Badge variant="soft" tone="orange">
            Vitest
          </Badge>
        </div>
      </Hero.Content>
    </Hero>
  ),
};

/**
 * Split layout with image placeholder (common pattern)
 */
export const SplitLayout: Story = {
  render: () => (
    <Hero align="left" variant="default">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Hero.Badge>🎉 Now Available</Hero.Badge>
          <Hero.Title>Modern React Components</Hero.Title>
          <Hero.Description>
            Beautiful, accessible, and performant components built with the latest web standards and
            best practices.
          </Hero.Description>
          <Hero.Actions>
            <Button size="lg" variant="primary" tone="blue">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </Hero.Actions>
        </div>
        <div className="relative h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Your image/demo here</div>
        </div>
      </div>
    </Hero>
  ),
};

/**
 * Minimal hero - just title and description
 */
export const Minimal: Story = {
  render: () => (
    <Hero spacing="md" variant="light">
      <Hero.Title level={1}>Simple & Effective</Hero.Title>
      <Hero.Description>
        Not every hero needs bells and whistles. Sometimes a clean title and description is all you
        need.
      </Hero.Description>
    </Hero>
  ),
};

/**
 * Hero with all elements - kitchen sink example
 */
export const KitchenSink: Story = {
  render: () => (
    <Hero variant="gradient-bold" spacing="2xl">
      <Hero.Badge>🎯 Complete Example</Hero.Badge>
      <Hero.Title>The Ultimate Design System</Hero.Title>
      <Hero.Description>
        Production-ready, type-safe, accessible, and beautiful. Built with modern tools and
        battle-tested in real applications.
      </Hero.Description>
      <Hero.Actions>
        <Button size="lg" variant="primary" tone="purple">
          Get Started Free
        </Button>
        <Button size="lg" variant="outline-primary">
          View Documentation
        </Button>
        <Button size="lg" variant="ghost">
          See Examples →
        </Button>
      </Hero.Actions>
      <Hero.Stats>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">50+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Components</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">349</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tests</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">95%+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Coverage</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">TypeScript</div>
        </div>
      </Hero.Stats>
      <Hero.Content>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="soft" tone="blue">
            React 19
          </Badge>
          <Badge variant="soft" tone="purple">
            TypeScript 5.6
          </Badge>
          <Badge variant="soft" tone="green">
            Tailwind CSS v4
          </Badge>
          <Badge variant="soft" tone="orange">
            Vitest
          </Badge>
          <Badge variant="soft" tone="blue">
            Storybook
          </Badge>
          <Badge variant="soft" tone="purple">
            Radix UI
          </Badge>
        </div>
      </Hero.Content>
    </Hero>
  ),
};
