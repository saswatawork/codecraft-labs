import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  Dialog, 
  DialogTrigger,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose,
  CompoundDialog
} from '../components/Dialog';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';

const meta: Meta<typeof CompoundDialog> = {
  title: 'Components/Dialog',
  component: CompoundDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive Dialog/Modal component system with animations, accessibility, and flexible composition.

## Features
- **Compound Pattern**: Dialog, DialogTrigger, DialogContent, DialogHeader, etc.
- **Multiple Sizes**: From sm (384px) to full (95vw)
- **Animations**: Fade, scale, and slide transitions
- **Accessibility**: ARIA compliance, focus management, keyboard navigation
- **Portal Rendering**: Renders outside normal DOM hierarchy
- **Backdrop Control**: Configurable overlay and outside click behavior
- **TypeScript Support**: Full type safety with proper interfaces

## Usage
The Dialog component can be used as individual components for maximum flexibility or as a compound component for convenience.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
      description: 'Size of the dialog',
    },
    animation: {
      control: 'select',
      options: ['fade', 'scale', 'slide'],
      description: 'Animation type when opening/closing',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    showClose: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close on Escape key',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close when clicking outside',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description',
    },
  },
} satisfies Meta<typeof CompoundDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog Stories
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <CompoundDialog
        open={open}
        onOpenChange={setOpen}
        title="Default Dialog"
        description="This is a basic dialog example with default settings."
        trigger={<Button>Open Dialog</Button>}
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">
          This dialog demonstrates the basic functionality with a title, description, and action buttons.
        </p>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic dialog with title, description, content, and footer actions.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
    
    return (
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <CompoundDialog
            key={size}
            open={activeSize === size}
            onOpenChange={(open) => setActiveSize(open ? size : null)}
            size={size}
            title={`${size.toUpperCase()} Dialog`}
            description={`This dialog uses the ${size} size variant.`}
            trigger={<Button variant="outline">{size.toUpperCase()}</Button>}
            footer={
              <Button onClick={() => setActiveSize(null)}>
                Close
              </Button>
            }
          >
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Content area for {size} sized dialog. The dialog will adjust its maximum width 
                based on the size variant selected.
              </p>
            </div>
          </CompoundDialog>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog sizes from small (sm) to extra large (2xl) demonstrating different width constraints.',
      },
    },
  },
};

// Animation Variants
export const Animations: Story = {
  render: () => {
    const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
    const animations = ['fade', 'scale', 'slide'] as const;
    
    return (
      <div className="flex gap-2">
        {animations.map((animation) => (
          <CompoundDialog
            key={animation}
            open={activeAnimation === animation}
            onOpenChange={(open) => setActiveAnimation(open ? animation : null)}
            animation={animation}
            title={`${animation} Animation`}
            description={`This dialog uses the ${animation} animation effect.`}
            trigger={<Button variant="outline">{animation}</Button>}
            footer={
              <Button onClick={() => setActiveAnimation(null)}>
                Close
              </Button>
            }
          >
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Watch the {animation} animation when the dialog opens and closes.
              </p>
            </div>
          </CompoundDialog>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different animation types: fade, scale (zoom), and slide from bottom.',
      },
    },
  },
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<string>('');
    
    const handleConfirm = () => {
      setResult('Confirmed!');
      setOpen(false);
      setTimeout(() => setResult(''), 2000);
    };

    const handleCancel = () => {
      setResult('Cancelled');
      setOpen(false);
      setTimeout(() => setResult(''), 2000);
    };
    
    return (
      <div className="text-center">
        <CompoundDialog
          open={open}
          onOpenChange={setOpen}
          size="sm"
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          trigger={<Button variant="destructive">Delete Item</Button>}
          showClose={false}
          footer={
            <div className="flex justify-end space-x-2 w-full">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Delete
              </Button>
            </div>
          }
        >
          <div className="py-2">
            <p className="text-sm text-muted-foreground">
              <strong>Item Name:</strong> Important Document.pdf
            </p>
          </div>
        </CompoundDialog>
        {result && (
          <p className="mt-4 text-sm font-medium text-green-600">
            Result: {result}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for destructive actions with clear call-to-action buttons.',
      },
    },
  },
};

// Form Dialog
export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setOpen(false);
      setFormData({ name: '', email: '' });
    };
    
    return (
      <CompoundDialog
        open={open}
        onOpenChange={setOpen}
        size="md"
        title="Add New Contact"
        description="Enter the contact information below."
        trigger={<Button>Add Contact</Button>}
        footer={
          <div className="flex justify-end space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => {
                setOpen(false);
                setFormData({ name: '', email: '' });
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="contact-form"
              disabled={!formData.name || !formData.email}
            >
              Save Contact
            </Button>
          </div>
        }
      >
        <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium mb-2 block">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-2 block">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>
        </form>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form dialog with input validation and form submission handling.',
      },
    },
  },
};

