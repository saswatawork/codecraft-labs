import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '../components/Input';

// Icons for Input demonstrations
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Search Icon</title>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>User Icon</title>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Mail Icon</title>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Eye Icon</title>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Input component is a comprehensive form input with validation states, icons, labels, and helper text.
Designed for accessibility and user experience with built-in error handling and loading states.

## Features
- **Validation States**: Default, error, success with visual feedback
- **Icon Support**: Left and right icon positioning
- **Labels & Helper Text**: Built-in label and helper text support
- **Loading States**: Loading spinner in right position
- **Size Variants**: Small, medium, large sizes
- **Accessibility**: Proper ARIA support and label association
- **TypeScript**: Full type safety with HTML input props

## Usage
\`\`\`tsx
import { Input } from '@ccl/ui'

// Basic usage
<Input placeholder="Enter your name" />

// With label and validation
<Input 
  label="Email Address" 
  error="Please enter a valid email"
  type="email"
/>

// With icons
<Input 
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'The visual state of the input',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the input',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message - when provided, input shows error state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner',
    },
    success: {
      control: { type: 'boolean' },
      description: 'Shows success state',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    helperText: "We'll never share your email with anyone else.",
  },
};

// Validation States
export const ErrorState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    defaultValue: '123',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    success: true,
    defaultValue: 'johndoe',
    helperText: 'Username is available!',
  },
};

// Icon Examples
export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    rightIcon: <EyeIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    leftIcon: <MailIcon />,
    rightIcon: <SearchIcon />,
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input inputSize="sm" placeholder="Small input" label="Small" />
      <Input inputSize="md" placeholder="Medium input" label="Medium (default)" />
      <Input inputSize="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  args: {
    label: 'Processing',
    placeholder: 'Please wait...',
    loading: true,
    disabled: true,
  },
};

// Interactive Examples
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input
        label="Default State"
        placeholder="Enter text..."
        helperText="This is the default state"
      />
      <Input label="Error State" error="This field is required" placeholder="Enter text..." />
      <Input label="Success State" success defaultValue="Valid input" helperText="Looks good!" />
      <Input label="Loading State" loading placeholder="Processing..." disabled />
    </div>
  ),
};

// Real-world Form Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Email" type="email" placeholder="name@company.com" leftIcon={<MailIcon />} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        rightIcon={<EyeIcon />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a login form with email and password inputs.',
      },
    },
  },
};

export const SearchForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Search Products"
        placeholder="Search for products, categories..."
        leftIcon={<SearchIcon />}
        helperText="Use keywords to find what you're looking for"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search input with icon and helper text.',
      },
    },
  },
};

export const ProfileForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Full Name"
        placeholder="John Doe"
        leftIcon={<UserIcon />}
        defaultValue="John Doe"
        success
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        leftIcon={<MailIcon />}
        defaultValue="john@example.com"
        success
      />
      <Input
        label="Bio"
        placeholder="Tell us about yourself..."
        helperText="Maximum 160 characters"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile form with various input types and validation states.',
      },
    },
  },
};

// Interactive Component
const ControlledInput = () => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setHasError(newValue.length > 0 && newValue.length < 3);
  };

  return (
    <div className="w-80">
      <Input
        label="Interactive Input"
        value={value}
        onChange={handleChange}
        {...(hasError && { error: 'Must be at least 3 characters' })}
        success={value.length >= 3}
        helperText="Type to see validation in action"
        placeholder="Start typing..."
      />
      <p className="mt-2 text-sm text-gray-600">
        Current value: "{value}" (Length: {value.length})
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <ControlledInput />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive input that demonstrates real-time validation.',
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Playground Input',
    placeholder: 'Try different props...',
    helperText: 'Experiment with the controls below',
  },
};
