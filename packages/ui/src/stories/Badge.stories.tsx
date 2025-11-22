import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/Badge';

// Icons for Badge demonstrations
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Check Icon</title>
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Close Icon</title>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Alert Icon</title>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="m12 17.02.01 0" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Star Icon</title>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Badge component is a versatile status indicator that can display text, icons, or simple dots.
Perfect for showing status, counts, labels, and interactive elements with consistent styling.

## Features
- **Multiple Variants**: Default, secondary, destructive, outline styles
- **Dot Indicators**: Simple colored dots for minimal status display
- **Icon Support**: Built-in icon rendering with proper spacing
- **Interactive States**: Clickable badges with hover and focus states
- **Loading States**: Loading spinners for async operations
- **Size Options**: Small and default sizes for different contexts
- **Polymorphic**: Render as different HTML elements (button, span, div, etc.)
- **TypeScript**: Full type safety with proper element props

## Usage
\`\`\`tsx
import { Badge } from '@ccl/ui'

// Basic text badge
<Badge>New</Badge>

// Status badge with color
<Badge variant="destructive">Error</Badge>

// Dot indicator
<Badge dot variant="success" />

// Interactive badge
<Badge as="button" onClick={() => {}}>
  Clickable
</Badge>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'destructive',
        'success',
        'warning',
        'info',
        'soft',
        'soft-secondary',
        'soft-destructive',
        'soft-success',
        'soft-warning',
        'soft-info',
        'outline',
        'outline-primary',
        'outline-destructive',
      ],
      description: 'The visual style of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
    },
    tone: {
      control: { type: 'select' },
      options: ['default', 'blue', 'purple', 'green', 'orange'],
      description: 'Contextual tone color for the badge',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Render as a simple dot indicator',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable interactive hover effects',
    },
    children: {
      control: { type: 'text' },
      description: 'Badge content (text or elements)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Error',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// Dot Variants
export const DotDefault: Story = {
  args: {
    dot: true,
  },
};

export const DotSecondary: Story = {
  args: {
    dot: true,
    variant: 'secondary',
  },
};

export const DotDestructive: Story = {
  args: {
    dot: true,
    variant: 'destructive',
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge>Default</Badge>
    </div>
  ),
};

// Interactive Badges
export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Hover me',
  },
};

export const InteractiveButton: Story = {
  args: {
    as: 'button',
    children: 'Click me',
    onClick: () => alert('Badge clicked!'),
  },
};

// Loading State
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// Icon Badges
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>
        <CheckIcon />
        Success
      </Badge>
      <Badge variant="destructive">
        <XIcon />
        Error
      </Badge>
      <Badge variant="secondary">
        <AlertIcon />
        Warning
      </Badge>
      <Badge variant="outline">
        <StarIcon />
        Featured
      </Badge>
    </div>
  ),
};

// All Variants Overview
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Solid Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Soft Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="soft">Soft Primary</Badge>
          <Badge variant="soft-secondary">Soft Secondary</Badge>
          <Badge variant="soft-destructive">Soft Destructive</Badge>
          <Badge variant="soft-success">Soft Success</Badge>
          <Badge variant="soft-warning">Soft Warning</Badge>
          <Badge variant="soft-info">Soft Info</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Outline Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="outline-primary">Outline Primary</Badge>
          <Badge variant="outline-destructive">Outline Destructive</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Dot Indicators</h3>
        <div className="flex flex-wrap gap-2">
          <Badge dot>Online</Badge>
          <Badge dot variant="soft-success">
            Active
          </Badge>
          <Badge dot variant="soft-warning">
            Away
          </Badge>
          <Badge dot variant="soft-destructive">
            Offline
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Interactive Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge interactive>Hoverable</Badge>
          <Badge interactive variant="soft">
            Hoverable Soft
          </Badge>
          <Badge interactive variant="outline-primary">
            Hoverable Outline
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export const ToneVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Solid with Tones</h3>
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">Blue</Badge>
          <Badge tone="purple">Purple</Badge>
          <Badge tone="green">Green</Badge>
          <Badge tone="orange">Orange</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Soft with Tones</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="soft" tone="blue">
            Soft Blue
          </Badge>
          <Badge variant="soft" tone="purple">
            Soft Purple
          </Badge>
          <Badge variant="soft" tone="green">
            Soft Green
          </Badge>
          <Badge variant="soft" tone="orange">
            Soft Orange
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4 text-sm">
      <div className="flex items-center gap-2">
        <Badge dot variant="default" />
        <span>Online</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot variant="secondary" />
        <span>Away</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot variant="destructive" />
        <span>Offline</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot variant="outline" />
        <span>Unknown</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dot badges used as status indicators with labels.',
      },
    },
  },
};

// Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="text-sm">Messages</span>
          <Badge
            size="sm"
            className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center"
          >
            3
          </Badge>
        </div>

        <div className="relative">
          <span className="text-sm">Notifications</span>
          <Badge
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center"
          >
            12
          </Badge>
        </div>

        <div className="relative">
          <span className="text-sm">Updates</span>
          <Badge dot variant="destructive" className="absolute -top-1 -right-1" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used as notification indicators with counts and dots.',
      },
    },
  },
};

// Tag System
export const Tags: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Blog Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" as="button">
            React
          </Badge>
          <Badge variant="outline" as="button">
            TypeScript
          </Badge>
          <Badge variant="outline" as="button">
            Next.js
          </Badge>
          <Badge variant="outline" as="button">
            Tailwind
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Priority Labels</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">High</Badge>
          <Badge variant="secondary">Medium</Badge>
          <Badge>Low</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Feature Flags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <CheckIcon />
            Enabled
          </Badge>
          <Badge variant="outline">
            <XIcon />
            Disabled
          </Badge>
          <Badge variant="secondary" loading>
            Checking...
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of badges used as tags, labels, and feature indicators.',
      },
    },
  },
};

// E-commerce Examples
export const EcommerceBadges: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">Wireless Headphones</h3>
          <Badge variant="destructive" size="sm">
            Sale
          </Badge>
        </div>
        <div className="flex gap-2">
          <Badge size="sm">Free Shipping</Badge>
          <Badge variant="secondary" size="sm">
            Best Seller
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge dot />
          <span className="text-sm text-gray-600">In Stock</span>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">Smart Watch</h3>
          <Badge size="sm">New</Badge>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" size="sm">
            Limited Edition
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge dot variant="secondary" />
          <span className="text-sm text-gray-600">Low Stock</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'E-commerce product cards with various badge indicators.',
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Playground Badge',
    variant: 'default',
    size: 'md',
  },
};