// Information Dialog
export const InformationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <CompoundDialog
        open={open}
        onOpenChange={setOpen}
        size="lg"
        title="System Update Available"
        description="A new version of the application is ready to install."
        trigger={
          <div className="relative">
            <Button variant="outline">
              System Status
            </Button>
            <Badge 
              className="absolute -top-2 -right-2 animate-pulse"
              variant="destructive"
              size="sm"
            >
              !
            </Badge>
          </div>
        }
        footer={
          <div className="flex justify-between w-full">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Remind Later
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Learn More
              </Button>
              <Button onClick={() => setOpen(false)}>
                Install Update
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What's New in v2.1.0</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Enhanced security features</li>
              <li>• Improved performance</li>
              <li>• New dashboard widgets</li>
              <li>• Bug fixes and stability improvements</li>
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">
            <p><strong>Size:</strong> 24.5 MB</p>
            <p><strong>Install Time:</strong> ~2 minutes</p>
            <p><strong>Restart Required:</strong> Yes</p>
          </div>
        </div>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Information dialog with rich content, multiple actions, and status indicators.',
      },
    },
  },
};

// Compound Component Usage
export const CompoundUsage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Advanced Usage</Button>
        </DialogTrigger>
        <DialogContent size="lg" className="sm:max-w-2xl">
          <DialogClose />
          <DialogHeader>
            <DialogTitle as="h1">Advanced Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses individual components for maximum flexibility.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Compound components</li>
                <li>✓ Custom styling</li>
                <li>✓ Flexible composition</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Benefits</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Maximum control</li>
                <li>✓ Reusable patterns</li>
                <li>✓ TypeScript safe</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Using individual Dialog components for maximum customization and flexibility.',
      },
    },
  },
};

// No Backdrop Dialog
export const NoBackdropDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <CompoundDialog
        open={open}
        onOpenChange={setOpen}
        size="sm"
        title="Non-modal Dialog"
        description="This dialog doesn't close when clicking outside."
        trigger={<Button variant="outline">Non-modal</Button>}
        closeOnOutsideClick={false}
        footer={
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="py-2">
          <p className="text-sm text-muted-foreground">
            This dialog requires explicit action to close. Clicking the backdrop 
            or pressing Escape won't close it.
          </p>
        </div>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog that requires explicit user action to close, useful for critical workflows.',
      },
    },
  },
};

// Loading Dialog
export const LoadingDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleAction = async () => {
      setLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };
    
    return (
      <CompoundDialog
        open={open}
        onOpenChange={setOpen}
        size="sm"
        title="Processing"
        description="Please wait while we process your request."
        trigger={<Button>Start Process</Button>}
        closeOnEscape={!loading}
        closeOnOutsideClick={!loading}
        showClose={!loading}
        footer={
          <div className="flex justify-end space-x-2 w-full">
            {!loading && (
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            )}
            <Button onClick={handleAction} disabled={loading} loading={loading}>
              {loading ? 'Processing...' : 'Start'}
            </Button>
          </div>
        }
      >
        <div className="py-4">
          {loading ? (
            <div className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">
                Processing your request...
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Start" to begin processing. This will take a few seconds.
            </p>
          )}
        </div>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with loading states and disabled interactions during processing.',
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    size: 'md',
    animation: 'scale',
    title: 'Playground Dialog',
    description: 'Experiment with different dialog properties using the controls below.',
    showClose: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <CompoundDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Playground Dialog</Button>}
        footer={
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Use the Storybook controls to experiment with different dialog properties 
            and see how they affect the behavior and appearance.
          </p>
        </div>
      </CompoundDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all dialog properties and variants.',
      },
    },
  },
};