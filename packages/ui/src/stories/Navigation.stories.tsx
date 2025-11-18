import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CompoundAvatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import {
  CompoundNavigation,
  Navigation,
  NavigationActions,
  NavigationBrand,
  NavigationContainer,
  NavigationItem,
  NavigationMenu,
  NavigationToggle,
} from '../components/Navigation';

const meta: Meta<typeof CompoundNavigation> = {
  title: 'Components/Navigation',
  component: CompoundNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive Navigation/Navbar component system with responsive design, mobile menu, and flexible composition.

## Features
- **Compound Pattern**: Navigation, NavigationContainer, NavigationBrand, etc.
- **Multiple Variants**: Default, ghost, and floating styles
- **Size Options**: Small (sm), medium (md), and large (lg)
- **Position Control**: Static, sticky, or fixed positioning
- **Responsive Design**: Mobile-first with collapsible menu
- **Accessibility**: ARIA compliance, keyboard navigation
- **TypeScript Support**: Full type safety with proper interfaces

## Usage
The Navigation component can be used as individual components for maximum flexibility or as a compound component for convenience.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'floating'],
      description: 'Navigation style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Navigation size',
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
      description: 'Navigation positioning',
    },
    showToggle: {
      control: 'boolean',
      description: 'Show mobile menu toggle',
    },
    containerSpacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Container spacing between elements',
    },
  },
} satisfies Meta<typeof CompoundNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Navigation Stories
export const Default: Story = {
  args: {
    brand: {
      text: 'CodeCraft Labs',
      href: '/',
    },
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic navigation with brand, menu items, and action buttons.',
      },
    },
  },
};

// Variant Stories
export const Variants: Story = {
  render: () => {
    const navigationItems = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Default</h3>
          <CompoundNavigation
            variant="default"
            brand={{ text: 'Default Nav' }}
            items={navigationItems}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Ghost</h3>
          <CompoundNavigation
            variant="ghost"
            brand={{ text: 'Ghost Nav' }}
            items={navigationItems}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Floating</h3>
          <CompoundNavigation
            variant="floating"
            brand={{ text: 'Floating Nav' }}
            items={navigationItems}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different navigation variants: default with border, ghost without border, and floating with shadow.',
      },
    },
  },
};

// Size Stories
export const Sizes: Story = {
  render: () => {
    const navigationItems = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Small</h3>
          <CompoundNavigation size="sm" brand={{ text: 'Small Nav' }} items={navigationItems} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
          <CompoundNavigation size="md" brand={{ text: 'Medium Nav' }} items={navigationItems} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Large</h3>
          <CompoundNavigation size="lg" brand={{ text: 'Large Nav' }} items={navigationItems} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different navigation sizes affecting height and padding.',
      },
    },
  },
};

// Position Stories
export const Positions: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Static</h3>
          <CompoundNavigation
            position="static"
            brand={{ text: 'Static Nav' }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
          />
          <div className="h-20 bg-muted rounded mt-2 flex items-center justify-center">
            <p className="text-muted-foreground">Content flows normally</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Sticky</h3>
          <CompoundNavigation
            position="sticky"
            brand={{ text: 'Sticky Nav' }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
          />
          <div className="h-20 bg-muted rounded mt-2 flex items-center justify-center">
            <p className="text-muted-foreground">Sticks to top when scrolling</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Fixed</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Fixed navigation overlays content (not shown in preview)
          </p>
          <div className="relative h-16 overflow-hidden rounded border">
            <CompoundNavigation
              position="fixed"
              brand={{ text: 'Fixed Nav' }}
              items={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
              ]}
              className="relative"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different navigation positions: static (normal flow), sticky (sticks on scroll), and fixed (overlays content).',
      },
    },
  },
};

// With Logo Brand
export const WithLogo: Story = {
  args: {
    brand: {
      logo: (
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">CL</span>
        </div>
      ),
      text: 'CodeCraft Labs',
      href: '/',
    },
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'Products', href: '/products' },
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
    ],
    actions: (
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button size="sm">Get Started</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with logo and brand text combination.',
      },
    },
  },
};

