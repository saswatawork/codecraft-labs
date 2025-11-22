import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Grid component provides flexible CSS Grid layouts with responsive column configurations.
Supports both fixed column counts and auto-fitting/filling layouts with consistent spacing.

## Features
- **Responsive Columns**: 1-6 column layouts with mobile-first breakpoints
- **Auto-fit/Auto-fill**: Dynamic columns that adapt to available space
- **Consistent Spacing**: 8 gap presets from none to 3xl
- **Alignment Control**: Items and justify-items configuration
- **Custom Min Width**: Control minimum column width for auto layouts
- **Polymorphic**: Render as any HTML element
- **TypeScript**: Full type safety

## Usage
\`\`\`tsx
import { Grid } from '@ccl/ui'

// 3-column responsive grid (default)
<Grid>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// 4-column grid with larger gap
<Grid columns={4} gap="xl">
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>

// Auto-fit grid (responsive, fills space)
<Grid columns="auto" minWidth="300px">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Grid>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'auto', 'auto-fill'],
      description: 'Number of columns or auto layout type',
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Gap between grid items',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment of items (align-items)',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Horizontal alignment of items (justify-items)',
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Minimum width for auto-fit/auto-fill columns',
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demo boxes
const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-300 rounded-lg p-6 flex items-center justify-center text-gray-700 font-semibold min-h-[120px]">
    {children}
  </div>
);

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <>
        <DemoBox>Item 1</DemoBox>
        <DemoBox>Item 2</DemoBox>
        <DemoBox>Item 3</DemoBox>
        <DemoBox>Item 4</DemoBox>
        <DemoBox>Item 5</DemoBox>
        <DemoBox>Item 6</DemoBox>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <DemoBox>Item 1</DemoBox>
        <DemoBox>Item 2</DemoBox>
        <DemoBox>Item 3</DemoBox>
        <DemoBox>Item 4</DemoBox>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <DemoBox key={`four-col-${i}`}>Item {i + 1}</DemoBox>
        ))}
      </>
    ),
  },
};

// Auto-fit Examples
export const AutoFit: Story = {
  args: {
    columns: 'auto',
    minWidth: '250px',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <DemoBox key={`auto-fit-${i}`}>Auto {i + 1}</DemoBox>
        ))}
      </>
    ),
  },
};

export const AutoFitLargeMinWidth: Story = {
  args: {
    columns: 'auto',
    minWidth: '350px',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <DemoBox key={`auto-large-${i}`}>Item {i + 1}</DemoBox>
        ))}
      </>
    ),
  },
};

// Gap Variations
export const AllGaps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">No Gap (gap-0)</h3>
        <Grid columns={3} gap="none">
          <div className="bg-blue-200 p-4 text-center">Item</div>
          <div className="bg-blue-300 p-4 text-center">Item</div>
          <div className="bg-blue-400 p-4 text-center">Item</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Small Gap (gap-2)</h3>
        <Grid columns={3} gap="sm">
          <div className="bg-purple-200 p-4 text-center">Item</div>
          <div className="bg-purple-300 p-4 text-center">Item</div>
          <div className="bg-purple-400 p-4 text-center">Item</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Medium Gap (gap-4)</h3>
        <Grid columns={3} gap="md">
          <div className="bg-green-200 p-4 text-center">Item</div>
          <div className="bg-green-300 p-4 text-center">Item</div>
          <div className="bg-green-400 p-4 text-center">Item</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Large Gap (gap-6) - Default</h3>
        <Grid columns={3} gap="lg">
          <div className="bg-orange-200 p-4 text-center">Item</div>
          <div className="bg-orange-300 p-4 text-center">Item</div>
          <div className="bg-orange-400 p-4 text-center">Item</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-600">Extra Large Gap (gap-8)</h3>
        <Grid columns={3} gap="xl">
          <div className="bg-red-200 p-4 text-center">Item</div>
          <div className="bg-red-300 p-4 text-center">Item</div>
          <div className="bg-red-400 p-4 text-center">Item</div>
        </Grid>
      </div>
    </div>
  ),
};

// Real World Examples
export const ProductGrid: Story = {
  render: () => (
    <Grid columns={3} gap="lg">
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={`product-${i}`} className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500" />
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">Product {i + 1}</h3>
            <p className="text-gray-600 mb-4">
              A wonderful product description that tells you all about this amazing item.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">${(i + 1) * 99}</span>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Card>
      ))}
    </Grid>
  ),
};

export const FeatureGrid: Story = {
  render: () => (
    <Grid columns={3} gap="xl">
      {[
        { icon: '⚡', title: 'Fast', desc: 'Lightning-fast performance' },
        { icon: '🎨', title: 'Beautiful', desc: 'Stunning design out of the box' },
        { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
        { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
        { icon: '♿', title: 'Accessible', desc: 'WCAG 2.1 compliant' },
        { icon: '🚀', title: 'Scalable', desc: 'Grows with your needs' },
      ].map((feature) => (
        <div key={feature.title} className="text-center p-6">
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </Grid>
  ),
};

export const BlogGrid: Story = {
  render: () => (
    <Grid columns={2} gap="lg">
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={`blog-${i}`}>
          <div className="h-56 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500">Nov {i + 20}, 2024</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">5 min read</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">Blog Post Title {i + 1}</h2>
            <p className="text-gray-600 mb-4">
              An engaging excerpt from the blog post that gives readers a preview of the content and
              encourages them to read more.
            </p>
            <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </a>
          </div>
        </Card>
      ))}
    </Grid>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <Grid columns="auto" minWidth="200px" gap="md">
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={`gallery-${i}`}
          className="aspect-square bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
        >
          {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

export const DashboardCards: Story = {
  render: () => (
    <Grid columns={4} gap="lg">
      {[
        { label: 'Total Users', value: '12,345', change: '+12%', color: 'blue' },
        { label: 'Revenue', value: '$98,234', change: '+8%', color: 'green' },
        { label: 'Active Sessions', value: '1,432', change: '-2%', color: 'orange' },
        { label: 'Conversion Rate', value: '3.24%', change: '+0.5%', color: 'purple' },
      ].map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
          <div className="text-3xl font-bold mb-2">{stat.value}</div>
          <div
            className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
          >
            {stat.change}
          </div>
        </Card>
      ))}
    </Grid>
  ),
};

export const TestimonialGrid: Story = {
  render: () => (
    <Grid columns={3} gap="lg">
      {Array.from({ length: 3 }, (_, i) => (
        <Card key={`testimonial-${i}`} className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <div>
              <div className="font-bold">Customer Name</div>
              <div className="text-sm text-gray-500">CEO, Company</div>
            </div>
          </div>
          <p className="text-gray-700 italic">
            "This product has completely transformed our workflow. The attention to detail and ease
            of use is remarkable."
          </p>
          <div className="mt-4 text-yellow-400">★★★★★</div>
        </Card>
      ))}
    </Grid>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">On Mobile: 1 column</h3>
        <h3 className="text-lg font-bold mb-4">On Tablet: 2 columns</h3>
        <h3 className="text-lg font-bold mb-4">On Desktop: 3 columns</h3>
      </div>
      <Grid columns={3} gap="lg">
        <DemoBox>Responsive 1</DemoBox>
        <DemoBox>Responsive 2</DemoBox>
        <DemoBox>Responsive 3</DemoBox>
        <DemoBox>Responsive 4</DemoBox>
        <DemoBox>Responsive 5</DemoBox>
        <DemoBox>Responsive 6</DemoBox>
      </Grid>
    </div>
  ),
};
