import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/Card';

// Mock Button for stories (using basic element until Button is imported)
const Button = ({ children, ...props }: any) => (
  <button
    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
    {...props}
  >
    {children}
  </button>
);

// Icons for Card demonstrations
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Heart Icon</title>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Star Icon</title>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>User Icon</title>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Card component is a flexible container for grouping related content and actions.
Built with compound patterns for maximum flexibility and composability.

## Features
- **Compound Pattern**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Multiple Variants**: Default, elevated, outlined, filled styles
- **Flexible Padding**: None, small, medium, large padding options
- **Semantic HTML**: Proper heading hierarchy and accessibility
- **Full TypeScript**: Complete type safety with proper element props
- **Responsive Design**: Works seamlessly across all screen sizes

## Usage
\`\`\`tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@ccl/ui'

// Complete card structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Simple card with just content
<Card>
  <CardContent>
    Simple card content
  </CardContent>
</Card>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'The visual style of the card',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding inside the card',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description that provides more context about the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card where you can place any content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Just a Header</CardTitle>
        <CardDescription>Sometimes you only need a header section.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

// Variant Examples
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <Card variant="default">
        <CardContent>
          <h4 className="font-semibold">Default</h4>
          <p className="text-sm text-muted-foreground">Standard card styling</p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent>
          <h4 className="font-semibold">Elevated</h4>
          <p className="text-sm text-muted-foreground">Enhanced shadow</p>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <h4 className="font-semibold">Outlined</h4>
          <p className="text-sm text-muted-foreground">Thicker border</p>
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardContent>
          <h4 className="font-semibold">Filled</h4>
          <p className="text-sm text-muted-foreground">Muted background</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Padding Examples
export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card padding="none" className="border-dashed">
        <div className="p-2 bg-blue-50 text-blue-900 text-sm">
          No padding - content touches edges
        </div>
      </Card>

      <Card padding="sm">
        <CardContent>Small padding (p-4)</CardContent>
      </Card>

      <Card padding="md">
        <CardContent>Medium padding (p-6) - Default</CardContent>
      </Card>

      <Card padding="lg">
        <CardContent>Large padding (p-8)</CardContent>
      </Card>
    </div>
  ),
};

// Real-world Examples
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
        <span className="text-muted-foreground">Product Image</span>
      </div>
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>High-quality wireless headphones with noise cancellation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$199.99</span>
          <div className="flex items-center space-x-1">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <span className="text-sm text-muted-foreground ml-2">4.9</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button className="flex-1">Add to Cart</Button>
        <button
          type="button"
          className="p-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label="Add to favorites"
        >
          <HeartIcon />
        </button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A product card showcasing e-commerce use case with image, pricing, and actions.',
      },
    },
  },
};

export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon />
        </div>
        <CardTitle>Sarah Johnson</CardTitle>
        <CardDescription>Senior Frontend Developer at TechCorp</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span>5+ years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Joined</span>
            <span>January 2020</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A user profile card with avatar, information, and action button.',
      },
    },
  },
};

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-80" variant="outlined">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <CardTitle as="h4" className="text-base">
            New Message
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          You have received a new message from Alex Chen regarding the project timeline.
        </p>
        <p className="text-xs text-muted-foreground mt-2">2 minutes ago</p>
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            Mark as Read
          </Button>
          <Button size="sm" className="flex-1">
            Reply
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A notification card with status indicator and action buttons.',
      },
    },
  },
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-96">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2.4k</div>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$12.5k</div>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Statistics cards showing key metrics in a dashboard layout.',
      },
    },
  },
};

export const FeatureCard: Story = {
  render: () => (
    <Card className="w-80" variant="elevated">
      <CardHeader>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <StarIcon />
        </div>
        <CardTitle>Premium Features</CardTitle>
        <CardDescription>Unlock advanced functionality with our premium plan</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Advanced Analytics</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Priority Support</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Custom Integrations</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade Now</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A feature card highlighting premium plan benefits.',
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    className: 'w-80',
  },
  render: (args: typeof Default.args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Playground Card</CardTitle>
        <CardDescription>
          Try different variants and padding options using the controls below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the card content. You can experiment with different properties using the Storybook
          controls.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Sample Action</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Compound Component Pattern
 * Demonstrates the new Card.Header, Card.Title, etc. syntax
 */
export const CompoundPattern: Story = {
  args: {
    variant: 'default',
    className: 'w-80',
  },
  render: () => (
    <div className="space-y-6">
      <Card className="w-80">
        <Card.Header>
          <Card.Title>Compound Pattern</Card.Title>
          <Card.Description>Using Card.Header, Card.Title syntax</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-gray-600">
            This demonstrates the new compound component pattern similar to Radix UI components.
          </p>
        </Card.Content>
        <Card.Footer>
          <Button>Try it out</Button>
        </Card.Footer>
      </Card>

      <Card variant="elevated" className="w-80">
        <Card.Header>
          <Card.Title as="h2">Elevated Card</Card.Title>
          <Card.Description>With compound component pattern</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <UserIcon />
              <span>User Profile</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <StarIcon />
              <span>Featured Item</span>
            </div>
          </div>
        </Card.Content>
        <Card.Footer className="justify-between">
          <Button>View</Button>
          <Button>Edit</Button>
        </Card.Footer>
      </Card>

      <Card variant="outlined" className="w-80">
        <Card.Header>
          <Card.Title>Outlined Style</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Clean and minimal compound card.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};