// E-commerce Navigation
export const ECommerce: Story = {
  args: {
    variant: 'default',
    brand: {
      text: 'ShopCraft',
      href: '/',
    },
    items: [
      { label: 'Categories', href: '/categories' },
      { label: 'Deals', href: '/deals', variant: 'default' },
      { label: 'New Arrivals', href: '/new' },
      { label: 'Sale', href: '/sale', variant: 'default' },
    ],
    actions: (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="relative">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Button>
        <Button variant="ghost" size="sm" className="relative">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
        </Button>
        <Button variant="ghost" size="sm" className="relative">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">2</Badge>
        </Button>
        <CompoundAvatar size="sm" fallback="U" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'E-commerce style navigation with search, wishlist, cart icons and user avatar.',
      },
    },
  },
};

// Dashboard Navigation
export const Dashboard: Story = {
  args: {
    variant: 'ghost',
    position: 'static',
    brand: {
      logo: (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">D</span>
        </div>
      ),
      text: 'Dashboard',
    },
    items: [
      { label: 'Overview', href: '/dashboard', active: true },
      { label: 'Analytics', href: '/dashboard/analytics' },
      { label: 'Projects', href: '/dashboard/projects' },
      { label: 'Team', href: '/dashboard/team' },
    ],
    actions: (
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="relative">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500" />
        </Button>
        <CompoundAvatar fallback="JD" size="sm" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard style navigation with notifications and user avatar.',
      },
    },
  },
};

// Mobile Responsive
export const MobileResponsive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="max-w-sm mx-auto border rounded-lg overflow-hidden">
        <Navigation>
          <NavigationContainer>
            <NavigationBrand text="Mobile Nav" />
            <NavigationToggle isOpen={isOpen} onToggle={setIsOpen} />
            <NavigationMenu className="absolute top-full left-0 right-0 bg-background border-t sm:relative sm:top-auto sm:border-t-0">
              <div className="flex flex-col space-y-1 p-4 sm:flex-row sm:space-y-0 sm:space-x-1 sm:p-0">
                <NavigationItem href="/" active>
                  Home
                </NavigationItem>
                <NavigationItem href="/about">About</NavigationItem>
                <NavigationItem href="/services">Services</NavigationItem>
                <NavigationItem href="/contact">Contact</NavigationItem>
              </div>
            </NavigationMenu>
          </NavigationContainer>
        </Navigation>
        <div className="p-4 text-sm text-muted-foreground">
          Click the hamburger menu to toggle mobile navigation
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mobile-responsive navigation with collapsible menu. Resize viewport to see mobile behavior.',
      },
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => {
    return (
      <CompoundNavigation
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
        brand={{
          text: 'Custom Nav',
          href: '/',
        }}
        items={[
          { label: 'Home', href: '/', active: true, variant: 'ghost' },
          { label: 'Features', href: '/features', variant: 'ghost' },
          { label: 'Pricing', href: '/pricing', variant: 'ghost' },
        ]}
        actions={
          <Button variant="secondary" size="sm">
            Get Started
          </Button>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with custom gradient background and styling overrides.',
      },
    },
  },
};

// Advanced Compound Usage
export const AdvancedComposition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Navigation variant="floating" className="mx-4 mt-4">
        <NavigationContainer spacing="lg">
          <NavigationBrand
            href="/"
            logo={
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AC</span>
              </div>
            }
            text="AdvancedCorp"
            size="lg"
          />

          <NavigationToggle size="lg" isOpen={isOpen} onToggle={setIsOpen} />

          <NavigationMenu orientation="horizontal" className="flex-1 justify-center">
            <NavigationItem href="/" variant="underline" active size="lg">
              Home
            </NavigationItem>
            <NavigationItem href="/products" variant="underline" size="lg">
              Products
            </NavigationItem>
            <NavigationItem href="/solutions" variant="underline" size="lg">
              Solutions
            </NavigationItem>
            <NavigationItem href="/enterprise" variant="underline" size="lg">
              Enterprise
            </NavigationItem>
          </NavigationMenu>

          <NavigationActions>
            <Button variant="ghost" size="sm">
              Support
            </Button>
            <Button variant="outline" size="sm">
              Contact Sales
            </Button>
            <Button size="sm">Try Free</Button>
          </NavigationActions>
        </NavigationContainer>
      </Navigation>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced composition using individual Navigation components for maximum customization.',
      },
    },
  },
};

// No Toggle Navigation
export const NoToggle: Story = {
  args: {
    showToggle: false,
    brand: {
      text: 'Simple Nav',
    },
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation without mobile toggle button for simple use cases.',
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    position: 'sticky',
    showToggle: true,
    containerSpacing: 'md',
    brand: {
      text: 'Playground Nav',
      href: '/',
    },
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all navigation properties and variants.',
      },
    },
  },
};
