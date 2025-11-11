import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarStatus,
  CompoundAvatar,
} from '../components/Avatar';

// Mock user data for realistic examples
const mockUsers = [
  {
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    status: 'online',
  },
  {
    name: 'Jane Smith',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face',
    status: 'away',
  },
  { name: 'Bob Johnson', image: '', status: 'busy' },
  {
    name: 'Alice Brown',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    status: 'offline',
  },
] as const;

// Helper to safely get user data
const getUser = (index: number) => mockUsers[index] || mockUsers[0];

const meta: Meta<typeof CompoundAvatar> = {
  title: 'Components/Avatar',
  component: CompoundAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible Avatar component system with image support, fallbacks, and status indicators.

## Features
- **Multiple sizes** from xs (24px) to 2xl (80px)
- **Automatic fallbacks** with initials generation
- **Status indicators** with online/offline/away/busy states
- **Flexible variants** for different color schemes
- **Compound pattern** for maximum customization
- **TypeScript support** with full type safety

## Usage
The Avatar component can be used as individual components or as a compound component for convenience.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'User status indicator',
    },
    fallbackVariant: {
      control: 'select',
      options: ['default', 'secondary', 'muted', 'accent', 'destructive'],
      description: 'Color variant for fallback text',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image and name for initials',
    },
    fallback: {
      control: 'text',
      description: 'Custom fallback text (will generate initials)',
    },
  },
} satisfies Meta<typeof CompoundAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Avatar Stories
export const Default: Story = {
  args: {
    alt: 'John Doe',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default avatar with initials fallback when no image is provided.',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    src: mockUsers[0]?.image,
    alt: mockUsers[0]?.name,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with a profile image.',
      },
    },
  },
};

export const WithStatus: Story = {
  args: {
    src: mockUsers[0]?.image,
    alt: mockUsers[0]?.name,
    status: 'online',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with status indicator showing user availability.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end space-x-4">
      <CompoundAvatar size="xs" alt="John Doe" />
      <CompoundAvatar size="sm" alt="Jane Smith" />
      <CompoundAvatar size="md" alt="Bob Johnson" />
      <CompoundAvatar size="lg" alt="Alice Brown" />
      <CompoundAvatar size="xl" alt="Charlie Wilson" />
      <CompoundAvatar size="2xl" alt="Diana Prince" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar in different sizes from xs (24px) to 2xl (80px).',
      },
    },
  },
};

// Status Variants
export const StatusVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <CompoundAvatar src={mockUsers[0]?.image} alt="Online User" status="online" size="lg" />
        <p className="mt-2 text-sm text-muted-foreground">Online</p>
      </div>
      <div className="text-center">
        <CompoundAvatar alt="Away User" status="away" size="lg" fallbackVariant="secondary" />
        <p className="mt-2 text-sm text-muted-foreground">Away</p>
      </div>
      <div className="text-center">
        <CompoundAvatar alt="Busy User" status="busy" size="lg" fallbackVariant="destructive" />
        <p className="mt-2 text-sm text-muted-foreground">Busy</p>
      </div>
      <div className="text-center">
        <CompoundAvatar alt="Offline User" status="offline" size="lg" fallbackVariant="muted" />
        <p className="mt-2 text-sm text-muted-foreground">Offline</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with different status indicators and matching color variants.',
      },
    },
  },
};

// Fallback Variants
export const FallbackVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CompoundAvatar alt="Default User" fallbackVariant="default" size="lg" />
      <CompoundAvatar alt="Secondary User" fallbackVariant="secondary" size="lg" />
      <CompoundAvatar alt="Muted User" fallbackVariant="muted" size="lg" />
      <CompoundAvatar alt="Accent User" fallbackVariant="accent" size="lg" />
      <CompoundAvatar alt="Destructive User" fallbackVariant="destructive" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar fallbacks with different color variants.',
      },
    },
  },
};

// Compound Component Usage
export const CompoundUsage: Story = {
  render: () => (
    <Avatar size="lg" className="ring-2 ring-primary ring-offset-2">
      <AvatarImage src={mockUsers[0]?.image} alt="John Doe" />
      <AvatarFallback variant="secondary">JD</AvatarFallback>
      <AvatarStatus status="online" size="lg" />
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using individual Avatar components for maximum flexibility and custom styling.',
      },
    },
  },
};

// Team Avatar Group
export const TeamGroup: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      {mockUsers.map((user, index) => (
        <CompoundAvatar
          key={user.name}
          src={user.image}
          alt={user.name}
          status={user.status as any}
          size="md"
          className="ring-2 ring-background"
          fallbackVariant={index % 2 === 0 ? 'default' : 'secondary'}
        />
      ))}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground text-sm font-medium">
        +3
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Team member avatars with overflow indicator - perfect for showing groups.',
      },
    },
  },
};

// User Profile Card Example
export const UserProfileCard: Story = {
  render: () => (
    <div className="max-w-sm p-6 bg-card border rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <CompoundAvatar
          src={mockUsers[0]?.image}
          alt="John Doe"
          status="online"
          size="xl"
          className="ring-2 ring-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground truncate">Senior Developer at Acme Corp</p>
          <div className="flex items-center mt-1 text-xs text-green-600">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
            Active now
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: User profile card with avatar, status, and details.',
      },
    },
  },
};

// Comment Thread Example
export const CommentThread: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      {[
        {
          name: 'John Doe',
          time: '2 hours ago',
          message: 'Great work on this feature! The implementation looks solid.',
        },
        {
          name: 'Jane Smith',
          time: '1 hour ago',
          message: 'Thanks! I agree, though we might want to consider the edge cases we discussed.',
        },
        {
          name: 'Bob Johnson',
          time: '30 min ago',
          message: 'Good point. I can help with the testing for those scenarios.',
        },
      ].map((comment, index) => (
        <div key={comment.name} className="flex space-x-3">
          <CompoundAvatar
            src={mockUsers[index]?.image || undefined}
            alt={comment.name}
            status={index === 0 ? 'online' : index === 1 ? 'away' : 'offline'}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{comment.name}</span>
              <span className="text-xs text-muted-foreground">{comment.time}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Comment thread with avatars showing user activity status.',
      },
    },
  },
};

// Avatar Stack
export const AvatarStack: Story = {
  render: () => (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {mockUsers.slice(0, 3).map((user, index) => (
          <CompoundAvatar
            key={user.name}
            src={user.image}
            alt={user.name}
            size="md"
            className="ring-2 ring-background hover:z-10 hover:scale-105 transition-all"
            fallbackVariant={index % 2 === 0 ? 'default' : 'secondary'}
          />
        ))}
      </div>
      <span className="ml-3 text-sm text-muted-foreground">
        John, Jane, and Bob are working on this
      </span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overlapping avatar stack - great for showing collaborators or participants.',
      },
    },
  },
};

// Navigation Menu Example
export const NavigationMenu: Story = {
  render: () => (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">Administrator</p>
        </div>
        <CompoundAvatar
          src={mockUsers[0]?.image}
          alt="John Doe"
          status="online"
          size="md"
          className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation header with user avatar - common pattern in web applications.',
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    src: mockUsers[0]?.image,
    alt: 'Interactive User',
    status: 'online',
    size: 'lg',
    fallbackVariant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - try different combinations of props to see how the Avatar behaves.',
      },
    },
  },
};
