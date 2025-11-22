import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Stack } from '../components/Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Stack component is a flexible layout primitive for arranging children vertically or horizontally
with consistent spacing. Built on flexbox with semantic props for common layout patterns.

## Features
- **Directional Layouts**: Vertical (column) or horizontal (row)
- **Consistent Spacing**: 8 spacing presets from none to 3xl
- **Alignment Control**: Start, center, end, stretch, baseline
- **Justify Options**: Start, center, end, between, around, evenly
- **Wrapping**: Optional flex-wrap support
- **Polymorphic**: Render as any HTML element
- **TypeScript**: Full type safety

## Usage
\`\`\`tsx
import { Stack } from '@ccl/ui'

// Vertical stack (default)
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Horizontal button group
<Stack direction="horizontal" spacing="sm">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>

// Centered content
<Stack align="center" justify="center">
  <Icon />
  <h2>Title</h2>
  <p>Description</p>
</Stack>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout direction (flex-direction)',
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Gap between items',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment (align-items)',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis justification (justify-content)',
    },
    wrap: {
      control: { type: 'boolean' },
      description: 'Enable flex-wrap',
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
export const VerticalStack: Story = {
  args: {
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-purple-100 p-4 rounded">Item 2</div>
        <div className="bg-green-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
};

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    children: (
      <>
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-purple-100 p-4 rounded">Item 2</div>
        <div className="bg-green-100 p-4 rounded">Item 3</div>
      </>
    ),
  },
};

// Spacing Variations
export const AllSpacings: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">None (gap-0)</p>
        <Stack spacing="none">
          <div className="bg-blue-100 p-2 text-center text-sm">Item</div>
          <div className="bg-blue-200 p-2 text-center text-sm">Item</div>
          <div className="bg-blue-300 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">XS (gap-1)</p>
        <Stack spacing="xs">
          <div className="bg-purple-100 p-2 text-center text-sm">Item</div>
          <div className="bg-purple-200 p-2 text-center text-sm">Item</div>
          <div className="bg-purple-300 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">SM (gap-2)</p>
        <Stack spacing="sm">
          <div className="bg-green-100 p-2 text-center text-sm">Item</div>
          <div className="bg-green-200 p-2 text-center text-sm">Item</div>
          <div className="bg-green-300 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">MD (gap-4) - Default</p>
        <Stack spacing="md">
          <div className="bg-yellow-100 p-2 text-center text-sm">Item</div>
          <div className="bg-yellow-200 p-2 text-center text-sm">Item</div>
          <div className="bg-yellow-300 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">LG (gap-6)</p>
        <Stack spacing="lg">
          <div className="bg-orange-100 p-2 text-center text-sm">Item</div>
          <div className="bg-orange-200 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">XL (gap-8)</p>
        <Stack spacing="xl">
          <div className="bg-red-100 p-2 text-center text-sm">Item</div>
          <div className="bg-red-200 p-2 text-center text-sm">Item</div>
        </Stack>
      </div>
    </div>
  ),
};

// Alignment Examples
export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Align Start</p>
        <Stack direction="horizontal" align="start" className="h-24 bg-gray-50 p-4">
          <div className="bg-blue-200 p-2 h-12">Tall</div>
          <div className="bg-blue-300 p-2 h-8">Short</div>
          <div className="bg-blue-400 p-2 h-16">Medium</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Align Center</p>
        <Stack direction="horizontal" align="center" className="h-24 bg-gray-50 p-4">
          <div className="bg-purple-200 p-2 h-12">Tall</div>
          <div className="bg-purple-300 p-2 h-8">Short</div>
          <div className="bg-purple-400 p-2 h-16">Medium</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Align End</p>
        <Stack direction="horizontal" align="end" className="h-24 bg-gray-50 p-4">
          <div className="bg-green-200 p-2 h-12">Tall</div>
          <div className="bg-green-300 p-2 h-8">Short</div>
          <div className="bg-green-400 p-2 h-16">Medium</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Align Stretch (Default)</p>
        <Stack direction="horizontal" align="stretch" className="h-24 bg-gray-50 p-4">
          <div className="bg-orange-200 p-2">Item 1</div>
          <div className="bg-orange-300 p-2">Item 2</div>
          <div className="bg-orange-400 p-2">Item 3</div>
        </Stack>
      </div>
    </div>
  ),
};

// Justify Examples
export const JustifyVariations: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify Start (Default)</p>
        <Stack direction="horizontal" justify="start" className="bg-gray-50 p-4">
          <div className="bg-blue-200 p-2">A</div>
          <div className="bg-blue-300 p-2">B</div>
          <div className="bg-blue-400 p-2">C</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify Center</p>
        <Stack direction="horizontal" justify="center" className="bg-gray-50 p-4">
          <div className="bg-purple-200 p-2">A</div>
          <div className="bg-purple-300 p-2">B</div>
          <div className="bg-purple-400 p-2">C</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify End</p>
        <Stack direction="horizontal" justify="end" className="bg-gray-50 p-4">
          <div className="bg-green-200 p-2">A</div>
          <div className="bg-green-300 p-2">B</div>
          <div className="bg-green-400 p-2">C</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify Between</p>
        <Stack direction="horizontal" justify="between" className="bg-gray-50 p-4">
          <div className="bg-orange-200 p-2">A</div>
          <div className="bg-orange-300 p-2">B</div>
          <div className="bg-orange-400 p-2">C</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify Around</p>
        <Stack direction="horizontal" justify="around" className="bg-gray-50 p-4">
          <div className="bg-red-200 p-2">A</div>
          <div className="bg-red-300 p-2">B</div>
          <div className="bg-red-400 p-2">C</div>
        </Stack>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-gray-600">Justify Evenly</p>
        <Stack direction="horizontal" justify="evenly" className="bg-gray-50 p-4">
          <div className="bg-pink-200 p-2">A</div>
          <div className="bg-pink-300 p-2">B</div>
          <div className="bg-pink-400 p-2">C</div>
        </Stack>
      </div>
    </div>
  ),
};

// Real World Examples
export const ButtonGroup: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="sm">
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Draft</Button>
      <Button variant="primary">Publish</Button>
    </Stack>
  ),
};

export const FormButtons: Story = {
  render: () => (
    <Stack direction="horizontal" justify="between" align="center">
      <Button variant="ghost">← Back</Button>
      <Stack direction="horizontal" spacing="sm">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </Stack>
    </Stack>
  ),
};

export const TagList: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="sm" wrap>
      <Badge>React</Badge>
      <Badge>TypeScript</Badge>
      <Badge>Tailwind CSS</Badge>
      <Badge>Next.js</Badge>
      <Badge>Vite</Badge>
      <Badge>Storybook</Badge>
      <Badge>Vitest</Badge>
      <Badge>Testing Library</Badge>
      <Badge>Radix UI</Badge>
      <Badge>CVA</Badge>
    </Stack>
  ),
};

export const CardContent: Story = {
  render: () => (
    <div className="border rounded-lg p-6 w-[400px]">
      <Stack spacing="lg">
        <Stack spacing="sm">
          <h3 className="text-xl font-bold">Product Title</h3>
          <p className="text-gray-600">
            This is a description of the product with multiple features and benefits.
          </p>
        </Stack>

        <Stack direction="horizontal" spacing="sm" wrap>
          <Badge variant="soft" tone="blue">
            New
          </Badge>
          <Badge variant="soft" tone="green">
            Popular
          </Badge>
          <Badge variant="soft" tone="purple">
            Premium
          </Badge>
        </Stack>

        <div className="border-t pt-4">
          <Stack direction="horizontal" justify="between" align="center">
            <span className="text-2xl font-bold">$99</span>
            <Button variant="primary">Add to Cart</Button>
          </Stack>
        </div>
      </Stack>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Stack align="center" justify="center" spacing="lg" className="py-16">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
        ?
      </div>
      <Stack align="center" spacing="sm">
        <h3 className="text-xl font-bold text-gray-900">No items found</h3>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't find any items matching your search. Try adjusting your filters or create a
          new item.
        </p>
      </Stack>
      <Button variant="primary">Create New Item</Button>
    </Stack>
  ),
};

export const NavigationBar: Story = {
  render: () => (
    <Stack
      as="nav"
      direction="horizontal"
      justify="between"
      align="center"
      className="border-b p-4"
    >
      <Stack direction="horizontal" align="center" spacing="lg">
        <div className="text-xl font-bold">Logo</div>
        <Stack direction="horizontal" spacing="md">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/services" className="text-gray-600 hover:text-gray-900">
            Services
          </a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </Stack>
      </Stack>
      <Stack direction="horizontal" spacing="sm">
        <Button variant="ghost">Sign In</Button>
        <Button variant="primary">Sign Up</Button>
      </Stack>
    </Stack>
  ),
};
